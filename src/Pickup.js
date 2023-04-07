import React, { useState } from "react";
import { Box, Grid, Typography, IconButton, Stack, List, ListItem } from "@mui/material";
import PickupProductCard from "./PickupProductCard";
import MoveAllToStorageButton from "./MoveAllToStorageButton"
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ArrowBack } from "@mui/icons-material";
import { getPickup, movePickupToInventory } from "./api_calls";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCustomSnackbar } from "./snackbar_utils";
import AreYouSureDialog from "./AreYouSureDialog";

const Pickup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { state } = useLocation();
  const { id: pickupId } = useParams();
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();

  const [openMoveAllProductDialog, setOpenMoveAllProductDialog] = useState(false);

  const { data: pickup, isLoading: isPickupLoading } = useQuery(
    {
      queryKey: ['pickups', pickupId],
      queryFn: () => {
        return getPickup(pickupId);
      },
      onError: () => {
        showErrorSnackbar('pickup-load-failed', 'אירעה שגיאה בטעינת האיסוף');
        navigate('/pickups');
      }
    },
    {
      enabled: state ? !state.pickup : true,
      placeholderData: state ? state.pickup : null,
      refetchOnWindowFocus: false,
      retry: false
    }
  );

  const products = pickup ? pickup.products : null;

  const moveAllToStorageMutation = useMutation(movePickupToInventory, {
    onSuccess: () => {
      queryClient.removeQueries(["pickups", pickup.did]);
      showSuccessSnackbar("pickup-moved-to-storage-success", `האיסוף הועבר למחסן בהצלחה`);
      queryClient.invalidateQueries("pickups");
      queryClient.invalidateQueries("catalog");
      navigate('/pickups');
    },
  });

  const handleMoveAllToStorageClick = () => {
    moveAllToStorageMutation.mutate(pickup.did);
  };

  const handleOpenMoveAllProductDialog = () => {
    setOpenMoveAllProductDialog(true);
  };

  return (
    <>
      {pickup && <Box sx={{ flexGrow: 1, p: 2, m: "0 auto", maxWidth: 1200 }} dir="rtl">
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography gutterBottom variant="h4">
            {pickup.name}
          </Typography>
          <Link key={pickup.did} to={{ pathname: `/pickups` }}>
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
            <Grid item xs={12} sm={6} md={3} key={product.did}>
              <PickupProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <MoveAllToStorageButton onClick={handleOpenMoveAllProductDialog} />
        <AreYouSureDialog
          open={openMoveAllProductDialog}
          setOpen={setOpenMoveAllProductDialog}
          title={`להעביר ${products.length} פריטים למחסן ולמחוק איסוף?`} label={<List dense>
            {products.map((product) => (
              <ListItem key={product.did}>- {product.name}</ListItem>
            ))}
          </List>}
          onConfirm={handleMoveAllToStorageClick}
        />
      </Box>
      }
    </>
  );
};

export default Pickup;
