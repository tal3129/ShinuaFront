import React from "react";
import Catalog from "./Catalog";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import { useCatalog } from "./api_hooks";

function App() {
  const products = useCatalog();

  return (
    <BrowserRouter>
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Box sx={{ p: 2 }}>
        <Routes>
          <Route path="/" element={<Catalog products={products}/>} />
          <Route path="/catalog" element={<Catalog products={products}/>} />
          {/* <Route path="/collections" element={<Collections />} /> */}
          {/* <Route path="/orders" element={<Orders />} /> */}
        </Routes>
      </Box>
    </Box>
  </BrowserRouter>
  );
}

export default App;
