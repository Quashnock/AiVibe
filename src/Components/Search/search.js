import UpArrowSVG from "../../Resources/UpArrowSVG";
import "./Search.css";

function Search() {
  return (
    <section id="searchContainer" role="presentation">
      <form id="vibeSearchForm">
        <input
          id="searchTextBox"
          type="text"
          maxLength="30"
          placeholder="Enter a vibe for your playlist"
        ></input>
        <button
          type="submit"
          id="submitButton"
          aria-roledescription="Submit Button"
        >
          {UpArrowSVG}
        </button>
      </form>
    </section>
  );
}

export default Search;
