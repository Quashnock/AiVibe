import "./App.css";
import SongList from "../Components/SongListComponents/SongList";
import Search from "../Components/Search/Search";

function App({ store, dispatch }) {
  return (
    <>
      <div id="background">
        <div id="shape1"></div>
        <div id="shape2"></div>
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
              Suggestions
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
