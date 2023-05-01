import { createSlice } from "@reduxjs/toolkit";

export const productQuantity = createSlice({
  name: "quantity",
  initialState: {
    value: 0,
    ary: [],
    summaryItem: Number(0),
    total: Number(0),
  },
  reducers: {
    increment: (state, action) => {
      const isSameItem = (a, b) => a.id === b.id;
      const existingIndex = state.ary.findIndex((item) =>
        isSameItem(item, action.payload)
      );
      if (existingIndex === -1) {
        state.ary.push(action.payload);
        // state.ary=[...state.ary,action.payload];
        state.value += 1;
      }
      // replace existing items
      else {
        state.ary.forEach((item, id) =>
          existingIndex === id ? (item = action.payload) : "Ok"
        );
      }
    },
    productQuantiIncrement: (state, action) => {
      state.summaryItem += 1;
      state.total += Number(action.payload);
      state.priceTotal += Number(action.payload);
    },
    productQuantiDecrement: (state, action) => {
      if (state.total > 0) {
        state.summaryItem -= 1;
        state.total -= action.payload;
        state.priceTotal -= action.payload;
      }
    },
    productIncrement: (state, action) => {
      state.ary.forEach((item) => {
        if (item.title === action.payload) {
          item["quantity"] += 1;
        }
      });
    },
    perProductTotalPrice: (state, action) => {
      state.ary.forEach((item) => {
        if (item.title === action.payload) {
          item["totalproductprice"] += item.price;
        }
      });
    },
    productDecrement: (state, action) => {
      state.ary.forEach((item) => {
        if (item.title === action.payload) {
          if (item.quantity > 0) {
            item["quantity"] -= 1;
          }
        }
      });
    },
    removeElement: (state, action) => {
      const { title, quantity } = action;
      let itemIndex = state.ary.findIndex((item) => item.title === title);
      state.ary.splice(itemIndex, 1);
      if (state.value > 0) {
        state.value -= 1;
        state.total = state.total - state.totalproductprice;
        state.summaryItem = state.summaryItem - quantity;
      }
    },
  },
});

export const {
  increment,
  productDecrement,
  productQuantiIncrement,
  productQuantiDecrement,
  productIncrement,
  removeElement,
  perProductTotalPrice,
} = productQuantity.actions;

export default productQuantity.reducer;
