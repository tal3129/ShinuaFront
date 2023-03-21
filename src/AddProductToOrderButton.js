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

const orders = [
  {
    name: "חיילים רעבים",
    description: "דכה דבה",
    address: "מטורף",
    oid: 1,
    productCounts: [
      {
        pid: 1,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 2,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 2,
    productCounts: [
      {
        pid: 2,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 3,
    productCounts: [
      {
        pid: 3,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 4,
    productCounts: [
      {
        pid: 4,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 5,
    productCounts: [
      {
        pid: 5,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 6,
    productCounts: [
      {
        pid: 6,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 7,
    productCounts: [
      {
        pid: 7,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 8,
    productCounts: [
      {
        pid: 8,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 9,
    productCounts: [
      {
        pid: 9,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 10,
    productCounts: [
      {
        pid: 10,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 11,
    productCounts: [
      {
        pid: 11,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 12,
    productCounts: [
      {
        pid: 12,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
  {
    name: "חיילים שמחים",
    description: "חיילים עצובים",
    address: "צהל",
    oid: 13,
    productCounts: [
      {
        pid: 13,
        name: "wow",
        description: "amazing",
        imageUrlList: ["dacadebe.com"],
        amount: 5,
      },
    ],
  },
];

// Mock functions for API endpoints
function getAllOrders() {
  return orders;
}

const AddToOrderDialog = ({ open, onClose, product }) => {
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [productAmount, setProductAmount] = useState("");
  const [orders, setOrders] = useState([]);
  const [createOrderOpen, setCreateOrderOpen] = React.useState(false);
  const [orderData, setOrderData] = useState({
    name: "",
    description: "",
    recipient: "",
    address: "",
    contactName: "",
    contactNumber: "",
  });

  const [currentOrder, setCurrentOrder] = useState({});

  useEffect(() => {
    // Fetch orders data from API
    const ordersData = getAllOrders();
    setOrders(ordersData);
  }, []);

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
  };

  const handleSelectOrder = (order) => {
    setCurrentOrder(order);
    setAddProductOpen(true);
  };

  const handleProductAmountChange = (event) => {
    setProductAmount(event.target.value);
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
            product={product}
            orderData={orderData}
            setOrderData={setOrderData}
            dir="rtl"
          />
          <List>
            <ListItem>
              <Button onClick={handleCreateOrderOpen} fullWidth>
                + יצירת הזמנה
              </Button>
            </ListItem>
            <Divider light />
            {orders.map((order) => (
              <>
                <ListItem key={order.oid}>
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
