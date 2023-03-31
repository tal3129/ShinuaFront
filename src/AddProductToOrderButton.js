import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import OrderDetailsDialog from "./OrderDetailsDialog";
import { CircularProgress, Divider, Stack } from "@mui/material";
import { addProductToOrder, createOrder, getOrders } from "./api_calls";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCustomSnackbar } from "./snackbar_utils";

const AddToOrderDialog = ({ open, onClose, product }) => {
  const queryClient = useQueryClient();

  const [addProductOpen, setAddProductOpen] = useState(false);
  const [productAmount, setProductAmount] = useState("");
  const [createOrderOpen, setCreateOrderOpen] = React.useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    description: "",
    date: new Date().toISOString(),
    recipient: "",
    address: "",
    contactName: "",
    contactNumber: "",
    status: 0
  });

  const { showSuccessSnackbar, showErrorSnackbar } = useCustomSnackbar();
  const { data: orders, isFetching: isLoadingOrders } = useQuery({
    queryKey: 'orders',
    queryFn: getOrders,
    placeholderData: [],
  });

  const addProductToOrderMutation = useMutation(addProductToOrder, {
    onSuccess: () => {
      showSuccessSnackbar("add-product-success", "המוצר נוסף להזמנה בהצלחה");
      queryClient.invalidateQueries('orders');
      queryClient.invalidateQueries('catalog');
    },
    onError: () => {
      showErrorSnackbar("add-product-error", "אירעה שגיאה בעת הוספת המוצר להזמנה");
    }
  });

  const createOrderMutation = useMutation(createOrder, {
    onSuccess: () => {
      showSuccessSnackbar("create-order-success", "ההזמנה נוצרה בהצלחה");
      queryClient.invalidateQueries('orders');
    },
    onError: () => {
      showErrorSnackbar("create-order-error", "אירעה שגיאה בעת יצירת ההזמנה");
    }
  });

  const [currentOrder, setCurrentOrder] = useState({});

  const handleCreateOrderOpen = () => {
    setCreateOrderOpen(true);
  };

  const handleAddProductClose = () => {
    setAddProductOpen(false);
  };

  const handleAddProductToOrder = () => {
    if (productAmount > 0) {
      addProductToOrderMutation.mutate({
        oid: currentOrder.did,
        pid: product.did,
        amount: productAmount
      });
    }
    handleAddProductClose();
  };

  const handleSelectOrder = (order) => {
    onClose()
    setCurrentOrder(order);
    setAddProductOpen(true);
  };

  const handleProductAmountChange = (event) => {
    setProductAmount(event.target.value);
  };

  const handleAddOrder = (order) => {
    createOrderMutation.mutate(order);
  };


  return (
    <>
      {/* === choose order ===*/}
      <Dialog
        open={open}
        onClose={onClose}
        dir="rtl"
        PaperProps={{ sx: { height: "50%" } }}
      >
        <DialogTitle>בחר הזמנה</DialogTitle>
        <DialogContent>
          <OrderDetailsDialog
            open={createOrderOpen}
            onClose={() => {
              setCreateOrderOpen(false);
            }}
            onSubmit={handleAddOrder}
            product={product}
            orderData={orderData}
            setOrderData={setOrderData}
            dir="rtl"
          />
          <List>
            <ListItem key="CreateOrder">
              <Button onClick={handleCreateOrderOpen} fullWidth>
                + יצירת הזמנה
              </Button>
            </ListItem>
            <Divider light />
            <Stack alignItems="center">
              {isLoadingOrders && <CircularProgress />}
            </Stack>
            {orders && orders.map((order) => (
              <>
                <ListItem key={order.did}>
                  <ListItemButton onClick={() => handleSelectOrder(order)}>
                    <ListItemText
                      primary={order.name}
                      secondary={order.description}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider light />
              </>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>ביטול</Button>
        </DialogActions>
      </Dialog>
      {/* === add product to order === */}
      <Dialog open={addProductOpen} onClose={handleAddProductClose} dir="rtl">
        <DialogTitle>
          הוספת המוצר "{product.name}" להזמנה "{currentOrder.name}"
        </DialogTitle>
        <DialogContent dir="rtl">
          <TextField
            label="כמות"
            value={productAmount}
            onChange={handleProductAmountChange}
            fullWidth
            variant="standard"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddProductClose}>ביטול</Button>
          <Button onClick={handleAddProductToOrder}>הוסף להזמנה</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddToOrderDialog;
