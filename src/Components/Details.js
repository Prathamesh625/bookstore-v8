import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import "./Details.css";
import "./Header.css";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Snackbar,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import { add } from "./Redux/cart";
import { Badge, CardContent } from "@mui/material";
import { AddBox, ArrowBack, ShoppingCart } from "@mui/icons-material";

import Cart from "./Cart";
import axios from "axios";
import { useEffect, useState } from "react";

function Details() {
  const s = useSelector((state) => state.book);
  //const data = JSON.parse(window.localStorage.getItem("book"));
  //console.log(data);
  const navigate = useNavigate();
  console.log(s);
  const location = useLocation();
  console.log(location.state);
  const getstate = useSelector((state) => state.cart);
  console.log(getstate);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(s);

  const getMyUserId = JSON.parse(localStorage.getItem("userAuth"));
  console.log(getMyUserId);

  const action = async () => {
    const sendToServerUrl = `https://bookapi-weil.onrender.com/cart/${getMyUserId}/update/cart`;

    const postCartToServer = await axios.put(sendToServerUrl, {
      cart: s,
    });
    console.log(postCartToServer);

    //dispatch(add(s));
    setOpen(true);
  };

  const buyNow = async () => {
    const sendToServerUrl = `https://bookapi-weil.onrender.com/cart/${getMyUserId}/update/cart`;
    const postCartToServer = await axios.put(sendToServerUrl, {
      cart: s,
    });
    console.log(postCartToServer);
    // dispatch(add(s));
    navigate("/myOrder");
  };

  const cartValue = useSelector((state) => state.cart);

  const BuyNow = styled(Button)({
    width: "100%",
    backgroundColor: "aqua",
    color: "black",
    fontWeight: "bold",
    height: "50px",
  });

  const AddToCart = styled(Button)({
    width: "100%",
    backgroundColor: "orange",
    color: "black",
    fontWeight: "bold",
    height: "50px",
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box>
      <Header
        state={<ArrowBack onClick={() => navigate("/products")} />}
        component="details"
        icon={
          <Box onClick={() => navigate("/myCart")}>
            <Badge badgeContent={cartValue} color="error">
              <ShoppingCart />
            </Badge>
          </Box>
        }
      />

      <Dialog
        open={open}
        TransitionComponent="bottom"
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box style={{ backgroundColor: "orange" }}>
          <DialogTitle>Item Added To Cart Succesfully</DialogTitle>

          <DialogActions>
            <Button
              variant="contained"
              style={{
                backgroundColor: "aqua",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={handleClose}
            >
              Ok
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <div className="margin-to-cart">
        <div>
          <Box bgcolor="white">
            <Grid container columns={12}>
              <Grid xs={12} md={5}>
                <Box>
                  <div className="border">
                    <div className="border">
                      <Box>
                        <CardContent>
                          <Card variant="outlined">
                            <Box height="500px">
                              <Typography textAlign="center" padding="10%">
                                <img
                                  src={`${s.url}&raw=1`}
                                  width="100%"
                                  height="400px"
                                  alt="img"
                                />
                              </Typography>
                            </Box>
                          </Card>
                          <div className="show-buttons">
                            <Box display="flex" marginTop="20px">
                              <AddToCart
                                variant="contained"
                                onClick={() => action()}
                              >
                                Add To Cart
                              </AddToCart>
                              <Box marginRight="10px" />
                              <BuyNow
                                variant="contained"
                                onClick={() => buyNow()}
                              >
                                Buy Now
                              </BuyNow>
                            </Box>
                          </div>
                        </CardContent>
                      </Box>
                    </div>
                  </div>
                </Box>
              </Grid>

              <Grid xs={12} md={7}>
                <div className="border">
                  <Box>
                    <CardContent>
                      <Box height="300px">
                        <Typography>
                          {s.name} Samanya Gyan / General Knowledge In Hindi
                          Useful For SSC Railway Police Army Air Force Lekhpal
                        </Typography>
                        <Typography fontWeight="400" fontSize="2rem">
                          ₹{s.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Box>
          <div className="show_pay_comp">
            <Box display="flex">
              <AddToCart onClick={() => action()} variant="contained">
                Add To Cart
              </AddToCart>
              <BuyNow variant="contained">Buy Now</BuyNow>
            </Box>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default Details;

/*




 <Box>
      <Box width="100%" marginRight="10%">
        <Box>
          <Grid container>
            <Box width="25rem" margin="20px">
              <Card variant="outlined">
                <CardContent>
                  <Grid xs={12} md={6}>
                    <Box textAlign="center">
                      <img src={`${s.url}&raw=1`} width="200px" />
                    </Box>
                  </Grid>
                </CardContent>
              </Card>
              <div className="button">
                <Box>
                  <Card variant="outlined">
                    <CardContent>
                      <Grid xs={12}>
                        <Box display="flex">
                          <ButtonStyle
                            variant="contained"
                            onClick={() => action()}
                          >
                            Add To Cart
                          </ButtonStyle>

                          <ButtonStyle variant="contained">Buy Now</ButtonStyle>
                        </Box>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              </div>
            </Box>

            <Box width="25rem" margin="20px">
              <Card variant="outlined">
                <CardContent>
                  <Grid xs={12} md={6}>
                    <Box>
                      <Typography fontWeight="bold">{s.name}</Typography>
                      <Typography fontWeight="bold" fontSize="2rem">
                        ₹{s.price}
                      </Typography>
                      <Typography color="green">40% off</Typography>
                      <Typography>{s.information}</Typography>
                    </Box>
                  </Grid>
                </CardContent>
              </Card>
              <Box marginTop="20px">
                <Card variant="outlined">
                  <CardContent>
                    <Grid xs={12} md={6}>
                      <Box>
                        <Typography fontWeight="bold">
                          Specifications
                        </Typography>
                      </Box>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
              <Box marginTop="20px">
                <Card variant="outlined">
                  <CardContent>
                    <Grid xs={12} md={6}>
                      <Box>
                        <Typography fontWeight="bold">
                          Rating & Reviews
                        </Typography>
                        <Rating />
                      </Box>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>












*/
