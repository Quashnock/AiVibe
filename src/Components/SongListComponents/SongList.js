import AddPlaylistButton from "./AddPlaylistButton/AddPlaylistButton.js";
import SignInButton from "./SignInButton/SignInButton.js";
import Song from "./Song/Song.js";
import "./SongList.css";
import { currentToken } from "../../Resources/SpotifyApiHandler.js";
import { getSongs } from "./songsSlice.js";
import { useEffect } from "react";

function SongList({ store, dispatch }) {
  useEffect(() => {
    console.log(store.vibe.songNameList);
    dispatch(getSongs(store.vibe.songNameList));
  }, [store.vibe.songNameList, store.vibe.searchTerm, dispatch]);
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
