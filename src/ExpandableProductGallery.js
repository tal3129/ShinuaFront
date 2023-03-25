import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import ProductDialog from './ProductDialog';

const MAX_PRODUCTS = 8;

const ExpandableProductGallery = ({ products }) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseDialog = () => {
        setSelectedProduct(null);
    };

    const getProductsToShow = () => {
        if (products.length <= MAX_PRODUCTS) {
            return products;
        } else {
            return expanded ? products : products.slice(0, MAX_PRODUCTS);
        }
    };

    const getMoreProducts = () => {
        if (products.length <= MAX_PRODUCTS) {
            return [];
        } else {
            return products.slice(MAX_PRODUCTS);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {getProductsToShow().map((product) => (
                    <Grid item key={product.did}>
                        <ProductImage
                            src={product.image_url_list ? product.image_url_list[0] : null}
                            alt={product.name}
                            onClick={() => { handleProductClick(product) }}
                        />
                    </Grid>
                ))}
                {products.length > MAX_PRODUCTS && (
                    <Grid item>
                        <IconButton onClick={handleExpandClick}>
                            {expanded ? (
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
            {expanded && (
                <Grid container spacing={2}>
                    {getMoreProducts().map((product) => (
                        <Grid item key={product.did}>
                            <ProductImage
                                src={product.image_url_list ? product.image_url_list[0] : null}
                                alt={product.name}
                                onClick={() => { handleProductClick(product) }}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
            <ProductDialog open={selectedProduct !== null} onClose={handleCloseDialog} product={selectedProduct} />

        </React.Fragment>
    );
};

const ProductImage = styled.img`
  cursor: pointer;
  height: 100px;
`;

export default ExpandableProductGallery;
