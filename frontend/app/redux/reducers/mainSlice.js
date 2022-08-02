import { createSlice } from "@reduxjs/toolkit";

export const MAIN_REDUCER_NAME = "main-reducer";

const initialState = {
  instruments: [],
  loading: true,
};

export const mainSlice = createSlice({
  name: MAIN_REDUCER_NAME,
  initialState,
  reducers: {
    setInstruments: (state, { payload }) => {
      state.instruments = [...payload];
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const selectInstruments = (store) =>
  store[MAIN_REDUCER_NAME].instruments;

export const selectLoading = (store) => store[MAIN_REDUCER_NAME].loading;

export const { setInstruments, setLoading } = mainSlice.actions;

export default mainSlice.reducer;
