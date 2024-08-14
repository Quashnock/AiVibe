import SpotifyLogoSVG from "../../../Resources/SpotifyLogoSVG";
import "./Song.css";

function msToTimeCode(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function getArtistsString(artists) {
  let artistsString = artists[0].name;
  if (artistsString.length > 1) {
    artistsString += artists
      .slice(1)
      .reduce((acc, el) => `${acc}, ${el.name}`, "");
  }
  return artistsString;
}

function Song({ song }) {
  return (
    <section id="songContainer">
      <div id="leftSection">
        <a
          href={song.album.external_urls.spotify}
          target="_blank"
          rel="noreferrer"
          title="Link to Spotify Album"
        >
          <img
            id="songThumbnail"
            src={song.album.images[1].url}
            alt="songThumbnail"
          ></img>
        </a>
        <div id="titles">
          <a
            href={song.external_urls.spotify}
            target="_blank"
            rel="noreferrer"
            title="Link to Song on Spotify"
          >
            <h3 id="songTitle">{song.name}</h3>
          </a>
          <a
            href={song.artists[0].external_urls.spotify}
            target="_blank"
            rel="noreferrer"
            title="Link to Spotify Artist"
          >
            <h4 id="artistName">{getArtistsString(song.artists)}</h4>
          </a>
        </div>
      </div>
      <div id="rightSection">
        <h4 id="songLength">{msToTimeCode(song.duration_ms)}</h4>
        <a
          href={song.external_urls.spotify}
          target="_blank"
          rel="noreferrer"
          title="Link to Spotify"
        >
          {SpotifyLogoSVG}
        </a>
      </div>
    </section>
  );
}

export default Song;
