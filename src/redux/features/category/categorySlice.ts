import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CategoryState {
  category: string[] | never[];
}

const initialState: CategoryState = {
  category: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setArrayCategory: (state, action: PayloadAction<string[]>) => {
      state.category = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setArrayCategory } = categorySlice.actions;

export default categorySlice.reducer;
