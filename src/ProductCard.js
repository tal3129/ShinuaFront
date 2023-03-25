import React, { useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert, Edit, Add } from "@mui/icons-material";
import AddToOrderDialog from "./AddProductToOrderButton";
import EditProductDialog from "./EditProductDialog";
import { deleteProduct } from "./api_calls";
import { useMutation, useQueryClient } from "react-query";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const StyledCardContent = styled(CardContent)`
  flex: 1;
`;

const ProductCard = ({ product }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false); // <-- Add state for dialog open/closed

  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('catalog');
    },
  });

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuExport = () => {
    setAnchorEl(null);
    console.log("Exporting product", product);
  };

  const handleMenuDelete = () => {
    setAnchorEl(null);
    console.log(product);
    deleteProductMutation.mutate(product.did);
  }

  const handleAddOrderClick = (event) => {
    handleOpenAddToOrder();
  };

  const [openAddToOrder, setOpenAddToOrder] = useState(false);

  const handleOpenAddToOrder = () => {
    setOpenAddToOrder(true);
  };

  const handleClose = () => {
    setOpenAddToOrder(false);
  };

  const handleEditClick = () => {
    setAnchorEl(null);
    setEditDialogOpen(true); // <-- Open the edit dialog
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false); // <-- Close the edit dialog
  };

  return (
    <StyledCard>
      <AddToOrderDialog
        open={openAddToOrder}
        onClose={handleClose}
        product={product}
        dir="rtl"
      />
      <EditProductDialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        initialProduct={product}
      />
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={product.image_url_list ? product.image_url_list[0] : null}
          title={product.name}
        />
        <Chip
          label={`${product.amount} במלאי`}
          color="secondary"
          style={{ position: "absolute", top: "10px", left: "10px" }}
        />
      </CardActionArea>
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {product.origin}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
      </StyledCardContent>
      <div>
        <IconButton aria-label="add to favorites" onClick={handleAddOrderClick}>
          <Add />
        </IconButton>
        <IconButton aria-label="edit product" onClick={handleEditClick}>
          <Edit />
        </IconButton>
        <IconButton
          aria-label="more actions"
          aria-controls="product-card-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="product-card-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuExport}>Export</MenuItem>
          <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
        </Menu>
      </div>
    </StyledCard>
  );
};

export default ProductCard;
