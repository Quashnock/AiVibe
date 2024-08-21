import SpotifyLogoSVG from "../../../Resources/SpotifyLogoSVG";
import axios from "axios";
import "./SignInButton.css";

async function handleLoginClick() {
  let params = {
    method: "GET",
    url: "http://localhost:5000/spotify/login",
  };
  const [verifier, href] = (await axios.request(params)).data;
  alert(verifier);
  window.localStorage.setItem("code_verifier", verifier);
  window.location.href = href;
}

function SignInButton() {
  return (
    <button id="signInButton" onClick={handleLoginClick}>
      <h3>Log in with Spotify</h3>
      {SpotifyLogoSVG}
    </button>
  );
}

export default SignInButton;
