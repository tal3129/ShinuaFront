import React, { useState } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import PickupProductCard from "./PickupProductCard";
import MoveAllToStorageButton from "./MoveAllToStorageButton"
import { useLocation } from 'react-router-dom';
import UndoIcon from "@mui/icons-material/Undo";
import { Link } from 'react-router-dom';

const Pickup = () => {
  const { state } = useLocation();
  const pickup = state.pickup;
  const products = pickup.products;

  const [openMoveAllProductDialog, setOpenMoveAllProductDialog] = useState(false);

  const handleOpenMoveAllProductDialog = () => {
    setOpenMoveAllProductDialog(true);
  };

  return (
    <>
      <Link key={pickup.id} to={{ pathname: `/pickups` }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="go back"
        >
          <UndoIcon />
        </IconButton>
      </Link>

      <Box sx={{ flexGrow: 1, p: 2, m: "0 auto", maxWidth: 1200 }} dir="rtl">
        <Typography variant="h6" sx={{ textAlign: 'right' }}>
          {pickup.name}
        </Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
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
