import { createSlice } from "@reduxjs/toolkit";
import GeminiResponse from "../../MockData/GeminiResponse";

const vibeSlice = createSlice({
  name: "vibes",
  initialState: {
    response: GeminiResponse,
    songNameList: [],
    searchTerm: "",
  },
  reducers: {
    createSongList: (state) => {
      state.songNameList = GeminiResponse.split(" / ").map((song) =>
        song.split("-")
      );
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { createSongList, setSearchTerm } = vibeSlice.actions;
export default vibeSlice.reducer;
