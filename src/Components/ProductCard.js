import {
  BadgeOutlined,
  BadgeRounded,
  RateReview,
  Star,
} from "@mui/icons-material";
import {
  Badge,
  BadgeMark,
  Card,
  CardContent,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import "./Header.css";
import { addBook } from "./Redux/details";
function ProductCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fun = () => {
    navigate("/details");
    window.localStorage.setItem("book", JSON.stringify(props.product));
    const books = JSON.parse(window.localStorage.getItem("book"));
    console.log(books);
    dispatch(addBook(books));
  };
  const getstate = useSelector((state) => state.book);
  console.log(getstate);
  const PaperStyle = styled(Box)`
    &:hover {
      transform: scale(1.1);
      width: "100%";
    }
  `;

  return (
    <Box onClick={fun}>
      <PaperStyle variant="outlined">
        <CardContent>
          <Box height="300px">
            <Box textAlign="center" height="200px">
              <img
                src={`${props.product.imgurl}&raw=1`}
                width="150px"
                height="200px"
              />
            </Box>
            <Typography>{props.product.name}</Typography>

            <Typography fontWeight="bold">₹{props.product.price}</Typography>

            <Rating />
          </Box>
        </CardContent>
      </PaperStyle>
    </Box>
  );
}

export default ProductCard;
