import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import {
  Avatar,
  ButtonBase,
  Card,
  CardContent,
  Drawer,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  Button,
  ListItemText,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./Header.css";
import { add, addBook } from "./Redux/details";

import BottomNavigateComponent from "./BottomNavigateComponent.js";
import Header from "./Header";
import {
  AccountCircle,
  ArrowBack,
  BeachAccessOutlined,
  Favorite,
  FavoriteOutlined,
  Login,
  Logout,
  Menu,
  Notifications,
  Search,
  Settings,
  ShoppingBag,
  ShoppingBagOutlined,
  WorkOutline,
} from "@mui/icons-material";

import BookFetchComponent from "./BookFetchComponent";
import OrderStatusModal from "./OrderStatusModal";
import { useSelector } from "react-redux";
import { userAuth } from "./Redux/user";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data] = useState([
    {
      _id: "62e10d9998c849dacd90e678",
      name: "lucents Gk",
      price: 120,
      information: "no 1 book",
      imgurl: "https://www.dropbox.com/s/yyailvyhnkxgsaa/lucentbook.jpg?dl=0",
      __v: 0,
    },

    {
      _id: "62e1129498c849dacd90e67c",
      name: "Eng & Mar Grammer Que Bank",
      title: "mpsc",
      price: 540,
      information: "great book",
      imgurl: "https://www.dropbox.com/s/u86cjh74dihs2jy/Mpsc.jpg?dl=0",
      __v: 0,
    },
    {
      _id: "62e112aa98c849dacd90e67e",
      name: "Paryavaran parishitiki",
      title: "mpsc",
      price: 340,
      information: "great book",
      imgurl: "https://www.dropbox.com/s/dp8pcublbidqfq4/Paryavaran.jpg?dl=0",
      __v: 0,
    },
    {
      _id: "62e112c698c849dacd90e680",
      name: "lucents GK",
      title: "mpsc",
      price: 120,
      information: "great book",
      imgurl: "https://www.dropbox.com/s/yyailvyhnkxgsaa/lucentbook.jpg?dl=0",
      __v: 0,
    },
    {
      _id: "62e112d598c849dacd90e682",
      name: "lucents Gk",
      price: 120,
      information: "no 1 book",
      imgurl: "https://www.dropbox.com/s/yyailvyhnkxgsaa/lucentbook.jpg?dl=0",
      __v: 0,
    },
  ]);

  const [category] = useState([
    { title: "mpsc" },
    { title: "upsc" },
    { title: "novels" },
    { title: "Stories" },
    { title: "others" },
  ]);

  const getMyUserId = JSON.parse(window.localStorage.getItem("userAuth"));
  console.log(getMyUserId);
  const userDetails = `https://bookapi-1.herokuapp.com/new/${getMyUserId}`;
  console.log(userDetails);

  useEffect(() => {
    const userFetchFun = async () => {
      const userInfo = await axios.get(userDetails);
      console.log(userInfo.data);
      dispatch(userAuth(userInfo.data));
    };
    userFetchFun();
  }, []);

  const user = useSelector((state) => state.users);
  console.log(user);
  console.log(JSON.parse(localStorage.getItem("userAuth")));

  return (
    <Box height="100%">
      <Header
        state={
          <ButtonBase onClick={() => setOpenDrawer(true)}>
            <Menu />
          </ButtonBase>
        }
        input={
          <Box display="flex">
            <InputBase
              placeholder="Search for books "
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              style={{ width: "100%", height: "40px" }}
            />
            <Box color="black" alignSelf="center">
              <ButtonBase
                onClick={() => navigate("/search", { state: inputValue })}
              >
                <Search />
              </ButtonBase>
            </Box>
          </Box>
        }
        icon={<Notifications />}
      />

      <Drawer anchor="left" open={openDrawer}>
        <Box width="250px">
          <Box style={{ backgroundColor: "orange" }}>
            <CardContent>
              <ListItem>
                <ListItemAvatar>
                  <AccountCircle style={{ color: "black" }} />
                </ListItemAvatar>
                <ListItemText>Welcome!</ListItemText>
                <ButtonBase onClick={() => setOpenDrawer(false)}>
                  <ArrowBack />
                </ButtonBase>
              </ListItem>
            </CardContent>
          </Box>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <CardContent>
              <ListItem>
                <ListItemAvatar>
                  <Login />
                </ListItemAvatar>
                <ListItemText>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    style={{
                      backgroundColor: "orange",
                      textTransform: "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    login
                  </Button>
                </ListItemText>
              </ListItem>
              <ButtonBase>
                <ListItem>
                  <ListItemAvatar>
                    <Settings />
                  </ListItemAvatar>
                  <ListItemText>Settings</ListItemText>
                </ListItem>
              </ButtonBase>
              <ButtonBase>
                <ListItem>
                  <ListItemAvatar>
                    <ShoppingBagOutlined />
                  </ListItemAvatar>
                  <ListItemText>Your Orders</ListItemText>
                </ListItem>
              </ButtonBase>
              <ButtonBase>
                <ListItem>
                  <ListItemAvatar>
                    <Favorite />
                  </ListItemAvatar>
                  <ListItemText>Your Wishlist</ListItemText>
                </ListItem>
              </ButtonBase>
              <ListItem>
                <ListItemAvatar>
                  <Logout />
                </ListItemAvatar>
                <ListItemText>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "orange",
                      textTransform: "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    logout
                  </Button>
                </ListItemText>
              </ListItem>
            </CardContent>
          </List>
        </Box>
      </Drawer>

      <div className="flow">
        <Box marginBottom="10px">
          <Card variant="outlined">
            <Container>
              <Box
                display="flex"
                overflow="scroll"
                marginBottom="10px"
                bgcolor="#fff"
              >
                {data.map((n) => {
                  return (
                    <Box padding={1} borderColor="gray" marginRight="10%">
                      <img
                        src={`${n.imgurl}&raw=1`}
                        width="50px"
                        height="50px"
                        alt="img"
                      />

                      <Typography>Mpsc</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Container>
          </Card>
        </Box>
      </div>

      <div className="border">
        <div className="flow">
          <BookFetchComponent />
        </div>

        <div className="flow">
          <BookFetchComponent />
        </div>

        <div className="flow">
          <BookFetchComponent />
        </div>
        <div className="flow">
          <BookFetchComponent />
        </div>
        <div className="flow">
          <BookFetchComponent />
        </div>
        <div className="flow">
          <BookFetchComponent />
        </div>
      </div>
      <Box m={10} />
      <div className="hide">
        <BottomNavigateComponent />
      </div>
      <Card variant="outlined">
        <Box height="200px">
          <CardContent>All rights rserved</CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default Home;
