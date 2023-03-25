import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { usePickups } from "./api_calls";
import ProductDialog from './ProductDialog';

const PickUps = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedPickups, setExpandedPickups] = useState([]);

  const { pickups } = usePickups();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  const handleExpandPickup = (pickup) => {
    console.log(expandedPickups);
    if (expandedPickups.includes(pickup)) {
      setExpandedPickups((prevExpandedPickups) => prevExpandedPickups.filter((p) => p !== pickup));
    } else {
      setExpandedPickups((prevExpandedPickups) => [...prevExpandedPickups, pickup]);
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

  const shouldShowAllImages = (pickup) => expandedPickups.includes(pickup);

  return (
    <Container>
      {pickups.map((pickup) => (
        <Card key={pickup.name}>
          <CardContent>
            <Link key={pickup.id} to={{ pathname: `/pickups/${pickup.id}` }} state={{ pickup }}>
              <Typography variant="h5" gutterBottom>
                {pickup.name}
              </Typography>
            </Link>
            <Typography variant="subtitle1" gutterBottom>
              {pickup.address}
            </Typography>
            <Grid container spacing={2}>
              {(shouldShowAllImages(pickup) ? pickup.products : getProductsToShow(pickup.products)).map((product) => (
                <Grid item key={product.id}>
                  <ProductImage src={product.image_url_list ? product.image_url_list[0] : null} alt={product.name} onClick={() => handleProductClick(product)} />
                </Grid>
              ))}
              {pickup.products.length > MAX_PRODUCTS && (
                <Grid item>
                  <IconButton onClick={() => handleExpandPickup(pickup)}>
                    {shouldShowAllImages(pickup) ? (
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
            {shouldShowAllImages(pickup) && (
              <Grid container spacing={2}>
                {getMoreProducts(pickup.products).map((product) => (
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
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-row-gap: 24px;
`;

const ProductImage = styled.img`
  cursor: pointer;
  height: 100px;
`;

export default PickUps;
