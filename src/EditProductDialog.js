// Component that adds product to the catalog with the fields: name, origin, description, amount, image

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, DialogContentText, Select, MenuItem, InputLabel } from "@mui/material";
import MultipleImagesUpload from "./MultipleImagesUpload";
import { editProduct } from "./api_hooks";

const EditProductDialog = ({ open, onClose, initialProduct }) => {
    const [values, setValues] = useState(initialProduct);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleImageChange = (value) => {
        setValues((prevValues) => ({ ...prevValues, image: value }));
    };

    const handleEditClick = () => {
        console.log("Editing product", values);
        editProduct(values);
        onCloseWrapper();
    };

    const onCloseWrapper = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} dir="rtl">
            <DialogTitle>עריכת מוצר</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    יש למלא את השדות הבאים כדי לערוך מוצר בקטלוג
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="name"
                    label="שם המוצר"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.name}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="origin"
                    name="origin"
                    label="תורם"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.origin}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label="תיאור"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="amount"
                    name="amount"
                    label="כמות במלאי"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={values.amount}
                    onChange={handleChange}
                />
                <InputLabel id="status-label">סטטוס</InputLabel>
                <Select
                    margin="dense"
                    id="status"
                    name="status"
                    label="סטטוס"
                    fullWidth
                    variant="standard"
                    value={values.status}
                    onChange={handleChange}
                >
                    <MenuItem value={1}>במחסן</MenuItem>
                    <MenuItem value={0}>בשטח</MenuItem>
                </Select>
                <MultipleImagesUpload onImageChange={handleImageChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseWrapper}>ביטול</Button>
                <Button onClick={handleEditClick}>שמור</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProductDialog;
