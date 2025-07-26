import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    restaurantId: null,
  },
  reducers: {
    addItems: (state, action) => {
      const item = action.payload;
      const restaurantId = action.meta?.restaurantId;
      if (!state.restaurantId || state.restaurantId === restaurantId) {
        const existingItem = state.items.find(
          (i) => i.card.info.id === item.card.info.id
        );
        if (existingItem) {
          existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
          state.items.push({ ...item, quantity: 1 });
        }
        state.restaurantId = restaurantId; // Set restaurantId if cart was empty
      }
    },
    forceAddItems: (state, action) => {
      const item = action.payload;
      const restaurantId = action.meta.restaurantId;
      state.items = [{ ...item, quantity: 1 }];
      state.restaurantId = restaurantId;
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
      state.restaurantId = null;
    },
  },
});

export const {
  addItems,
  forceAddItems,
  incrementItem,
  decrementItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
