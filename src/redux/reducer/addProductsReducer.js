import { createSlice } from "@reduxjs/toolkit";

export const productQuantity = createSlice({
  name: "quantity",
  initialState: {
    productItems: [],
    productData: { productQuantity: 0, totalPrice: 0 },
  },
  reducers: {
    productList: (state, action) => {
      const existingIndex = state.productItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex === -1) {
        state.productItems.push(action.payload);
        return;
      }

      state.productItems.forEach((item, id) =>
        existingIndex === id ? (item = action.payload) : "Ok"
      );
    },
    productIncrement: (state, action) => {
      state.productItems.forEach((item) => {
        if (item.id === Number(action.payload)) {
          item["quantity"] += 1;
          item["totalproductprice"] += item.price;
        }
      });
    },
    productDecrement: (state, action) => {
      state.productItems.forEach((item) => {
        if (item.id === Number(action.payload)) {
          item["quantity"] -= 1;
          item["totalproductprice"] -= item.price;
        }
      });
    },
    removeElement: (state, action) => {
      const { id } = action;
      const itemIndex = state.productItems.findIndex(
        (item) => item.title === id
      );
      state.productItems.splice(itemIndex, 1);
     
    },
  },
});

export const {
  productList,
  productDecrement,
  productIncrement,
  removeElement,
} = productQuantity.actions;

export default productQuantity.reducer;
