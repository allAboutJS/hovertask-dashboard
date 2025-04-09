import { createSlice, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";
import { Product } from "../../../types";

const productsSlice = createSlice<
  { value: Product[] | null },
  SliceCaseReducers<{ value: Product[] | null }>,
  string,
  SliceSelectors<{ value: Product[] | null }>,
  string
>({
  name: "products",
  initialState: {
    value: null
  },
  reducers: {
    setProducts(state, action: { payload: Product[] }) {
      state.value = action.payload;
    }
  }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
