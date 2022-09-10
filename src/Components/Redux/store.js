import { configureStore } from "@reduxjs/toolkit";
import myCart from "./cart";
import details from "./details";
import product from "./product";
import orders from "./orders";
import user from "./user";
import payment from "./payment";

const store = configureStore({
  reducer: {
    cart: myCart,
    book: details,
    products: product,
    order: orders,
    users: user,
    amount: payment,
  },
});

export default store;
