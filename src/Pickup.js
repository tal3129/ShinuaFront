import React, { useState } from "react";
import { Box, Grid, Typography, IconButton, Stack } from "@mui/material";
import PickupProductCard from "./PickupProductCard";
import MoveAllToStorageButton from "./MoveAllToStorageButton"
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowBack } from "@mui/icons-material";

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
      <Box sx={{ flexGrow: 1, p: 2, m: "0 auto", maxWidth: 1200 }} dir="rtl">
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography gutterBottom variant="h4">
            {pickup.name}
          </Typography>
          <Link key={pickup.id} to={{ pathname: `/pickups` }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="go back"
            >
              <ArrowBack />
            </IconButton>
          </Link>
        </Stack>

        <Grid container spacing={2} justifyContent="center">
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
