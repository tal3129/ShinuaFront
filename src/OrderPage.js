import { Edit, Save } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, ListItem, Typography, Stack } from '@mui/material';
import { useState } from 'react';
import OrderListItem from './OrderListItem';

function OrderPage({ order }) {
  const { ordered_products } = order;
  const [newOrderedProducts, setNewOrderedProducts] = useState(ordered_products);
  const [orderChanged, setOrderChanged] = useState(false);

  const handleAmountChange = (index) => (newAmount) => {
    const updatedOrderedProducts = [...newOrderedProducts];
    updatedOrderedProducts[index][1] = parseInt(newAmount);
    setNewOrderedProducts(updatedOrderedProducts);
    setOrderChanged(true);
  };

  const handleSave = () => {
    const updatedOrder = {
      ...order,
      ordered_products: newOrderedProducts.map(([product, amount]) => [product.pid, amount])
    };
    setOrderChanged(false);
    console.log("Saving order:");
    console.log(updatedOrder);
    // Save
  };

  return (
    <>
      <Box>
        <Typography dir="rtl" variant="h4">
          {order.name}
        </Typography>
        <Button startIcon={<Save/>} onClick={handleSave} disabled={!orderChanged}>Save</Button>
        <Stack>
          <List>
            {order.ordered_products.map(([product, amount], index) => (
              <OrderListItem key={index} product={product} amount={amount} onAmountChange={handleAmountChange(index)} />
            ))}
          </List>
        </Stack>
      </Box>
    </>
  );
}

export default OrderPage;
