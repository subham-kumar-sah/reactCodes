import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItems: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i.card.info.id === item.card.info.id
      );
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    incrementItem: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.card.info.id === id);
      if (item) item.quantity += 1;
    },
    decrementItem: (state, action) => {
      const id = action.payload;
      const item = state.items.find((i) => i.card.info.id === id);
      if (item && item.quantity > 1) item.quantity -= 1;
      else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.card.info.id !== id);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItems, incrementItem, decrementItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
