import { useEffect } from "react";
import "./Header.css";
function Header({ title }) {
  useEffect(() => {
    const playlistTitle = document.getElementById("playlistTitle").classList;
    playlistTitle.toggle("animate");
    playlistTitle.toggle("animate2");
  }, [title]);
  return (
    <header>
      <div id="logoContainer" role="presentation">
        <h2 id="logo" aria-roledescription="Title Logo">
          AiVibe
        </h2>
      </div>
      <div id="playlistTitleContainer" role="presentation">
        <h1
          id="playlistTitle"
          className="animate"
          aria-roledescription="Current Playlist Title"
        >
          {title || "Suggestions"}
        </h1>
      </div>
      <hr id="headerLineBreak" role="presentation"></hr>
    </header>
  );
}

export default Header;
