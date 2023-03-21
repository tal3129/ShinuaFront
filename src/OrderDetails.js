import React from "react";
import { Box, Typography } from "@mui/material";

const OrderDetails = ({ order }) => {
  return (
    <Box dir="rtl">
      <Typography dir="rtl" variant="body1">כתובת: {order.address}</Typography>
      <Typography dir="rtl" variant="body1">תאריך: {order.date}</Typography>
    </Box>
  );
}

export default OrderDetails;
