import { Card, CardContent, Stack, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getOrders } from "./api_calls";
import ExpandableProductGallery from './ExpandableProductGallery';

const Orders = () => {
  const { data: orders, isFetching: isLoadingOrders } = useQuery({
    queryKey: 'orders',
    queryFn: getOrders,
    placeholderData: [],
  });

  return (
    <Stack spacing={2} sx={{ flexGrow: 1, p: 2, m: "0 auto", maxWidth: 1200 }} dir="rtl">
      <Tabs aria-label="order tabs" centered value={0}>
        <Tab label="הזמנות פתוחות" />
        <Tab label="הזמנות שהסתיימו"/>
      </Tabs>
      {orders.map((order) => (
        <Card key={order.name}>
          <CardContent>
            <StyledLink key={order.did} to={{ pathname: `/orders/${order.did}` }} state={{ order }}>
              <Typography variant="h5" gutterBottom>
                {order.name}
              </Typography>
            </StyledLink>
            <Typography variant="subtitle1" gutterBottom>
              {order.description}
            </Typography>
            <ExpandableProductGallery
              products={order.ordered_products}
            />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

const ProductImage = styled.img`
  cursor: pointer;
  height: 100px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export default Orders;
