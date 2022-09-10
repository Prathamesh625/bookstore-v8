import { Box, Button, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { useState } from "react";

function Cards(props) {
  const Img = styled("img")`
    &:hover {
      transform: scale(1.04);
      width: "100%";
    }
  `;
  return (
    <Box marginRight="5px" height="300px">
      <CardContent>
        <Box>
          <Box height="200px">
            <Img
              src={`${props.state.imgurl}&raw=1`}
              width="150px"
              height="200px"
            />
          </Box>
          <Typography textAlign="center">Samanya Gyan</Typography>
          <Typography textAlign="center">From 120₹</Typography>
          <Typography color="green" textAlign="center">
            40% off
          </Typography>
        </Box>
      </CardContent>
    </Box>
  );
}

export default Cards;
