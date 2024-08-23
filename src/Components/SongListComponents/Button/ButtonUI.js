import SpotifyLogoSVG from "../../../Resources/SpotifyLogoSVG";
import "./ButtonUI.css";

function ButtonUI({ text, clickHandler, isSignIn = false }) {
  return (
    <button className="buttonUI" onClick={clickHandler}>
      <h3>{text}</h3>
      {isSignIn && SpotifyLogoSVG}
    </button>
  );
}

export default ButtonUI;
