import { Edit, Save } from '@mui/icons-material';
import { List, ListItemButton, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, ListItem, Typography, Stack } from '@mui/material';
import { useState } from 'react';
import ExportToPDFButton from './ExportToPDFButton';
import OrderDetails from './OrderDetails';
import OrderDetailsDialog from './OrderDetailsDialog';
import OrderListItem from './OrderListItem';

function OrderPage({ order }) {
  const [orderDetails, setOrderDetails] = useState({
    name: order.name,
    date: order.date,
    address: order.address
  });
  const [newOrderedProducts, setNewOrderedProducts] = useState(order.ordered_products);
  const [orderChanged, setOrderChanged] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleAmountChange = (index) => (newAmount) => {
    const updatedOrderedProducts = [...newOrderedProducts];
    updatedOrderedProducts[index][1] = parseInt(newAmount);
    setNewOrderedProducts(updatedOrderedProducts);
    setOrderChanged(true);
  };

  const handleSave = () => {
    const updatedOrder = {
      ...orderDetails,
      ordered_products: newOrderedProducts.map(([product, amount]) => [product.pid, amount])
    };
    setOrderChanged(false);
    console.log("Saving order:");
    console.log(updatedOrder);
    // Save
  };

  const handleEdit = () => {
    setEditOpen(true);
  };

  return (
    <>
      <Box>
        <Typography dir="rtl" variant="h4">
          {orderDetails.name}
        </Typography>
        <Button startIcon={<Save/>} onClick={handleSave} disabled={!orderChanged}>Save</Button>
        <Button startIcon={<Edit/>} onClick={handleEdit}>Edit</Button>
        <ExportToPDFButton order_id={order.oid}/>
        <OrderDetails order={orderDetails} />
        <Stack>
          <List>
            {order.ordered_products.map(([product, amount], index) => (
              <OrderListItem key={index} product={product} amount={amount} onAmountChange={handleAmountChange(index)} />
            ))}
          </List>
        </Stack>
      </Box>
      <OrderDetailsDialog
        open={editOpen}
        onClose={handleEditClose}
        orderData={orderDetails}
        setOrderData={setOrderDetails}
        onSubmit={() => setOrderChanged(true)}
      />
    </>
  );
}

export default OrderPage;
