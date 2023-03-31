import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>שינוע חברתי</Link>
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/catalog">
            הקטלוג
          </Button>
          <Button color="inherit" component={Link} to="/pickups">
            איסופים
          </Button>
          <Button color="inherit" component={Link} to="/orders">
            הזמנות
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
