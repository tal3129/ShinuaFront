import { Box } from '@mui/material';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import OrderEditPanel from './OrderEditPanel';
import { getOrder } from './api_calls';
import { useCustomSnackbar } from './snackbar_utils';

function OrderPage() {
  // The order is passed from the Orders page or from the url ('/orders/:did')
  // If passed from the orders page, it is passed as a state object.

  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: orderId } = useParams();
  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();

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


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 196px)' }}>
      {order && <OrderEditPanel order={order} />}
    </Box >
  );
}


export default OrderPage;
