import { createSlice } from "@reduxjs/toolkit";
import SpotifyResponse from "../../MockData/SpotifyResponse";

const songSlice = createSlice({
  name: "songs",
  initialState: {
    songResponseList: [
      SpotifyResponse,
      SpotifyResponse,
      SpotifyResponse,
      SpotifyResponse,
      SpotifyResponse,
      SpotifyResponse,
      SpotifyResponse,
      SpotifyResponse,
    ],
  },
});

export default songSlice.reducer;
