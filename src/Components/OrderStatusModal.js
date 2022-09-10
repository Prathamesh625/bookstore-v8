import { Box } from "@mui/system";
import { Card, Modal, Typography, Button, Paper } from "@mui/material";
import { useState } from "react";
import succesLogo from "../check.png";
import failLogo from "../fail.png";
import { useNavigate } from "react-router-dom";

function OrderStatusModal(props) {
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "400px",

    bgcolor: "white",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Box>
      <Modal open={props.modal}>
        {props.modal === true ? (
          <Box sx={style}>
            <img
              src={succesLogo}
              width="200px"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />
            <Typography textAlign="center" fontWeight="bold" marginTop="30px">
              Your Order Placed Successfully !
            </Typography>
            <Typography textAlign="center" marginTop="30px">
              <Button
                variant="contained"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
                onClick={() => navigate("/myOrders")}
              >
                Check Order
              </Button>
            </Typography>
          </Box>
        ) : (
          <Box sx={style}>
            <img
              src={failLogo}
              width="200px"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />
            <Typography textAlign="center" fontWeight="bold" marginTop="30px">
              Your Order Couldn't Placed
            </Typography>
            <Typography textAlign="center" marginTop="30px">
              <Button
                variant="contained"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                Retry
              </Button>
            </Typography>
          </Box>
        )}
      </Modal>
    </Box>
  );
}

export default OrderStatusModal;
