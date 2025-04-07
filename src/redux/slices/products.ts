import { createSlice, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";
import { Product } from "../../../types";

const products: Product[] = [];

const productsSlice = createSlice<
  { value: Product[] | null },
  SliceCaseReducers<{ value: Product[] | null }>,
  string,
  SliceSelectors<{ value: Product[] | null }>,
  string
>({
  name: "auth",
  initialState: {
    value: products
  },
  reducers: {
    setProducts(state, action: { payload: Product[] }) {
      state.value = action.payload;
    }
  }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
