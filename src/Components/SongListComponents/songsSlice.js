import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { currentToken } from "../../Resources/SpotifyApiHandler";

export const getSongs = createAsyncThunk("songs/getSongs", async (songs) => {
  console.log(currentToken.access_token);
  if (!currentToken.access_token) {
    console.log("hello");
    return;
  }
  return Promise.all(
    songs.map(async (song) => {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=track%253${song[0]}%252520artist%253${song[1]}&type=track&limit=1&offset=0`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + currentToken.access_token,
          },
        }
      );
      return await response.json();
    })
  );
});

export const addPlaylist = createAsyncThunk(
  "songs/createPlaylist",
  async (playlistName) => {
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/users/${playlistName}/playlists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentToken.access_token,
        },
        body: JSON.stringify({
          name: playlistName,
          public: false,
        }),
      }
    );
    const newPlaylistId = await playlistResponse.json();
    return newPlaylistId;
  }
);
const songSlice = createSlice({
  name: "songs",
  initialState: {
    songResponseList: [],
    loadingSongs: false,
    failedToLoadSongs: false,
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
        state.songResponseList = action.payload;
      })
      .addCase(getSongs.rejected, (state) => {
        state.loadingSongs = false;
        state.failedToLoadSongs = true;
      });
  },
});

export default songSlice.reducer;
