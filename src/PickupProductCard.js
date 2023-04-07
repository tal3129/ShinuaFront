import React from "react";
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
import { MoreVert, Edit, Done, Delete } from "@mui/icons-material";
import { useMutation, useQueryClient } from "react-query";
import { deleteProduct, moveProductToInventory } from "./api_calls";
import { useCustomSnackbar } from "./snackbar_utils";
import EditProductDialog from "./EditProductDialog";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const StyledCardContent = styled(CardContent)`
  flex: 1;
`;

const PickupProductCard = ({ product }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const queryClient = useQueryClient();
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('catalog');
    },
  });

  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuDelete = () => {
    setAnchorEl(null);
    deleteProductMutation.mutate(product.did);
  }

  const [editDialogOpen, setEditDialogOpen] = React.useState(false); // <-- Add state for dialog open/closed

  const handleEditClick = () => {
    setAnchorEl(null);
    setEditDialogOpen(true); // <-- Open the edit dialog
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false); // <-- Close the edit dialog
  };

  const handleMoveToStorageClick = () => {
    moveToStorageMutation.mutate({ pid: product.did });
  };

  const moveToStorageMutation = useMutation(moveProductToInventory, {
    onSuccess: () => {
      showSuccessSnackbar("product-moved-to-storage-success", "המוצר הועבר למלאי");
      queryClient.invalidateQueries("pickups");
      queryClient.invalidateQueries("catalog");
    },
  });


  return (
    <StyledCard>
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
          label={`${product.amount} פריטים`}
          color="secondary"
          style={{ position: "absolute", top: "10px", left: "10px" }}
        />
      </CardActionArea>
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {product.sender}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
      </StyledCardContent>
      <div>
        <IconButton onClick={handleMoveToStorageClick} aria-label="move to storage">
          <Done />
        </IconButton>
        <IconButton onClick={handleEditClick} aria-label="edit product">
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
          id="pickup-product-card-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuDelete}>
            <Delete sx={{ ml: 1 }} />
            מחק מוצר
          </MenuItem>
        </Menu>
      </div>
    </StyledCard>
  );
};

export default PickupProductCard;
