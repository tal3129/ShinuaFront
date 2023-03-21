import React from "react";
import { Box, Typography } from "@mui/material";

const OrderDetails = ({ address, date }) => {
  return (
    <Box dir="rtl">
      <Typography dir="rtl" variant="body1">כתובת: {address}</Typography>
      <Typography dir="rtl" variant="body1">תאריך: {date}</Typography>
    </Box>
  );
}

export default OrderDetails;
