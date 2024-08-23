import ButtonUI from "./Button/ButtonUI.js";
import { addPlaylist, getSongs } from "./songsSlice.js";
import Song from "./Song/Song.js";
import "./SongList.css";
import { useEffect } from "react";
import {
  getGeminiSuggestions,
  setSearchTerm,
  getGeminiResponse,
} from "../Search/vibeSlice.js";
import VibeSuggestion from "./VibeSuggestion/VibeSuggestion.js";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";

function SongList({ store, dispatch }) {
  useEffect(() => {
    dispatch(getSongs(store.vibe.songNameList));
  }, [store.vibe.songNameList, dispatch]);

  useEffect(() => {
    return () => dispatch(getGeminiSuggestions());
  }, [dispatch]);

  function renderList(songList) {
    if (store.songs.loadingSongs || store.vibe.loadingGeminiResponse) {
      return (
        <div id="messageContainer">
          <h1 id="messageTitle">Loading...</h1>
          <div id="loadingWheel"></div>
        </div>
      );
    } else if (songList.length && store.vibe.searchTerm) {
      console.log(songList);
      return (
        <>
          <ul id="songList">
            {songList.map((song, idx) => {
              return (
                <Song
                  song={song.tracks.items[0]}
                  key={song.tracks.items[0].id}
                  idx={idx}
                />
              );
            })}
          </ul>
          <ButtonUI
            text={"Add to Playlist"}
            clickHandler={() => {
              if (store.vibe.searchTerm && store.vibe.songNameList) {
                dispatch(addPlaylist(store.vibe.playlistTitle));
              }
            }}
          />
        </>
      );
    } else if (!(store.vibe.searchTerm && store.songs.songResponseList)) {
      return (
        <ul id="vibeSuggestionContainer">
          {store.vibe.vibeSuggestions.map((suggestion) => (
            <VibeSuggestion
              suggestion={suggestion}
              key={nanoid()}
              handleSuggestionClick={handleSuggestionClick}
            />
          ))}
        </ul>
      );
    } else {
      let errorMessage = "Unknown Error";
      let handleClick = () => {
        dispatch(getSongs(store.vibe.songNameList));
      };
      if (store.vibe.failedToLoadGeminiSuggestions) {
        errorMessage = "Failed to load AI suggestions";
        handleClick = () => {
          dispatch(getGeminiSuggestions());
        };
      } else if (store.vibe.failedToLoadGeminiResponse) {
        errorMessage = "Failed to load AI response";
        handleClick = () => {
          dispatch(getGeminiResponse(store.vibe.searchTerm));
        };
      } else if (store.songs.failedToLoadSongs) {
        errorMessage = "Failed to load songs";
        handleClick = () => {
          dispatch(getSongs(store.vibe.songNameList));
        };
      } else if (store.songs.failedToCreatePlaylist) {
        errorMessage = "Error creating playlist";
        handleClick = () => {
          dispatch(addPlaylist(store.vibe.songName));
        };
      }
      return (
        <div id="messageContainer">
          <h1 id="messageTitle">{errorMessage}</h1>
          <ButtonUI text={"Retry Load"} clickHandler={handleClick} />
        </div>
      );
    }
  }

  function handleSuggestionClick(suggestion) {
    dispatch(setSearchTerm(suggestion));
    dispatch(getSongs(store.vibe.songNameList));
    dispatch(getGeminiResponse(suggestion));
  }

  return (
    <main id="songListContainer" role="presentation">
      {Date.now() < window.localStorage.getItem("expires") ? (
        renderList(store.songs.songResponseList)
      ) : (
        <ButtonUI
          text={"Log in with Spotify"}
          clickHandler={async () => {
            let params = {
              method: "GET",
              url: "http://localhost:5000/spotify/login",
            };
            const [verifier, href] = (await axios.request(params)).data;
            localStorage.setItem("code_verifier", verifier);
            window.location.href = href;
          }}
          isSignIn={true}
        />
      )}
    </main>
  );
}

export default SongList;
