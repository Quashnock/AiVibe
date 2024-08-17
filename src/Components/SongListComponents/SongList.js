import AddPlaylistButton from "./AddPlaylistButton/AddPlaylistButton.js";
import SignInButton from "./SignInButton/SignInButton.js";
import Song from "./Song/Song.js";
import "./SongList.css";
import { currentToken } from "../../Resources/SpotifyApiHandler.js";
import { getSongs } from "./songsSlice.js";
import { useEffect } from "react";
import { getGeminiSuggestions } from "../Search/vibeSlice.js";
import { setSearchTerm } from "../Search/vibeSlice.js";
import { getGeminiResponse } from "../Search/vibeSlice.js";

function SongList({ store, dispatch }) {
  useEffect(() => {
    dispatch(getSongs(store.vibe.songNameList));
  }, [store.vibe.songNameList, dispatch]);

  useEffect(() => {
    dispatch(getGeminiSuggestions());
  }, [dispatch]);

  function renderList(songList) {
    if (store.songs.loadingSongs || store.vibe.loadingGeminiResponse) {
      return (
        <>
          <h1 id="loadingTitle">Loading Songs...</h1>
          <div id="loadingWheel"></div>
        </>
      );
    }
    return (
      <>
        <ul id="songList">
          {songList.map((song) => (
            <Song song={song.tracks.items[0]} key={song.tracks.items[0].id} />
          ))}
        </ul>
        <AddPlaylistButton store={store} dispatch={dispatch} />
      </>
    );
  }
  function handleSuggestionClick(suggestion) {
    dispatch(setSearchTerm(suggestion));
    dispatch(getSongs(store.vibe.songNameList));
    dispatch(getGeminiResponse(suggestion));
  }

  return (
    <main id="songListContainer" role="presentation">
      {Date.now() < currentToken.expires ? (
        store.vibe.searchTerm ? (
          renderList(store.songs.songResponseList)
        ) : (
          <ul id="vibeSuggestionContainer">
            {store.vibe.vibeSuggestions.map((suggestion) => (
              <li
                className="vibeSuggestion"
                onClick={() => handleSuggestionClick(suggestion[1])}
                title="Use Suggestion"
              >
                <h3 className="suggestionEmoji">{suggestion[0]}</h3>
                <h4 className="suggestionText">{suggestion[1]}</h4>
              </li>
            ))}
          </ul>
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

export default SongList;
