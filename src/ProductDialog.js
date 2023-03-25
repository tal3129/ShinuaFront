import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

const ProductDialog = ({ open, onClose, product }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{product?.name}</DialogTitle>
            <DialogContent>
                {product && (
                    <>
                        <img src={product.image_url_list ? product.image_url_list[0] : null} alt={product.name} style={{ maxWidth: '100%' }} />
                        <Typography variant="subtitle1" gutterBottom>
                            {product.description}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Amount: {product.amount}
                        </Typography>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ProductDialog;