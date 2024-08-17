import "./AddPlaylistButton.css";
import { addPlaylist } from "../songsSlice";

function AddPlaylistButton({ store, dispatch }) {
  function handleClick() {
    if (store.vibe.searchTerm && store.vibe.songNameList) {
      dispatch(addPlaylist(store.vibe.playlistTitle));
    }
  }
  return (
    <button id="addPlaylistButton" onClick={handleClick}>
      <h3>Save Playlist</h3>
    </button>
  );
}

export default AddPlaylistButton;
