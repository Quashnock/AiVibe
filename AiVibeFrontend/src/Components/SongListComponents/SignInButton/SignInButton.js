import SpotifyLogoSVG from "../../../Resources/SpotifyLogoSVG";
import "./SignInButton.css";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=08f45a34c4d34abc87bd67da22a74824&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-modify-private%20user-read-playback-state%20user-modify-playback-state";

function SignInButton() {
  return (
    <button id="signInButton">
      <h3>Log in with Spotify</h3>
      {SpotifyLogoSVG}
    </button>
  );
}

export default SignInButton;
