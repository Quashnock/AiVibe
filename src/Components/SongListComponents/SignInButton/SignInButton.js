import SpotifyLogoSVG from "../../../Resources/SpotifyLogoSVG";
import "./SignInButton.css";

function SignInButton() {
  return (
    <button id="signInButton">
      <h3>Add to Playlist</h3>
      {SpotifyLogoSVG}
    </button>
  );
}

export default SignInButton;
