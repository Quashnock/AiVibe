import { createSlice } from "@reduxjs/toolkit";
import SpotifyResponse from "../../MockData/SpotifyResponse";

const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [SpotifyResponse],
  },
});

export default songSlice.reducer;
