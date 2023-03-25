import { Edit, Save, ArrowBack } from '@mui/icons-material';
import { Box, Button, Card, CardHeader, IconButton, List, Stack, Typography } from '@mui/material';
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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 128px)'}}>
      <Card sx={{ minWidth: '400px', width: '50%'}}>
        <CardHeader
          title={<Typography variant="h4" sx={{ fontWeight: 'bold' }}>{orderDetails.name}</Typography>}
          action={
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <Button variant="outlined" startIcon={<Save sx={{ ml: 1 }} />} onClick={handleSave} disabled={!orderChanged}>שמור</Button>
              <Button variant="outlined" startIcon={<Edit sx={{ ml: 1 }} />} onClick={handleEdit}>ערוך</Button>
              <ExportToPDFButton order_id={order.oid} />
              <IconButton onClick={() => { }}>
                <ArrowBack />
              </IconButton>
            </Box>
          }
          sx={{ padding: '16px' }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px'}}>
          <OrderDetails order={orderDetails} />
          <Stack sx={{ width: '100%' }}>
            <List sx={{ backgroundColor: 'background.paper', overflow: 'auto', maxHeight: '350px' }}>
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
      </Card>
    </Box>
  );
}


export default OrderPage;
