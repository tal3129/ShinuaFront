// Component with dialog for yes/no given a callback for yes
// Path: src\AreYouSureDialog.js

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const AreYouSureDialog = ({ open, setOpen, onConfirm, title, label }) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} dir="rtl" fullWidth>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {label}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>ביטול</Button>
            <Button color='error' onClick={() => {
                onConfirm();
                handleClose();
            }}>כן</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AreYouSureDialog;

