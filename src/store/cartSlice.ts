import {CartDish, Dish} from "../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

interface CartState {
  cartDishes: CartDish[]
}

const initialState:CartState = {
  cartDishes: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, {payload: dish}:PayloadAction<Dish>) => {
      const existingIndex = state.cartDishes.findIndex(item => {
        return item.dish.id === dish.id;
      });

      if (existingIndex !== -1) {
        state.cartDishes[existingIndex].amount++;
      } else {
        state.cartDishes.push({dish, amount: 1})
      }
    },

    resetCart: (state) => {
      state.cartDishes = [];
    },

    updateDishes: (state, {payload: dishes}:PayloadAction<Dish[]>) => {
      const newCartDishes:CartDish[] = [];

      state.cartDishes.forEach(cartDish => {
        const existingDish = dishes.find(dish => dish.id === cartDish.dish.id);

        if (!existingDish) {
          return;
        }

        newCartDishes.push({
          ...cartDish,
          dish: existingDish,
        });
      });

      state.cartDishes = newCartDishes;
    }
  }
});

export const cartReducers = cartSlice.reducer;
export const {addDish, resetCart, updateDishes} = cartSlice.actions;

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;