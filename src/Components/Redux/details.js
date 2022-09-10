import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: String,
  name: String,
  url: String,
  publication: String,
  price: String,
  rating: String,
};

const details = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook(state, action) {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.url = action.payload.imgurl;
      state.publication = action.payload.information;
      state.price = action.payload.price;
      state.rating = action.payload.ratings;
    },
  },
});

export const { addBook } = details.actions;
export default details.reducer;
