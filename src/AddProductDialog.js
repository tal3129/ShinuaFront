// Component that adds product to the catalog with the fields: name, sender, description, quantity, image

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, DialogContentText } from "@mui/material";

const AddProductDialog = ({ open, onClose }) => {
    const [name, setName] = useState("");
    const [sender, setSender] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSenderChange = (event) => {
        setSender(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleImageChange = (event) => {
        setImage(event.target.value);
    };

    const handleAddClick = () => {
        console.log("Adding product", { name, sender, description, quantity, image });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} dir="rtl">
            <DialogTitle>הוספת מוצר</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    יש למלא את השדות הבאים כדי להוסיף מוצר חדש לקטלוג
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="שם המוצר"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={handleNameChange}
                />
                <TextField
                    margin="dense"
                    id="sender"
                    label="תורם"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={sender}
                    onChange={handleSenderChange}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="תיאור"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <TextField
                    margin="dense"
                    id="quantity"
                    label="כמות במלאי"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
                <TextField
                    margin="dense"
                    id="image"
                    label="כתובת תמונה"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={image}
                    onChange={handleImageChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>ביטול</Button>
                <Button onClick={handleAddClick}>הוספה</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductDialog;
