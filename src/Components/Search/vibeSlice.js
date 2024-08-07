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
      state.songNameList = GeminiResponse.split(" / ").split("-");
    },
  },
});

export const { createSongList } = vibeSlice.actions;
export default vibeSlice.reducer;
