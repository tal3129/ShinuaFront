import React, { useState } from "react";
import { Box, Grid, AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import PickupProductCard from "./PickupProductCard";
import SearchBar from "./SearchBar";
import MoveAllToStorageButton from "./MoveAllToStorageButton"
import { useLocation } from 'react-router-dom';
import UndoIcon from "@mui/icons-material/Undo";
import { Link } from 'react-router-dom';

const Pickup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { state } = useLocation();
  const pickup  = state.pickup;
  const products = pickup.products;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [openMoveAllProductDialog, setOpenMoveAllProductDialog] = useState(false);

  const handleOpenMoveAllProductDialog = () => {
    setOpenMoveAllProductDialog(true);
  };

  return (
    <>
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link key={pickup.id} to={{pathname: `/pickups`}}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="go back"
        >
          <UndoIcon />
        </IconButton>
      </Link>
        <Typography variant="h6" sx={{ textAlign: 'right' }}>
          {pickup.name}
        </Typography>
      </Toolbar>
    </AppBar>
      <Box sx={{ flexGrow: 1, p: 2, m: "0 auto", maxWidth: 1200 }} dir="rtl">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={2} key={product.id}>
              <PickupProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <MoveAllToStorageButton onClick={handleOpenMoveAllProductDialog} />
      </Box>
    </>
  );
};

export default Pickup;
