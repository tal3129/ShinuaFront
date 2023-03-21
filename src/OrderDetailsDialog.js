import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const OrderDetailsDialog = ({
  open,
  onClose,
  orderData,
  setOrderData,
  onSubmit,
  onCancel,
}) => {
  const [newOrderData, setNewOrderData] = useState(orderData);

  const handleNewOrderFieldChange = (event) => {
    const { name, value } = event.target;
    setNewOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateOrder = () => {
    // Save changes to the `orderData` passed to this component
    setOrderData(newOrderData);

    console.log(newOrderData);

    if (onSubmit) {
      onSubmit(newOrderData);
    }

    onClose();
  };

  const handleCancelOrder = () => {
    if (onCancel) {
      onCancel(orderData);
    }
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} dir="rtl">
        <DialogTitle>יצירת הזמנה</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="שם ההזמנה"
            type="text"
            id="name"
            name="name"
            value={newOrderData.name}
            onChange={handleNewOrderFieldChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="מקבל התרומה"
            value={newOrderData.recipient}
            id="recipient"
            name="recipient"
            onChange={handleNewOrderFieldChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="כתובת למשלוח"
            value={newOrderData.address}
            id="address"
            name="address"
            onChange={handleNewOrderFieldChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="איש קשר"
            value={newOrderData.contactName}
            id="contactName"
            name="contactName"
            onChange={handleNewOrderFieldChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="מספר טלפון"
            value={newOrderData.contactNumber}
            id="contactNumber"
            name="contactNumber"
            onChange={handleNewOrderFieldChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="תאריך"
            value={newOrderData.date}
            id="date"
            name="date"
            onChange={handleNewOrderFieldChange}
            fullWidth
            variant="standard"
          />
          <TextField
            label="פרטים נוספים"
            value={newOrderData.description}
            id="description"
            name="description"
            onChange={handleNewOrderFieldChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelOrder}>ביטול</Button>
          <Button onClick={handleCreateOrder}>שמור</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderDetailsDialog;
