import { Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Stack, Tab, Tabs, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { deleteOrder, getOrders } from "./api_calls";
import ExpandableProductGallery from './ExpandableProductGallery';

const Orders = () => {
  const { data: orders, isFetching: isLoadingOrders } = useQuery({
    queryKey: 'orders',
    queryFn: getOrders,
    placeholderData: [],
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const handleMenuClick = (event, order) => {
    setSelectedOrder(order);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSelectedOrder(null);
    setAnchorEl(null);
  };

  const queryClient = useQueryClient();
  const deleteOrderMutation = useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
    },
  });

  const handleDeleteOrder = (order) => {
    deleteOrderMutation.mutate(order.did);
    handleMenuClose();
  };

  return (
    <Stack spacing={2} sx={{ flexGrow: 1, p: 2, m: "0 auto", maxWidth: 1200 }} dir="rtl">
      <Tabs aria-label="order tabs" centered value={0}>
        <Tab label="הזמנות פתוחות" />
        <Tab label="הזמנות שהסתיימו" />
      </Tabs>
      {orders.map((order) => (
        <Card key={order.name} variant='outlined'>
          <CardHeader
            title={<StyledLink key={order.did} to={{ pathname: `/orders/${order.did}` }} state={{ order }}>
              <Typography variant="h5" gutterBottom>
                {order.name}
              </Typography>
            </StyledLink>}
            subheader={order.description}
            action={
              <IconButton
                aria-controls="order-menu"
                aria-haspopup="true"
                onClick={(e) => handleMenuClick(e, order)}
              >
                <MoreVertIcon />
              </IconButton>} />
          <CardContent>

            <ExpandableProductGallery
              products={order.ordered_products}
            />
            <Menu
              id="order-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedOrder === order}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { handleDeleteOrder(order) }}>
                <DeleteIcon sx={{ ml: 1 }} />
                מחק הזמנה
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

export default Orders;
