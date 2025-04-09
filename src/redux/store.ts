import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import tasksReducer from "./slices/tasks";
import productsReducer from "./slices/products";
import cartReducer from "./slices/cart";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    products: productsReducer,
    cart: cartReducer
  }
});

export default store;
