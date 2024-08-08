import AddPlaylistButton from "./AddPlaylistButton/AddPlaylistButton.js";
import SignInButton from "./SignInButton/SignInButton.js";
import Song from "./Song/Song.js";
import "./SongList.css";

function SongList({ store, dispatch }) {
  return (
    <main id="songListContainer" role="presentation">
      {store.songs.songResponseList.map((song) => (
        <Song song={song.tracks.items[0]} key={song.tracks.items[0].id} />
      ))}
      <SignInButton />
      <AddPlaylistButton />
    </main>
  );
}

export default SongList;
