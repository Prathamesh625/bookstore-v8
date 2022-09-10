import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pay: String,
};

const payment = createSlice({
  name: "cart",
  initialState,
  reducers: {
    amount(state, actions) {
      state.pay = actions.payload;
    },
  },
});

export const { amount } = payment.actions;
export default payment.reducer;
