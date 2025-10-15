// src/utils/api.ts
import axios from "axios";
export const fetchBerryDetail = async (name: string) => {
  const res = await axios.get(`https://pokeapi.co/api/v2/berry/${name}`);
  return res.data;
};

export const fetchProductDetail = async (id: number) => {
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return res.data;
};
