import {
  Card,
  CardContent,
  Container,
  TextField,
  Link,
  Drawer,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  Input,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  ArrowBack,
  Filter,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useState } from "react";

import styled from "styled-components";
import Header from "./Header";
import "./Header.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderStatusModal from "./OrderStatusModal";
import { useDispatch, useSelector } from "react-redux/es/exports";
import user, { userAuth } from "./Redux/user";

// TODO: Replace the following with your app's Firebase project configuration

function Login() {
  const SignInButton = styled(Button)({
    color: "white",
    textTransform: "none",
    width: "100%",
  });
  const GoogleButton = styled(Button)({
    color: "black",
    textTransform: "none",
    width: "100%",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  console.log(firstName);

  const loginUrl = "https://bookstore-backend-v2.onrender.com/new/login";
  const registerUrl = "https://bookstore-backend-v2.onrender.com/new/data";
  const codeVerificationUrl =
    "https://bookstore-backend-v2.onrender.com/new/verification";

  const openModalFun = () => {
    setOpenModal(true);
  };

  const registerFun = async () => {
    const register = await axios.post(registerUrl, {
      fname: firstName,
      lname: lastName,
      email: email,
      password: password,
      Mobile: mobileNo,
      confPassword: confirmPassword,
    });

    console.log(register.data);
    openModalFun();
  };
  const dispatch = useDispatch();
  const authenticationFun = async () => {
    const authenticateUser = await axios.post(loginUrl, {
      email: email,
      password: password,
    });
    console.log(authenticateUser);

    if (
      authenticateUser.data.email === email ||
      authenticateUser.data.password === password
    ) {
      window.localStorage.setItem(
        "userAuth",
        JSON.stringify(authenticateUser.data._id)
      );
      navigate("/");
      dispatch(userAuth(authenticateUser));
    } else {
      alert("email or password may be wrong ");
    }
  };

  const codeVerificationFun = async () => {
    const verify = await axios.post(codeVerificationUrl, {
      code: code,
    });
    console.log(verify.data);
    navigate("/");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "300px",
    bgcolor: "white",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box bgcolor="white">
      <Header state={<ArrowBack onClick={() => navigate("/")} />} />

      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            We have sented an OTP to your device
          </Typography>
          <Box marginTop="20px" />
          <Typography textAlign="center">
            <TextField
              variant="standard"
              label="Enter your OTP here"
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            <Box marginTop="20px" />
            <Button
              variant="contained"
              style={{
                backgroundColor: "#30bfbf",
                textTransform: "none",

                fontWeight: "bold",
              }}
              onClick={codeVerificationFun}
            >
              Verify
            </Button>
          </Typography>
        </Box>
      </Modal>
      <Box marginTop="100px">
        {open !== true ? (
          <Container>
            <Box margin="10%">
              <Typography textAlign="center" fontWeight="bold">
                Sign In
              </Typography>
              <Box>
                <Box margin="30px" />
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  required="true"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <Box margin="30px" />

                <FormControl fullWidth required="true">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton>
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Box margin="30px" />
                <SignInButton variant="contained" onClick={authenticationFun}>
                  <Typography>Sign In</Typography>
                </SignInButton>
                <Box margin="30px" />
                <Typography>
                  Don't have account then{" "}
                  <Link onClick={() => setOpen(true)}>sign up</Link>
                </Typography>
              </Box>
            </Box>
          </Container>
        ) : (
          <Box>
            <Container>
              <Box margin="10%">
                <Typography textAlign="center" fontWeight="bold">
                  Sign Up
                </Typography>

                <Box margin="30px" />
                <TextField
                  fullWidth
                  type="text"
                  label="First Name"
                  value={firstName}
                  required="true"
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
                <Box margin="30px" />
                <TextField
                  fullWidth
                  type="text"
                  label="Last Name"
                  value={lastName}
                  required="true"
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
                />
                <Box margin="30px" />
                <TextField
                  fullWidth
                  type="text"
                  label="Email"
                  value={email}
                  required="true"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <Box margin="30px" />
                <TextField
                  fullWidth
                  label="Mobile Number"
                  required="true"
                  type="number"
                  value={mobileNo}
                  onChange={(event) => {
                    setMobileNo(event.target.value);
                  }}
                />

                <Box margin="30px" />

                <FormControl fullWidth required="true">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton>
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Box margin="30px" />

                <FormControl fullWidth required="true">
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton>
                          <Visibility />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>

                <Box margin="30px" />
                <SignInButton variant="contained" onClick={registerFun}>
                  Sign up
                </SignInButton>
                <Box margin="30px" />
                <Typography>
                  If you are already a member
                  <Link onClick={() => setOpen(false)}> Sign in</Link>
                </Typography>
              </Box>
            </Container>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Login;
