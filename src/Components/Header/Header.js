import { useState, useEffect } from "react";
import "./Header.css";
import AddPlaylistButton from "../SongListComponents/AddPlaylistButton/AddPlaylistButton";
function Header({ store, dispatch }) {
  const [title, setTitle] = useState("Suggestions");
  useEffect(() => {
    setTitle(store.vibe.playlistTitle || "Suggestions");
  }, [store.vibe.playlistTitle, store.songs.songList]);
  return (
    <header>
      <div id="logoContainer" role="presentation">
        <h2 id="logo" aria-roledescription="title logo">
          AiVibe
        </h2>
      </div>
      <div id="playlistTitleContainer" role="presentation">
        <h1 id="playlistTitle" aria-roledescription="Current Playlist Title">
          {title}
        </h1>
        <AddPlaylistButton store={store} dispatch={dispatch} />
      </div>
      <hr id="headerLineBreak" role="presentation"></hr>
    </header>
  );
}

export default Header;
