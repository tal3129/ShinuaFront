import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Card, CardContent, Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getOrders } from "./api_calls";
import ProductDialog from './ProductDialog';

const Orders = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState([]);

  const { data: orders, isFetching: isLoadingOrders } = useQuery({
    queryKey: 'orders',
    queryFn: getOrders,
    placeholderData: [],
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  const handleExpandOrder = (order) => {
    console.log(expandedOrders);
    if (expandedOrders.includes(order)) {
      setExpandedOrders((prevExpandedOrders) => prevExpandedOrders.filter((o) => o !== order));
    } else {
      setExpandedOrders((prevExpandedOrders) => [...prevExpandedOrders, order]);
    }
  };

  const MAX_PRODUCTS = 8;

  const getProductsToShow = (products) => {
    if (products.length <= MAX_PRODUCTS) {
      return products;
    } else {
      return products.slice(0, MAX_PRODUCTS);
    }
  };

  const getMoreProducts = (products) => {
    if (products.length <= MAX_PRODUCTS) {
      return [];
    } else {
      return products.slice(MAX_PRODUCTS);
    }
  };

  const shouldShowAllImages = (order) => expandedOrders.includes(order);

  return (
    <Stack spacing={2} sx={{ flexGrow: 1, p: 2, m: "0 auto", maxWidth: 1200 }} dir="rtl">
      {orders.map((order) => (
        <Card key={order.name}>
          <CardContent>
            <Link key={order.did} to={{ pathname: `/orders/${order.did}` }} state={{ order }}>
              <Typography variant="h5" gutterBottom>
                {order.name}
              </Typography>
            </Link>
            <Typography variant="subtitle1" gutterBottom>
              {order.description}
            </Typography>
            <Grid container spacing={2}>
              {(shouldShowAllImages(order) ? order.ordered_products : getProductsToShow(order.ordered_products)).map((product) => (
                <Grid item key={product.did}>
                  <ProductImage src={product.image_url_list ? product.image_url_list[0] : null} alt={product.name} onClick={() => handleProductClick(product)} />
                </Grid>
              ))}
              {order.ordered_products.length > MAX_PRODUCTS && (
                <Grid item>
                  <IconButton onClick={() => handleExpandOrder(order)}>
                    {shouldShowAllImages(order) ? (
                      <React.Fragment>
                        <Typography>Show less</Typography>
                        <ExpandLessIcon />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Typography>Show more</Typography>
                        <ExpandMoreIcon />
                      </React.Fragment>
                    )}
                  </IconButton>
                </Grid>
              )}
            </Grid>
            {shouldShowAllImages(order) && (
              <Grid container spacing={2}>
                {getMoreProducts(order.ordered_products).map((product) => (
                  <Grid item key={product.id}>
                    <ProductImage src={product.image_url_list ? product.image_url_list[0] : null} alt={product.name} onClick={() => handleProductClick(product)} />
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      ))}
      <ProductDialog open={selectedProduct !== null} onClose={handleCloseDialog} product={selectedProduct} />
    </Stack>
  );
};

const ProductImage = styled.img`
  cursor: pointer;
  height: 100px;
`;

export default Orders;
