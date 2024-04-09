import { createSlice } from "@reduxjs/toolkit";
export interface CartItem {
  quantity: number;
  id: string;
  detail: any; // Kiểu dữ liệu của detail nên được xác định cụ thể
}
export interface CounterState {
  cart: CartItem[];
}

const initialState: CounterState = {
  cart: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    doProductAction: (state, action) => {
      const item = action.payload;

      console.log(item);
      const isExistIndex = state.cart.findIndex((c) => {
        console.log("ttt", c);
        return c.id === item.detail._id;
      });
      console.log("check>>", isExistIndex);
      if (isExistIndex > -1) {
        state.cart[isExistIndex].quantity += item.quantity;
        if (state.cart[isExistIndex].quantity > item.detail.quantity) {
          state.cart[isExistIndex].quantity = item.detail.quantity;
        }
      } else {
        state.cart.push({
          quantity: item.quantity,
          id: item.detail._id,
          detail: item.detail,
        });
      }
    },
  },
});

export const { doProductAction } = orderSlice.actions;

export default orderSlice.reducer;
