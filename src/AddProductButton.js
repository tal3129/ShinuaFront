import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddProductButton = (props) => {
  return (
    <Fab
      variant="extended"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      color="primary"
      aria-label="add product"
      {...props}
    >
      <AddIcon sx={{ ml: 1 }} />
      הוסף מוצר
    </Fab>
  );
};

export default AddProductButton;
