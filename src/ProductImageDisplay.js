import { Button, Dialog, DialogActions, DialogContent, ImageList, ImageListItem } from "@mui/material";

const ProductImageDisplay = ({ open, onClose, image_urls }) => {
    return <>
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <ImageList>
                    {image_urls.map((url, index) => (
                        <ImageListItem key={index}>
                            <img src={url}/>
                        </ImageListItem>
                    ))}
                </ImageList>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Exit</Button>
            </DialogActions>
        </Dialog>
    </>;
};

export default ProductImageDisplay;
