import SpotifyLogoSVG from "../../../Resources/SpotifyLogoSVG";
import "./Song.css";

function msToTimeCode(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function Song({ song }) {
  return (
    <li id="songContainer">
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
          <div className="artistName">
            {song.artists.slice(0, 3).map((artist) => (
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
                className="artistLink"
                title="Link to Artist on Spotify"
                key={artist.id}
              >
                <p>{artist.name}</p>
              </a>
            ))}
          </div>
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
    </li>
  );
}

export default Song;
