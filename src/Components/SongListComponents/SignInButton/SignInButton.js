import SpotifyLogoSVG from "../../../Resources/SpotifyLogoSVG";
import { loginWithSpotifyClick } from "../../../Resources/SpotifyApiHandler";
import "./SignInButton.css";

function SignInButton() {
  return (
    <button id="signInButton" onClick={loginWithSpotifyClick}>
      <h3>Log in with Spotify</h3>
      {SpotifyLogoSVG}
    </button>
  );
}

export default SignInButton;
