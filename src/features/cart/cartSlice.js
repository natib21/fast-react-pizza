import { createSlice } from '@reduxjs/toolkit';

const intialState = {
  cart: [
    /*   {
      pizzaId: 12,
      name: 'Nathnael',
      quantity: 2,
      unitPrise: 16,
      totalPrice: 32,
    }, */
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  intialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    delateItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrise;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrise;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  delateItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
