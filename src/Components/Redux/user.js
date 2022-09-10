import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user_id: String,
  user_name: String,
  user_email: String,
  user_mobile: String,
};

const user = createSlice({
  name: "users",
  initialState,
  reducers: {
    userAuth(state, action) {
      state.user_id = action.payload._id;
      state.user_name = action.payload.fname;
      state.user_email = action.payload.email;
      state.user_mobile = action.payload.Mobile;
    },
  },
});

export const { userAuth } = user.actions;
export default user.reducer;
