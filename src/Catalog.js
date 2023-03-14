import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import ProductCard from "./ProductCard";
import UploadButton from "./Upload";

const Catalog = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <TextField
        label="Search Products"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <Grid dir="rtl" container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <UploadButton />
    </>
  );
};

export default Catalog;
