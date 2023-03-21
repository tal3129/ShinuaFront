import { ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import { useState } from "react";
import ProductImageDisplay from "./ProductImageDisplay";

const OrderListItem = ({ product, amount, onAmountChange }) => {
  const [productImageDisplayOpen, setProductImageDisplayOpen] = useState(false);
  const handleAmountChange = (event) => {
    const newAmount = event.target.value;
    onAmountChange(newAmount);
  };

  const handleProductImageDiplayClose = () => {
    setProductImageDisplayOpen(false);
  };

  return <>
      <ListItem disableGutters>
      <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          sx={{ mr: 2 }}
      />
      <ListItemButton onClick={() => setProductImageDisplayOpen(true)}>
          <ListItemText
              primary={product.name}
              secondary={product.description}
              sx={{ textAlign: "right" }}
          />
      </ListItemButton>
      </ListItem>
      <ProductImageDisplay
        open={productImageDisplayOpen}
        onClose={handleProductImageDiplayClose}
        image_urls={product.image_url_list}
      />
    </>;
}

export default OrderListItem;
