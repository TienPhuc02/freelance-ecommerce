import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  avatar: {
    public_id: string;
    url: string;
  };
  _id: string;
  name: string;
  email: string;
  role: string;
}

const initialState: CounterState = {
  avatar: {
    public_id: "",
    url: "",
  },
  _id: "",
  name: "",
  email: "",
  role: "",
};

export const counterSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    getAccountRedux: (state, action) => {
      console.log(action.payload);
      state._id = action.payload._id;
      state.avatar.public_id = action.payload.avatar.public_id;
      state.avatar.url = action.payload.avatar.url;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    updateProfileRedux: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logOutUserRedux: (state) => {
      state.avatar.public_id = "";
      state.avatar.url = "";
      state.name = "";
      state.email = "";
      state.role = "";
    },
  },
});

export const { getAccountRedux, updateProfileRedux, logOutUserRedux } =
  counterSlice.actions;

export default counterSlice.reducer;
