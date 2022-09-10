import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  personId: String,
  personName: String,
  personAddress: String,
  orderDetails: [],

  payment: {
    success: Boolean,
    amount: String,
  },
  date: {
    date: String,
    time: String,
  },
};

const orders = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrders(state, action) {
      state.personId = action.payload.personId;
      state.personName = action.payload.personName;
      state.personAddress = action.payload.personAddress;
      state.orderDetails.push(action.payload.orderDetails);
      state.payment = action.payload.payment;
      state.date = action.payload.date;
    },
  },
});

export const { addOrders } = orders.actions;
export default orders.reducer;
