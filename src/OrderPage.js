import { ArrowBack, Done, Edit, Save } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardHeader, IconButton, List, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { editOrder, getOrder, markOrderAsDone } from './api_calls';
import ExportToPDFButton from './ExportToPDFButton';
import OrderDetails from './OrderDetails';
import OrderDetailsDialog from './OrderDetailsDialog';
import OrderListItem from './OrderListItem';
import { useCustomSnackbar } from './snackbar_utils';

function OrderPage() {
  // The order is passed from the Orders page or from the url ('/orders/:did')
  // If passed from the orders page, it is passed as a state object.

  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: orderId } = useParams();

  const { data: order, isLoading: isOrderLoading } = useQuery(
    {
      queryKey: ['orders', orderId],
      queryFn: () => {
        return getOrder(orderId);
      },
      onError: () => {
        showErrorSnackbar('order-load-failed', 'אירעה שגיאה בטעינת ההזמנה');
        navigate('/orders');
      }
    },
    {
      enabled: state ? !state.order : true,
      placeholderData: state ? state.order : null,
      refetchOnWindowFocus: false,
      retry: false
    }
  );

  // Update orderDetails and newOrderedProducts when the order is loaded from the server.
  useEffect(() => {
    if (order) {
      setOrderDetails({
        name: order.name,
        date: order.date,
        address: order.address,
        date: order.date,
        description: order.description,
        status: order.status
      });
      setNewOrderedProducts(order.ordered_products);
    }
  }, [order]);

  const [orderDetails, setOrderDetails] = useState({
    ...order
  });
  const [newOrderedProducts, setNewOrderedProducts] = useState(order ? order.ordered_products : []);
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
  const buildOrderForSaving = ({ orderDetails, newOrderedProducts }) => {
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
      setOrderChanged(true);
      showErrorSnackbar("edit-order-error", "אירעה שגיאה בעת עדכון ההזמנה");
    }
  });


  const handleOrderDialogSave = (newOrderDetails) => {
    const updatedOrder = buildOrderForSaving({ orderDetails: newOrderDetails, newOrderedProducts });
    console.log(updatedOrder);
    setOrderChanged(false);
    editOrderMutation.mutate(updatedOrder);

  };

  const handleSave = () => {
    const updatedOrder = buildOrderForSaving({ orderDetails, newOrderedProducts });
    console.log(updatedOrder);
    setOrderChanged(false);
    editOrderMutation.mutate(updatedOrder);
  };

  const handleEdit = () => {
    setEditOpen(true);
  };

  const deleteProductFromOrder = (product) => {
    const updatedOrderedProducts = newOrderedProducts.filter((orderedProduct) => {
      return orderedProduct.product.did !== product.did;
    });
    setNewOrderedProducts(updatedOrderedProducts);
    setOrderChanged(true);
  };

  const markOrderAsDoneMutation = useMutation(markOrderAsDone, {
    onSuccess: () => {
      showSuccessSnackbar("mark-order-as-done-success", "ההזמנה הסתיימה בהצלחה");
      queryClient.invalidateQueries('orders');
    },
    onError: () => {
      showErrorSnackbar("mark-order-as-done-error", "אירעה שגיאה בעת סיום ההזמנה");
    }
  });

  const handleMarkAsDone = () => {
    markOrderAsDoneMutation.mutate(order.did);
    navigate(-1);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 196px)' }}>
      {order && <Card sx={{ minWidth: '400px', width: '60%' }}>
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
            <Button variant="contained" startIcon={<Done sx={{ ml: 1 }} />} onClick={handleMarkAsDone}>סיים הזמנה</Button>
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
                  onDeleteProduct={() => { deleteProductFromOrder(orderedProduct.product) }}
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
          onSubmit={handleOrderDialogSave}
        />
      </Card>
      }
    </Box >
  );
}


export default OrderPage;
