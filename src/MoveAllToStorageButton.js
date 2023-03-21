import React from "react";
import { Fab } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

const MoveAllToStorageButton = (props) => {
  return (
    <Fab
      variant="extended"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      color="primary"
      aria-label="add product"
      {...props}
    >
      <DoneIcon sx={{ ml: 1 }} />
        הוסף הכל
    </Fab>
  );
};

export default MoveAllToStorageButton;
