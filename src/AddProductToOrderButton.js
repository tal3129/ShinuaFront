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
import { Divider } from "@mui/material";
import { addOrder, addProductToOrder, getOrders } from "./api_calls";
import { useQuery } from "react-query";

const AddToOrderDialog = ({ open, onClose, product }) => {
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [productAmount, setProductAmount] = useState("");
  const [createOrderOpen, setCreateOrderOpen] = React.useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    description: "",
    recipient: "",
    address: "",
    contactName: "",
    contactNumber: "",
    status: 0
  });
  const { data: orders } = useQuery({
    queryKey: 'orders',
    queryFn: getOrders,
    placeholderData: [],
  });

  const [currentOrder, setCurrentOrder] = useState({});

  const handleCreateOrderOpen = () => {
    setCreateOrderOpen(true);
  };

  const handleAddProductClose = () => {
    setAddProductOpen(false);
  };

  const handleAddProductToOrder = () => {
    // TODO ACTUALLY ADD PRODUCT TO ORDER
    console.log(product);
    console.log(productAmount);
    console.log(currentOrder);
    if (productAmount > 0) {
      addProductToOrder(currentOrder.did, product.did, productAmount);
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
    addOrder(order);
  };
  // useEffect(() => {
  //   // Fetch the orders when the "add to order" dialog is opened
  //   if (open) {
  //     fetchOrders();
  //   }
  // }, [open, orderData]);

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
