import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Input,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { ArrowBack, ExpandMore, Notifications } from "@mui/icons-material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import OrderStatusModal from "./OrderStatusModal";
const PayButton = styled(Button)({
  backgroundColor: "#10258f",
  width: "100%",
});
function Order() {
  const totalAmount = useSelector((state) => state.amount);
  console.log(totalAmount);
  const [myCartItems, setMyCartItems] = useState([]);
  const getUserDetails = useSelector((state) => state.users);
  const getMyUserId = JSON.parse(localStorage.getItem("userAuth"));
  console.log(getMyUserId);
  const myCart = `https://bookstore-backend-v2.onrender.com/cart/${getMyUserId}/myCart/all/items`;

  useEffect(() => {
    const cartFun = async () => {
      const cartItems = await axios.get(myCart);
      console.log(cartItems.data.cart);
      setMyCartItems(cartItems.data.cart);
    };
    cartFun();
  }, []);

  console.log(myCartItems);

  const CashOnDelivery = styled(Button)({
    backgroundColor: "cyan",
    color: "black",
    fontWeight: "bold",
    width: "100%",
  });
  const PayButton = styled(Button)({
    backgroundColor: "orange",
    color: "black",
    fontWeight: "bold",
    width: "100%",
  });

  const [paymentVerification, setPaymentVerification] = useState(true);
  console.log(paymentVerification);

  const user = useSelector((state) => state.users);
  console.log(user);
  const sendOrder = async () => {
    const myOrder = await axios.post(
      "https://bookapi-2.herokuapp.com/orders/create/new/order",
      {
        personName: user.user_name,
        personId: user.user_id,
        personEmail: user.user_email,
        personMobileNo: user.user_mobile,
        personAddress: "kop",
        orderDetails: myCartItems,
        payment: {
          success: paymentVerification,
          amount: totalAmount.pay,
        },
      }
    );
    console.log(myOrder);
  };
  const [open, setOpen] = useState(false);
  const order = async () => {
    const orderData = await axios.post(
      "https://bookstore-backend-v2.onrender.com/payments/pay",
      {
        amount: totalAmount.pay * 100,
      }
    );

    pay(orderData.data.id);
  };

  const pay = async (orderId) => {
    var options = {
      key: "rzp_test_JqUdq6ytoMlBPu", // Enter the Key ID generated from the Dashboard
      amount: "5000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Razorpay",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response) => {
        const payment = await axios.post(
          "https://bookstore-backend-v2.onrender.com/payments/verifyOrder",
          {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }
        );
        console.log(payment.data.success);

        setPaymentVerification(payment.data.success);
        if (payment.data.success === true) {
          setOpenModal(true);
          setPaymentVerification(true);
          sendOrder();
        } else {
          setOpenModal(false);
          setPaymentVerification(false);
        }
        console.log(response);
      },
      prefill: {
        name: getUserDetails.user_name,
        email: getUserDetails.user_email,
        contact: getUserDetails.user_mobile,
      },
      notes: {
        address: "Bookstore",
      },
      theme: {
        color: "pink",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.description);
    });
    rzp1.open();
  };

  const selector = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box>
      <Header
        state={<ArrowBack onClick={() => navigate("/myCart")} />}
        component="My Orders"
      />
      <div className="margin-to-cart">
        <OrderStatusModal modal={openModal} />
        <Grid container columns={12}>
          <Grid xs={12} md={8}>
            <Box height="100%" marginTop="10px">
              <Box>
                <div className="border">
                  <Box>
                    <Card variant="outlined">
                      <CardContent>
                        <Box display="flex" justifyContent="space-between">
                          <Box display="flex">
                            <Typography color="gray">LOGIN</Typography>
                            <Box marginLeft="20px" />
                            <Typography>123654789</Typography>
                          </Box>
                          <Typography textAlign="end">
                            <Button variant="contained">change</Button>
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </div>
                <div className="border">
                  <Box>
                    <Card variant="outlined">
                      <CardContent>
                        <Box display="flex" justifyContent="space-between">
                          <Box>
                            <Typography color="gray">
                              DELIVERY ADDRESS
                            </Typography>
                            <Typography>Maratha Colony </Typography>
                          </Box>
                          <Typography textAlign="end">
                            <Button variant="contained">change</Button>
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </div>
                <div className="border">
                  <Box>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography fontWeight="bold">
                          Summary Details
                        </Typography>
                      </CardContent>
                      <Divider />
                      <CardContent>
                        <div className="flow">
                          <Box overflow="scroll" height="300px">
                            {myCartItems.map((data) => {
                              return (
                                <Box display="flex" marginBottom="10px">
                                  <img
                                    src={`${data.url}&raw=1`}
                                    width="100px"
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
                        </div>
                      </CardContent>
                    </Card>
                  </Box>
                </div>
              </Box>
              <div className="border">
                <Box>
                  <Card variant="outlined">
                    <CardContent>
                      <Box display="flex" justifyContent="space-between">
                        <Typography>
                          Order Confirmation email will sent to
                        </Typography>
                        <Box marginLeft="10px" />
                        <Typography textAlign="end">
                          <Button
                            variant="contained"
                            onClick={() => setOpen(true)}
                          >
                            continue
                          </Button>
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </div>
              <div className="filter">
                <Box margin="10px">
                  <Card variant="outlined">
                    <Accordion expanded={open === true}>
                      <AccordionSummary>
                        <Typography> Payment Option</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Button onClick={order}>PAY</Button>
                      </AccordionDetails>
                      <AccordionDetails>
                        <Typography>
                          <Button>CASH ON DELIVERY</Button>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Card>
                </Box>
              </div>
            </Box>
          </Grid>

          <Grid xs={12} md={4}>
            <div className="border">
              <Box marginBottom="20%">
                <Paper>
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
                        <Typography>Price({selector.length} Item)</Typography>

                        <Typography>₹300</Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        marginBottom="10px"
                      >
                        <Typography>Discount</Typography>

                        <Typography color="green">-₹300</Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        marginBottom="10px"
                      >
                        <Typography>Delivery Charges</Typography>

                        <Typography>₹300</Typography>
                      </Box>
                      <Divider />
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        margin="20px 0 20px 0"
                      >
                        <Typography fontWeight="bold">Total Amount</Typography>

                        <Typography fontWeight="bold">₹900</Typography>
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
                </Paper>
              </Box>
            </div>
          </Grid>
        </Grid>
        <div className="show_pay_comp">
          <Box height="50px">
            <Card>
              <Box display="flex" height="50px">
                <PayButton variant="contained" onClick={order}>
                  PAY
                </PayButton>

                <CashOnDelivery variant="contained">
                  CASH ON DELIVERY
                </CashOnDelivery>
              </Box>
            </Card>
          </Box>
        </div>
      </div>
    </Box>
  );
}

export default Order;
