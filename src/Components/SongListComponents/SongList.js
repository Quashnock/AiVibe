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
        <div id="messageContainer">
          <h1 id="messageTitle">Loading...</h1>
          <div id="loadingWheel"></div>
        </div>
      );
    } else if (
      songList.length &&
      store.vibe.searchTerm &&
      !store.vibe.failedToLoadGeminiResponse
    ) {
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
    } else if (
      !(store.vibe.searchTerm && store.songs.songResponseList) &&
      !store.vibe.failedToLoadGeminiSuggestions
    ) {
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
      if (store.songs.failedToCreatePlaylist) {
        errorMessage = "Error creating playlist";
        handleClick = () => {
          dispatch(addPlaylist(store.vibe.songName));
        };
      } else if (store.vibe.failedToLoadGeminiResponse) {
        errorMessage = "Failed to load AI song responses";
        handleClick = () => {
          dispatch(getGeminiResponse(store.vibe.searchTerm));
        };
      } else if (store.songs.failedToLoadSongs) {
        errorMessage = "Failed to load songs";
        handleClick = () => {
          dispatch(getSongs(store.vibe.songNameList));
        };
      } else if (store.vibe.failedToLoadGeminiSuggestions) {
        errorMessage = "Failed to load AI vibe suggestions";
        handleClick = () => {
          dispatch(getGeminiSuggestions());
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
            const possible =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const randomValues = crypto.getRandomValues(new Uint8Array(64));
            const randomString = randomValues.reduce(
              (acc, x) => acc + possible[x % possible.length],
              ""
            );

            const code_verifier = randomString;
            const data = new TextEncoder().encode(code_verifier);
            const hashed = await crypto.subtle.digest("SHA-256", data);

            const code_challenge_base64 = btoa(
              String.fromCharCode(...new Uint8Array(hashed))
            )
              .replace(/=/g, "")
              .replace(/\+/g, "-")
              .replace(/\//g, "_");

            const authUrl = new URL("https://accounts.spotify.com/authorize");
            const params = {
              response_type: "code",
              client_id: process.env.REACT_APP_SPOTIFY_API_KEY,
              scope:
                "user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public",
              code_challenge_method: "S256",
              code_challenge: code_challenge_base64,
              redirect_uri: "https://aivibe.netlify.app/",
            };

            authUrl.search = new URLSearchParams(params).toString();
            localStorage.setItem("code_verifier", code_verifier);
            window.location.href = authUrl.toString();
          }}
          isSignIn={true}
        />
      )}
    </main>
  );
}

export default SongList;
