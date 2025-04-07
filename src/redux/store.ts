import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import tasksReducer from "./slices/tasks";
import productsReducer from "./slices/products";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
    products: productsReducer
  }
});

export default store;
