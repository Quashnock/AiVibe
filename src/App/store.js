import { configureStore } from "@reduxjs/toolkit";
import vibeSlice from "../Components/Search/vibeSlice";
import songsSlice from "../Components/SongListComponents/songsSlice";

export default configureStore({
  reducer: {
    songs: songsSlice,
    vibe: vibeSlice,
  },
});
