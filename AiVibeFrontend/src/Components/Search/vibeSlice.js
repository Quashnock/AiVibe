import { createSlice } from "@reduxjs/toolkit";
import GeminiResponse from "../../MockData/GeminiResponse";

const vibeSlice = createSlice({
  name: "vibes",
  initialState: {
    response: GeminiResponse,
    songNameList: [],
  },
  reducers: {
    createSongList: (state) => {
      state.songNameList = state.response
        .split(" / ")
        .map((song) => song.split("-"));
      console.log(state.songNameList);
    },
  },
});

export const { createSongList } = vibeSlice.actions;
export default vibeSlice.reducer;
