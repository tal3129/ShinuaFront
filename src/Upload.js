import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { Fab } from "@mui/material";

const UploadButton = () => {
    const handleUploadEvent = () => {
      alert("Krupik has uploaded smth")
    };
  
    return (
        <div class="font-icon-wrapper" onClick={handleUploadEvent} style={{"position": "absolute", "left":"1em", "bottom":"1em"}}>
        <Fab aria-label="upload" color="primary">
            <AddIcon />
        </Fab>
        </div>
    );
  };
  
  export default UploadButton;
  