import { useState } from "react";
import UpArrowSVG from "../../Resources/UpArrowSVG";
import { getGeminiResponse, setSearchTerm } from "./vibeSlice";
import "./Search.css";
import { getSongs } from "../SongListComponents/songsSlice";

function Search({ store, dispatch }) {
  const [search, setSearch] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(setSearchTerm(search));
    if (search) {
      dispatch(getSongs(store.vibe.songNameList));
      dispatch(getGeminiResponse(search));
      setSearch("");
    }
  }

  return (
    <section id="searchContainer" role="presentation">
      <form id="vibeSearchForm" onSubmit={handleSubmit}>
        <input
          id="searchTextBox"
          type="text"
          placeholder="Enter a vibe for your playlist"
          value={search}
          aria-roledescription="Search Text Box"
          onChange={({ target }) => setSearch(target.value)}
        ></input>
        <button
          type="submit"
          id="submitButton"
          name="Submit Search Button"
          aria-roledescription="Submit Search Button"
        >
          {UpArrowSVG}
        </button>
      </form>
    </section>
  );
}

export default Search;
