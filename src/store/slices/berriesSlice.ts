// src/store/slices/berriesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type BerryItem = { name: string; url: string };

export interface BerriesState {
  items: BerryItem[];
  loading: boolean;
  error: string | null;
}

const initialState: BerriesState = { items: [], loading: false, error: null };

// fetch all berries (limit large)
export const fetchBerries = createAsyncThunk<BerryItem[]>(
  "berries/fetchAll",
  async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/berry/?limit=1000");
    return res.data.results as BerryItem[];
  }
);

const slice = createSlice({
  name: "berries",
  initialState,
  reducers: {
    removeBerry(state, action: PayloadAction<string>) {
      state.items = state.items.filter((b) => b.name !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBerries.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchBerries.fulfilled, (s, a) => {
        s.items = a.payload;
        s.loading = false;
      })
      .addCase(fetchBerries.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message ?? "Error";
      });
  },
});

export const { removeBerry } = slice.actions;
export default slice.reducer;
