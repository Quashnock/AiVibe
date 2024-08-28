import "./App.css";
import SongList from "../Components/SongListComponents/SongList";
import Search from "../Components/Search/Search";
import axios from "axios";
import Header from "../Components/Header/Header";

const args = new URLSearchParams(window.location.search);
const code = args.get("code");

async function getToken(code) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.REACT_APP_SPOTIFY_API_KEY,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3000",
      code_verifier: localStorage.getItem("code_verifier"),
    }),
  });
  return await response.json();
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

if (code) {
  try {
    const { expires_in, access_token } = await getToken(code);
    localStorage.setItem(
      "expires",
      new Date(new Date().getTime() + expires_in * 1000).getTime()
    );
    localStorage.setItem("access_token", access_token);
    const url = new URL(window.location.href);
    url.searchParams.delete("code");
    const updatedUrl = url.search ? url.href : url.href.replace("?", "");
    window.history.replaceState({}, document.title, updatedUrl);
  } catch (error) {
    console.log(error);
  }

  if (localStorage.getItem("access_token") !== null) {
    try {
      localStorage.setItem("id", (await getUserData()).id);
    } catch (error) {
      console.log(error);
      window.location.href = "http://localhost:3000";
      localStorage.clear();
      alert("Error Loading Spotify API");
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
        <Header title={store.vibe.playlistTitle} />
        <SongList store={store} dispatch={dispatch} />
        <Search store={store} dispatch={dispatch} />
      </div>
    </>
  );
}

export default App;
