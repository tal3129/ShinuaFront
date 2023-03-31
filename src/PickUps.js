import { Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Stack, Tab, Tabs, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { deletePickup, getPickups } from "./api_calls";
import ExpandableProductGallery from './ExpandableProductGallery';
import { convertDateToHebrewString } from './Utils';
import { useCustomSnackbar } from './snackbar_utils';

const Pickups = () => {
  const { data: pickups, isFetching: isLoadingPickups } = useQuery({
    queryKey: 'pickups',
    queryFn: getPickups,
    placeholderData: [],
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedPickup, setSelectedPickup] = React.useState(null);

  const handleMenuClick = (event, pickup) => {
    setSelectedPickup(pickup);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSelectedPickup(null);
    setAnchorEl(null);
  };

  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
  const queryClient = useQueryClient();
  const deletePickupMutation = useMutation(deletePickup, {
    onSuccess: () => {
      queryClient.invalidateQueries('pickups');
      showSuccessSnackbar('pickup-delete-success', 'האיסוף נמחק בהצלחה');
    },
    onError: () => {
      showErrorSnackbar('pickup-delete-failed', 'אירעה שגיאה במחיקת האיסוף');
    }
  });

  const handleDeletePickup = (pickup) => {
    deletePickupMutation.mutate(pickup.did);
    handleMenuClose();
  };

  return (
    <Stack spacing={2} sx={{ flexGrow: 1, p: 2, m: "0 auto", maxWidth: 1200 }} dir="rtl">
      {pickups && pickups.map((pickup) => (
        <Card key={pickup.name} variant='outlined'>
          <CardHeader
            title={<StyledLink key={pickup.did} to={{ pathname: `/pickups/${pickup.did}` }} state={{ pickup }}>
              <Typography variant="h5" gutterBottom>
                {pickup.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                {pickup.address}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {
                  convertDateToHebrewString(pickup.date)
                }
              </Typography>
            </StyledLink>}
            subheader={pickup.description}
            action={
              <IconButton
                aria-controls="pickup-menu"
                aria-haspopup="true"
                onClick={(e) => handleMenuClick(e, pickup)}
              >
                <MoreVertIcon />
              </IconButton>} />
          <CardContent>

            <ExpandableProductGallery
              products={pickup.products}
            />
            <Menu
              id="pickup-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedPickup === pickup}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleDeletePickup(pickup)}>
                <DeleteIcon sx={{ ml: 1 }} />
                מחק איסוף
              </MenuItem>
            </Menu>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default Pickups;
