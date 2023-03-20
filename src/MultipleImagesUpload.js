// Component for uploading multiple images to the server with small previews of the images and option to delete them
// The component is used in the AddProductDialog component

import React, { useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { Delete, Upload } from "@mui/icons-material";

const MultipleImagesUpload = () => {
    const [images, setImages] = useState([]);

    const handleDelete = (index) => {
        const newImages = images.filter((image, i) => i !== index);
        setImages(newImages);
    };

    const handleUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages((prevImages) => prevImages.concat(files));
    };

    return (
        <Box
            sx={{
                border: "1px dashed #ccc",
                borderRadius: 1,
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Box with vertical layout */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1,
                }}
            >

                <label htmlFor="contained-button-file">
                    <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={handleUpload}
                    />

                    <Button variant="outlined" component="span">
                        העלאת תמונות
                        <Upload />
                    </Button>
                </label>

                {images.length > 0 && (
                    <Typography variant="body1" component="div">
                        {images.length} תמונות נבחרו
                    </Typography>
                )}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        p: 1,
                    }}
                >
                    <Grid container spacing={1}>
                        {images.map((image, index) => (
                            <Grid item key={index}>
                                <Box
                                    sx={{
                                        border: "1px solid #ccc",
                                        borderRadius: 1,
                                        p: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={URL.createObjectURL(image)}
                                        alt={image.name}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            objectFit: "cover",
                                        }}
                                    />
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleDelete(index)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default MultipleImagesUpload;    