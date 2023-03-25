import React, { useState } from "react";
import { Box, CircularProgress, Grid, Stack } from "@mui/material";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import AddProductButton from "./AddProductButton";
import AddProductDialog from "./AddProductDialog";
import { useQuery } from "react-query";
import { getCatalog } from "./api_calls";
import { useCustomSnackbar } from "./snackbar_utils";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { showErrorSnackbar } = useCustomSnackbar();
  const { data: products, isFetching } = useQuery({
    queryKey: 'catalog',
    queryFn: getCatalog,
    placeholderData: [],
    onError: (error) => {
      showErrorSnackbar("catalog-error", "אירעה שגיאה בעת טעינת הקטלוג");
    }
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);

  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleClose = () => {
    setOpenAddProductDialog(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 2, m: "0 auto", maxWidth: 1200 }} dir="rtl">
        <AddProductDialog
          open={openAddProductDialog}
          onClose={handleClose}
          dir="rtl"
        />
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <Stack alignItems="center">
          {isFetching && <CircularProgress />}
        </Stack>
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.did}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        <AddProductButton onClick={handleOpenAddProductDialog} />
      </Box>
    </>
  );
};

export default Catalog;
