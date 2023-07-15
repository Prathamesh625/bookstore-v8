import {
  Card,
  CardContent,
  Container,
  Grid,
  Rating,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Button,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { useEffect, useState } from "react";
import Header from "./Header";
import "./Header.css";
import { addOrders } from "./Redux/orders";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function MyOrder() {
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();

  const getMyUserId = JSON.parse(localStorage.getItem("userAuth"));
  console.log(getMyUserId);
  useEffect(() => {
    const orders = async () => {
      const myOrders = await axios.get(
        `https://bookapi-weil.onrender.com/orders/${getMyUserId}/yourOrders/details`
      );
      console.log(myOrders.data);
      setOrder(myOrders.data);
      dispatch(addOrders(myOrders.data));
    };
    if (getMyUserId) {
      orders();
    }
  }, []);

  const getOrders = useSelector((state) => state.order);
  console.log(getOrders);

  const navigate = useNavigate();
  return (
    <Box>
      <Header state={<ArrowBack onClick={() => navigate("/")} />} />
      <div className="margin-to-cart">
        <Grid container columns={12}>
          <Grid xs={12} md={4}>
            <Box marginBottom="10px" marginTop="10px">
              <div className="border">
                <Card variant="outlined">
                  <Box height="100%">
                    <CardContent>
                      <Typography color="gray">ORDER DETAILS</Typography>
                    </CardContent>
                    <Divider />
                    <Box />
                    <CardContent>
                      <Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          marginBottom="10px"
                        >
                          <Typography>Person Name</Typography>
                          <Typography fontWeight="bold">
                            {getOrders.personName}
                          </Typography>
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          marginBottom="10px"
                        >
                          <Typography>No. Of Books</Typography>
                          <Typography fontWeight="bold">7</Typography>
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          marginBottom="10px"
                        >
                          <Typography>Amount Paid</Typography>
                          <Typography color="green" fontWeight="bold">
                            ₹{getOrders.payment.amount}
                          </Typography>
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          marginBottom="10px"
                        >
                          <Typography> Placed At</Typography>
                          <Typography fontWeight="bold">
                            {getOrders.date.time}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          marginBottom="10px"
                        >
                          <Typography> Placed On</Typography>
                          <Typography fontWeight="bold">
                            {getOrders.date.date}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              </div>
              <div className="border">
                <Card variant="outlined">
                  <Box height="100%">
                    <CardContent>
                      <Typography>deliver to- </Typography>

                      <Box />

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        marginBottom="10px"
                      >
                        <Typography>
                          <Typography>
                            <strong>
                              {getOrders.personName} {""}
                            </strong>
                            {getOrders.personAddress}
                          </Typography>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Box>
                </Card>
              </div>
              <div className="border">
                <Card variant="outlined">
                  <Box height="100%">
                    <CardContent>
                      <Stepper a orientation="vertical">
                        <Step>
                          <StepLabel>Pick up from Bookstore</StepLabel>
                          <StepContent>
                            <Typography>
                              Your Order pick up processing done
                            </Typography>
                          </StepContent>
                        </Step>
                        <Step>
                          <StepLabel>transported your Order</StepLabel>
                          <StepContent></StepContent>
                        </Step>
                        <Step>
                          <StepLabel>Delivered</StepLabel>
                          <StepContent>
                            <Typography>
                              You will get Notification after Successfull
                              Delivery
                            </Typography>
                          </StepContent>
                        </Step>
                      </Stepper>
                    </CardContent>
                  </Box>
                </Card>
              </div>
            </Box>
          </Grid>
          <Grid xs={12} md={8}>
            <Box marginBottom="10px" marginTop="10px">
              <div className="border">
                <Paper>
                  <CardContent>
                    <div className="flow">
                      <Box
                        height="100%"
                        overflow="scroll"
                        style={{ overflowX: "hidden" }}
                      >
                        {order.map((m) => {
                          return (
                            <Box width="100%" display="flex" margin="5%">
                              <img src={`${m.imgurl}&raw=1`} width="150px" />
                              <Box marginLeft="10%">
                                <Typography>{m.name}</Typography>
                                <Typography>₹{m.price}</Typography>
                                <Typography>
                                  <Rating />
                                </Typography>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </div>
                  </CardContent>
                </Paper>
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

export default MyOrder;

/*








<Stepper a orientation="vertical">
                      <Step>
                        <StepLabel>PickUp from Bookstore</StepLabel>
                        <StepContent>
                          <Typography>
                            Your Order pick up processing done
                          </Typography>
                        </StepContent>
                      </Step>
                      <Step>
                        <StepLabel>transported your Order</StepLabel>
                        <StepContent></StepContent>
                      </Step>
                      <Step>
                        <StepLabel>Delivered</StepLabel>
                        <StepContent>
                          <Typography>
                            You will get Notification after Successfull Delivery
                          </Typography>
                        </StepContent>
                      </Step>
                    </Stepper>
























                     <Card>
                  <CardContent>
                    <Box height="500px" overflow="scroll">
                      {data.map((m) => {
                        return (
                          <Box width="100%" display="flex" margin="5%">
                            <img src={`${m.imgurl}&raw=1`} width="150px" />
                            <Box marginLeft="10%">
                              <Typography>{m.name}</Typography>
                              <Typography>₹{m.price}</Typography>
                              <Typography>
                                <Rating />
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </CardContent>
                </Card>

                    */
