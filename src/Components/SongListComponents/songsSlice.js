import { createSlice } from "@reduxjs/toolkit";
import SpotifyResponse from "../../MockData/SpotifyResponse";

const songSlice = createSlice({
  name: "songs",
  initialState: {
    songResponseList: [SpotifyResponse],
  },
});

export default songSlice.reducer;
