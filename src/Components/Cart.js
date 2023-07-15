import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../EmptyCart.png";
import { Notifications } from "@mui/icons-material";
import styled from "styled-components";
import { ArrowBack } from "@mui/icons-material";
import "./Header.css";
import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { add } from "./Redux/cart";
import { amount } from "./Redux/payment";
function Cart() {
  const [count, setCount] = useState(0);
  const [myCartItems, setMyCartItems] = useState([]);
  const dispatch = useDispatch();

  const getMyUserId = JSON.parse(localStorage.getItem("userAuth"));
  console.log(getMyUserId);
  const myCart = `https://bookapi-weil.onrender.com/cart/${getMyUserId}/myCart/all/items`;

  useEffect(() => {
    const cartFun = async () => {
      const cartItems = await axios.get(myCart);
      console.log(cartItems.data.cart);
      setMyCartItems(cartItems.data.cart);
      dispatch(add(myCartItems));
    };
    cartFun();
  }, []);

  console.log(myCartItems);

  useEffect(() => {
    let price = 0;
    myCartItems.map((data) => {
      return (price = price + data.price);
    });
    console.log(price);
    setCount(price);
    dispatch(amount(count));
  });

  const selector = useSelector((state) => state.cart);
  console.log(selector);
  const navigate = useNavigate();

  const ButtonStyle = styled(Button)({
    backgroundColor: "orangered",
  });
  const totalAmount = useSelector((state) => state.amount);
  console.log(totalAmount);
  const PlaceOrderButton = styled(Button)({
    backgroundColor: "red",
  });

  // console.log(selector.length);

  return (
    <Box>
      <Header
        state={<ArrowBack onClick={() => navigate("/")} />}
        component="Cart"
        icon={<Notifications />}
      />
      {myCartItems.length !== 0 ? (
        <div className="margin-to-cart">
          <Box>
            <Grid container columns={12}>
              <Grid xs={12} md={8}>
                <div className="border">
                  <Box marginBottom="10px" marginTop="10px">
                    <Card variant="outlined">
                      <Box height="50px">
                        <Typography fontWeight="bold" textAlign="center">
                          Bookstore({myCartItems.length})
                        </Typography>
                      </Box>
                    </Card>
                  </Box>
                  <Box marginBottom="10px">
                    <Card variant="outlined">
                      <Box height="100%">
                        <CardContent>
                          <Typography>
                            Save on books much more with limited time offers
                          </Typography>
                        </CardContent>
                      </Box>
                    </Card>
                  </Box>
                  <Paper elevation={2}>
                    <div className="flow">
                      <Box height="100%" overflow="scroll">
                        <CardContent>
                          <Box>
                            {myCartItems.map((data) => {
                              return (
                                <Box display="flex" marginBottom="10px">
                                  <img
                                    src={`${data.url}&raw=1`}
                                    width="150px"
                                    height="150px"
                                    alt="img"
                                  />
                                  <Box marginLeft="10px">
                                    <Typography width="10rem">
                                      {data.name}
                                    </Typography>
                                    <Typography>₹{data.price}</Typography>
                                  </Box>
                                  <Divider />
                                </Box>
                              );
                            })}
                          </Box>
                        </CardContent>
                      </Box>
                    </div>

                    <div className="filter">
                      <Paper elevation={5}>
                        <Box height="100%" margin="10px">
                          <CardContent>
                            <Typography textAlign="end">
                              <ButtonStyle
                                variant="contained"
                                onClick={() => navigate("/myOrder")}
                              >
                                Place Order
                              </ButtonStyle>
                            </Typography>
                          </CardContent>
                        </Box>
                      </Paper>
                    </div>
                  </Paper>
                </div>
              </Grid>

              <Grid xs={12} md={4}>
                <div className="border">
                  <Box marginBottom="20px">
                    <Card variant="outlined">
                      <CardContent>
                        <Typography color="gray">PRICE DETAILS</Typography>
                      </CardContent>
                      <Divider />
                      <CardContent>
                        <Box height="200px">
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            marginBottom="10px"
                          >
                            <Typography>
                              Price({myCartItems.length} Item)
                            </Typography>

                            <Typography>₹{count}</Typography>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            marginBottom="10px"
                          >
                            <Typography>Discount</Typography>

                            <Typography color="green">
                              -₹{(count * 20) / 100}
                            </Typography>
                          </Box>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            marginBottom="10px"
                          >
                            <Typography>Delivery Charges</Typography>

                            <Typography>₹{count}</Typography>
                          </Box>
                          <Divider />
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            margin="20px 0 20px 0"
                          >
                            <Typography fontWeight="bold">
                              Total Amount
                            </Typography>

                            <Typography fontWeight="bold">
                              ₹{count - (count * 20) / 100}
                            </Typography>
                          </Box>
                          <Divider />
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            margin="20px 0 20px 0"
                          >
                            <Typography
                              color="#388e3c"
                              fontSize="16px"
                              fontWeight="600"
                            >
                              You will save 300 on this order
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </div>
              </Grid>
            </Grid>

            <div className="show_pay_comp">
              <Box>
                <Paper elevation={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between">
                        <Typography textAlign="start" fontWeight="bold">
                          ₹{count}
                        </Typography>
                        <Typography>
                          <PlaceOrderButton
                            variant="contained"
                            onClick={() => navigate("/myOrder")}
                          >
                            Place Order
                          </PlaceOrderButton>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Paper>
              </Box>
            </div>
          </Box>
        </div>
      ) : (
        <Box marginTop="20rem">
          <Typography textAlign="center">
            <img src={EmptyCart} width="150px" />
          </Typography>
          <Box margin="10px" />
          <Typography textAlign="center"> Your Cart Is Empty</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Cart;
