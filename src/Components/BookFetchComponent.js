import {
  Card,
  CardContent,
  Divider,
  Typography,
  Button,
  Box,
  Skeleton,
} from "@mui/material";

import axios from "axios";
import { useDispatch } from "react-redux/es/exports";

import { useEffect, useState } from "react";
import requests from "./request";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";
import { addBook } from "./Redux/details";
function BookFetchComponent() {
  const [data, setData] = useState([]);
  const [loading, setLaoding] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const booksFetching = async () => {
      const books = await axios.get(requests.mpsc);
      console.log(books.data);
      setData(books.data);
      setLaoding(true);
    };

    booksFetching();
  }, []);

  const fun = (value) => {
    navigate("/products");
    dispatch(addBook(value));
  };

  return (
    <Box>
      {loading === true ? (
        <Box marginBottom="10px" height="100%">
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" justifyContent="space-between">
                <Typography>Best Of Mpsc</Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate("/products")}
                >
                  View All
                </Button>
              </Box>
            </CardContent>
            <Divider />
            <Box
              display="flex"
              overflow="scroll"
              style={{ overflowY: "hidden" }}
            >
              {data.map((n) => {
                return (
                  <Box onClick={() => fun(n)} padding="2%">
                    <Cards state={n} />
                  </Box>
                );
              })}
            </Box>
          </Card>
        </Box>
      ) : (
        <Box marginBottom="10px" height="100%">
          <Skeleton variant="rectangular" width="100%" height="300px" />
        </Box>
      )}
    </Box>
  );
}

export default BookFetchComponent;
