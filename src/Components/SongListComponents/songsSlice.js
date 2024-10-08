import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSongs = createAsyncThunk("songs/getSongs", async (songs) => {
  if (!(Date.now() < window.localStorage.getItem("expires"))) {
    return;
  }
  const songSet = new Set();
  return Promise.all(
    songs.map(async (song) => {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=track%253${song[0]}%252520artist%253${song[1]}&type=track&limit=1&offset=0`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      const songResult = await response.json();
      if (!songSet.has(songResult.tracks.items[0].id)) {
        songSet.add(songResult.tracks.items[0].id);
        return songResult;
      }
      return;
    })
  );
});

export const addPlaylist = createAsyncThunk(
  "songs/createPlaylist",
  async (playlistName, thunkAPI) => {
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/users/${localStorage.getItem(
        "id"
      )}/playlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          name: playlistName,
          description: thunkAPI.getState().vibe.searchTerm,
          public: false,
        }),
      }
    );
    const newPlaylist = await playlistResponse.json();
    const songUris = thunkAPI
      .getState()
      .songs.songResponseList.map((song) => song.tracks.items[0].uri);
    await fetch(
      `https://api.spotify.com/v1/playlists/${newPlaylist.id}/tracks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          position: 0,
          uris: songUris,
        }),
      }
    );
    return newPlaylist.external_urls.spotify;
  }
);
const songSlice = createSlice({
  name: "songs",
  initialState: {
    songResponseList: [],
    loadingSongs: false,
    failedToLoadSongs: false,
    failedToCreatePlaylist: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSongs.pending, (state) => {
        state.loadingSongs = true;
        state.failedToLoadSongs = false;
      })
      .addCase(getSongs.fulfilled, (state, action) => {
        state.loadingSongs = false;
        state.failedToLoadSongs = false;
        state.songResponseList = action.payload.filter(
          (song) => song !== undefined
        );
      })
      .addCase(getSongs.rejected, (state) => {
        state.loadingSongs = false;
        state.failedToLoadSongs = true;
      })
      .addCase(addPlaylist.pending, (state) => {
        state.loadingSongs = true;
        state.failedToCreatePlaylist = false;
      })
      .addCase(addPlaylist.fulfilled, (state, action) => {
        state.loadingSongs = false;
        state.failedToCreatePlaylist = false;
        window.open(action.payload, "_blank").focus();
      })
      .addCase(addPlaylist.rejected, (state) => {
        state.loadingSongs = false;
        state.failedToCreatePlaylist = true;
      });
  },
});

export default songSlice.reducer;
