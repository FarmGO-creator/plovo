import {configureStore} from "@reduxjs/toolkit";
import {cartReducers} from "../store/cartSlice";
import {dishesReducer} from "../store/dishesSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducers,
    dishes: dishesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;