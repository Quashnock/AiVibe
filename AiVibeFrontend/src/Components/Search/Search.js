import { useEffect, useState } from "react";
import UpArrowSVG from "../../Resources/UpArrowSVG";
import { createSongList } from "./vibeSlice";
import "./Search.css";

function Search({ store, dispatch }) {
  const [search, setSearch] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSearch("");
    //TODO: tie to async thunk to process gemini API response
  }

  useEffect(() => {
    dispatch(createSongList());
  }, [dispatch, store.vibe.response, search]);

  return (
    <section id="searchContainer" role="presentation">
      <form id="vibeSearchForm" onSubmit={handleSubmit}>
        <input
          id="searchTextBox"
          type="text"
          maxLength="30"
          placeholder="Enter a vibe for your playlist"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
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
