import { Box, Typography } from "@mui/material";
import React from "react";
import { convertDateToHebrewString } from "./Utils";

const OrderDetails = ({ order }) => {
  return (
    <Box dir="rtl">
      <Typography dir="rtl" variant="body1">כתובת: {order.address}</Typography>
      <Typography dir="rtl" variant="body1">תאריך: {convertDateToHebrewString(order.date)}</Typography>
    </Box>
  );
}

export default OrderDetails;
