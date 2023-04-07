import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Container, Box, Grid, Modal, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import AspectRatio from '@mui/joy/AspectRatio';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const GalleryModal = ({ images, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Carousel>
          {images.map((image, index) => (
            <AspectRatio minHeight={320} maxHeight={800}>
              <img
                key={index}
                src={image}
                alt={`image-${index}`}
                sx={{
                  objectFit: 'contain'
                }}
              />
            </AspectRatio>
          ))}
        </Carousel>
        <DialogActions>
          <Button onClick={handleClose}>סגור</Button>
        </DialogActions>
      </Paper>
    </Modal>
  );
};

export default GalleryModal;
