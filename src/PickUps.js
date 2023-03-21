import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const PickUps = ({ pickups }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [expandedPickups, setExpandedPickups] = useState([]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  const handleExpandPickup = (pickup) => {
    if (expandedPickups.includes(pickup)) {
      setExpandedPickups((prevExpandedPickups) => prevExpandedPickups.filter((p) => p !== pickup));
    } else {
      setExpandedPickups((prevExpandedPickups) => [...prevExpandedPickups, pickup]);
    }
  };

  const MAX_COLUMNS = 4;
  const MAX_PRODUCTS = MAX_COLUMNS * 2;

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
            <Link key={pickup.id} to={{pathname: `/pickups/${pickup.id}`}} state={{pickup}}>
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
                  <ProductImage src={product.image} alt={product.name} onClick={() => handleProductClick(product)} />
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
                    <ProductImage src={product.image} alt={product.name} onClick={() => handleProductClick(product)} />
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

const ProductDialog = ({ open, onClose, product }) => {
  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle>{product?.name}</DialogTitle>
    <DialogContent>
    {product && (
      <React.Fragment>
        <img src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
        <Typography variant="subtitle1" gutterBottom>
          {product.description}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Amount: {product.amount}
        </Typography>
      </React.Fragment>
    )}
    </DialogContent>
  </Dialog>
  );
};

export default PickUps;
