// src/store/slices/productsSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type ProductPayload = {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

export interface ProductsState {
  lastPosted: ProductPayload | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  lastPosted: null,
  loading: false,
  error: null,
};

export const postProduct = createAsyncThunk<ProductPayload, ProductPayload>(
  "products/post",
  async (payload) => {
    const res = await axios.post("https://fakestoreapi.com/products", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  }
);

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // could add local form handling reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(postProduct.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(postProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.lastPosted = a.payload;
      })
      .addCase(postProduct.rejected, (s, a) => {
        s.loading = false;
        s.error = a.error.message ?? "Error";
      });
  },
});

export default slice.reducer;
