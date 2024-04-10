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
          detail: { ...item.detail, stock: item.detail.stock - item.quantity },
        });
      }
    },
    doUpdateOrder: (state, action) => {
      const item = action.payload;
      console.log(item);
      const isExistIndex = state.cart.findIndex((c) => {
        return c.id === item.product.id;
      });
      console.log("check>>", isExistIndex);
      if (isExistIndex > -1) {
        const updateQuantity =
          item.quantity - state.cart[isExistIndex].quantity;
        state.cart[isExistIndex].quantity = item.quantity;
        state.cart[isExistIndex].detail.stock -= updateQuantity;
        if (state.cart[isExistIndex].quantity > item.quantity) {
          state.cart[isExistIndex].quantity = item.quantity;
        }
      } else {
        state.cart.push({
          quantity: item.quantity,
          id: item.detail._id,
          detail: {
            ...item.detail,
            stock: item.product.detail.stock - item.quantity,
          },
        });
      }
    },
    doClearCart: (state) => {
      state.cart = []; // Clear the cart upon logout
    },
    doDeleteItemCartAction: (state, action) => {
      state.cart = state.cart.filter((c) => c.id !== action.payload._id);
    },
  },
});

export const { doProductAction, doUpdateOrder, doDeleteItemCartAction } =
  orderSlice.actions;

export default orderSlice.reducer;
