import { Edit, Save } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, ListItem, Typography, Stack } from '@mui/material';
import { useState } from 'react';
import OrderDetails from './OrderDetails';
import OrderListItem from './OrderListItem';

function OrderPage({ order }) {
  const [name, setName] = useState(order.name);
  const [date, setDate] = useState(order.date);
  const [address, setAddress] = useState(order.address);
  const [newOrderedProducts, setNewOrderedProducts] = useState(order.ordered_products);
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

  const handleEdit = () => {
    
  };

  return (
    <>
      <Box>
        <Typography dir="rtl" variant="h4">
          {name}
        </Typography>
        <Button startIcon={<Save/>} onClick={handleSave} disabled={!orderChanged}>Save</Button>
        <Button startIcon={<Edit/>} onClick={handleEdit}>Edit</Button>
        <OrderDetails date={date} address={address} />
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
