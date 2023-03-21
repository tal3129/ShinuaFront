// Component that adds product to the catalog with the fields: name, sender, description, quantity, image

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, DialogContentText, Select, MenuItem, InputLabel } from "@mui/material";
import MultipleImagesUpload from "./MultipleImagesUpload";

const createEmptyProduct = () => {
    return {
        name: "",
        sender: "",
        description: "",
        quantity: "",
        status: "במחסן",
        image: ""
    }
};

const AddProductDialog = ({ open, onClose }) => {
    const [values, setValues] = useState(createEmptyProduct());

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleImageChange = (value) => {
        setValues((prevValues) => ({ ...prevValues, image: value }));
    };

    const handleAddClick = () => {
        console.log("Adding product", values);
        onCloseWrapper();
    };

    const onCloseWrapper = () => {
        onClose();
        setValues(createEmptyProduct());
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
                    id="sender"
                    name="sender"
                    label="תורם"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={values.sender}
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
                    id="quantity"
                    name="quantity"
                    label="כמות במלאי"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={values.quantity}
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
                    <MenuItem value={"במחסן"}>במחסן</MenuItem>
                    <MenuItem value={"בשטח"}>בשטח</MenuItem>
                </Select>
                <MultipleImagesUpload onImageChange={handleImageChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCloseWrapper}>ביטול</Button>
                <Button onClick={handleAddClick}>הוספה</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductDialog;
