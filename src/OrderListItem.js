import { ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";

const OrderListItem = ({ product, amount, onAmountChange }) => {
  const handleAmountChange = (event) => {
    const newAmount = event.target.value;
    onAmountChange(newAmount);
  };

  return (
    <ListItem disableGutters>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={handleAmountChange}
        sx={{ mr: 2 }}
      />
      <ListItemButton>
        <ListItemText primary={product.name} sx={{ textAlign: "right" }} />
      </ListItemButton>
    </ListItem>
  );
}

export default OrderListItem;
