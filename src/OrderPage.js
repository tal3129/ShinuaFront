import { ArrowBack, Edit, Save } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardHeader, IconButton, List, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ExportToPDFButton from './ExportToPDFButton';
import OrderDetails from './OrderDetails';
import OrderDetailsDialog from './OrderDetailsDialog';
import OrderListItem from './OrderListItem';

function OrderPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state.order;

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
    updatedOrderedProducts[index].amount = parseInt(newAmount);
    setNewOrderedProducts(updatedOrderedProducts);
    setOrderChanged(true);
  };

  const handleSave = () => {
    const updatedOrder = {
      did: order.did,
      description: order.description,
      date: order.date,
      status: order.status,
      address: orderDetails.address,
      ordered_products: newOrderedProducts.map(({ did, name, description, image_url_list, status, amount, reserved, origin }) => ({ did, name, description, image_url_list, status, amount, reserved, origin })),
      name: orderDetails.name
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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 196px)' }}>
      <Card sx={{ minWidth: '400px', width: '60%' }}>
        <CardHeader
          title={<Typography variant="h4" sx={{ fontWeight: 'bold' }}>{orderDetails.name}</Typography>}
          sx={{ padding: '16px' }}
          action={
            <IconButton onClick={() => { navigate(-1) }}>
              <ArrowBack />
            </IconButton>
          }
        />
        <CardActions>
          <Stack sx={{ flexGrow: 1 }} direction='row' spacing={2}>
            <Button variant="outlined" startIcon={<Save sx={{ ml: 1 }} />} onClick={handleSave} disabled={!orderChanged}>שמור</Button>
            <Button variant="outlined" startIcon={<Edit sx={{ ml: 1 }} />} onClick={handleEdit}>ערוך</Button>
            <ExportToPDFButton order_id={order.did} />
          </Stack>
        </CardActions>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
          <OrderDetails order={orderDetails} />
          <Stack sx={{ width: '100%' }}>
            <List sx={{ backgroundColor: 'background.paper', overflow: 'auto', maxHeight: '360px' }}>
              {newOrderedProducts.map((product, index) => (
                <OrderListItem
                  key={index}
                  product={product}
                  amount={product.amount}
                  onAmountChange={handleAmountChange(index)}
                  onDeleteProduct={() => { }}
                />
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
    </Box >
  );
}


export default OrderPage;
