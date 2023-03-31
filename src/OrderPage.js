import { ArrowBack, Edit, Save } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardHeader, IconButton, List, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { editOrder } from './api_calls';
import ExportToPDFButton from './ExportToPDFButton';
import OrderDetails from './OrderDetails';
import OrderDetailsDialog from './OrderDetailsDialog';
import OrderListItem from './OrderListItem';
import { useCustomSnackbar } from './snackbar_utils';

function OrderPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state.order;

  const [orderDetails, setOrderDetails] = useState({
    name: order.name,
    date: order.date,
    address: order.address,
    description: order.description,
    status: order.status
  });
  const [newOrderedProducts, setNewOrderedProducts] = useState(order.ordered_products);
  const [orderChanged, setOrderChanged] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleAmountChange = (index) => (newAmount) => {
    const updatedOrderedProducts = [...newOrderedProducts];
    updatedOrderedProducts[index].amount = parseInt(newAmount);
    setNewOrderedProducts(updatedOrderedProducts);
    setOrderChanged(true);
  };

  /*
  This is the format of the order to be sent for saving to the server:
  {
    "did": "string",
    "name": "string",
    "address": "string",
    "description": "string",
    "date": "2023-03-31T14:33:46.099Z",
    "ordered_products": {
      "additionalProp1": 0,
      "additionalProp2": 0,
      "additionalProp3": 0
    },
    "status": 0
  }

  This function will build the updated order object from the new details and the new ordered products.
*/
  const buildOrderForSaving = () => {
    const productToAmountMap = {};
    newOrderedProducts.forEach((orderedProduct) => {
      productToAmountMap[orderedProduct.product.did] = orderedProduct.amount;
    });

    return {
      did: order.did,
      name: orderDetails.name,
      address: orderDetails.address,
      description: orderDetails.description,
      date: orderDetails.date,
      ordered_products: productToAmountMap,
      status: orderDetails.status
    };
  };

  const queryClient = useQueryClient();
  const editOrderMutation = useMutation(editOrder, {
      onSuccess: () => {
          showSuccessSnackbar("edit-order-success", "ההזמנה עודכנה בהצלחה");
          queryClient.invalidateQueries('orders');
      },
      onError: () => {
          showErrorSnackbar("edit-order-error", "אירעה שגיאה בעת עדכון ההזמנה");
      }
  });


  const handleSave = () => {
    const updatedOrder = buildOrderForSaving();
    setOrderChanged(false);
    editOrderMutation.mutate(updatedOrder);
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
              {newOrderedProducts.map((orderedProduct, index) => (
                <OrderListItem
                  key={index}
                  product={orderedProduct.product}
                  amount={orderedProduct.amount}
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
          onSubmit={handleSave}
        />
      </Card>
    </Box >
  );
}


export default OrderPage;
