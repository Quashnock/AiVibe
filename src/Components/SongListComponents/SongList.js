import AddPlaylistButton from "./AddPlaylistButton/AddPlaylistButton.js";
import SignInButton from "./SignInButton/SignInButton.js";
import Song from "./Song/Song.js";
import "./SongList.css";
import {
  currentToken,
  refreshTokenClick,
} from "../../Resources/SpotifyApiHandler.js";
import { getSongs } from "./songsSlice.js";
import { useEffect } from "react";
import { current } from "@reduxjs/toolkit";

function SongList({ code, store, dispatch }) {
  useEffect(() => {
    console.log(store.vibe.songNameList);
    dispatch(getSongs(store.vibe.songNameList));
  }, [
    store.vibe.songNameList,
    currentToken.access_token,
    store.vibe.searchTerm,
  ]);
  return (
    <main id="songListContainer" role="presentation">
      {currentToken.expires_in > 0 ? (
        <>
          {" "}
          {store.songs.songResponseList &&
            store.songs.songResponseList.map((song) => (
              <Song song={song.tracks.items[0]} key={song.tracks.items[0].id} />
            ))}
          <AddPlaylistButton />
        </>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

export default SongList;
