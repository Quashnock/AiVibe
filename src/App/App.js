import "./App.css";
import SongList from "../Components/SongListComponents/SongList";
import Search from "../Components/Search/Search";
import axios from "axios";

export const redirectUrl = "http://localhost:3000";
export const authorizationEndpoint = "https://accounts.spotify.com/authorize";
export const tokenEndpoint = "https://accounts.spotify.com/api/token";
export const scope =
  "user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public";

// On page load, try to fetch auth code from current browser search URL
const args = new URLSearchParams(window.location.search);
const code = args.get("code");

async function getToken(code) {
  const params = {
    method: "GET",
    url: "http://localhost:5000/spotify/token",
    params: {
      code: code,
      verifier: localStorage.getItem("code_verifier"),
    },
  };
  return (await axios.request(params)).data;
}

async function getUserData() {
  const params = {
    method: "GET",
    url: "https://api.spotify.com/v1/me",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };
  return (await axios.request(params)).data;
}

// If we find a code, we're in a callback, do a token exchange
if (code) {
  try {
    const { expires_in, access_token } = await getToken(code);
    localStorage.setItem(
      "expires",
      new Date(new Date().getTime() * expires_in * 1000).getTime()
    );
    localStorage.setItem("access_token", access_token);
    // Remove code from URL so we can refresh correctly.
    const url = new URL(window.location.href);
    url.searchParams.delete("code");
    const updatedUrl = url.search ? url.href : url.href.replace("?", "");
    window.history.replaceState({}, document.title, updatedUrl);
  } catch (error) {
    console.log(error);
  }
  // If we have a token, we're logged in, so fetch user data and save to localStorage
  if (localStorage.getItem("access_token") !== null) {
    try {
      localStorage.setItem("id", (await getUserData()).id);
    } catch (error) {
      console.log(error);
      window.location.href = redirectUrl;
      localStorage.clear();
      alert(
        "Sorry!\nYou are not listet by the developer to use this app.\nThe app uses the development mode and has not an OCTA-extension,\nwhich is required by Spotify to make the App fully public."
      );
    }
  }
}

function App({ store, dispatch }) {
  return (
    <>
      <div id="background">
        <div id="shapeContainer">
          <div id="shape1"></div>
          <div id="shape2"></div>
          <div id="shape3"></div>
        </div>
      </div>
      <div className="App">
        <header>
          <div id="logoContainer" role="presentation">
            <h2 id="logo" aria-roledescription="title logo">
              AiVibe
            </h2>
          </div>
          <div id="playlistTitleContainer" role="presentation">
            <h1
              id="playlistTitle"
              aria-roledescription="Current Playlist Title"
            >
              {store.vibe.playlistTitle &&
              !store.songs.songList &&
              !store.vibe.searchTerm
                ? store.vibe.playlistTitle
                : "Suggestions"}
            </h1>
          </div>
          <hr id="headerLineBreak" role="presentation"></hr>
        </header>
        <SongList store={store} dispatch={dispatch} />
        <Search store={store} dispatch={dispatch} />
      </div>
    </>
  );
}

export default App;
