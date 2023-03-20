import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import AddProductButton from "./AddProductButton";

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
      <Box sx={{ flexGrow: 1, p: 2, m: "0 auto", maxWidth: 1200 }} dir="rtl">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <AddProductButton />
      </Box>
    </>
  );
};

export default Catalog;
