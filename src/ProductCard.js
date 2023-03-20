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
import { MoreVert, Edit, Add } from "@mui/icons-material";

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const StyledCardContent = styled(CardContent)`
  flex: 1;
`;

const ProductCard = ({ product }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={product.image}
          title={product.name}
        />
        <Chip
          label={`${product.quantity} במלאי`}
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
        <IconButton aria-label="add to favorites">
          <Add />
        </IconButton>
        <IconButton aria-label="edit product">
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
          <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
          
        </Menu>
      </div>
    </StyledCard>
  );
};

export default ProductCard;
