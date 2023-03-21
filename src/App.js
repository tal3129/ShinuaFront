import React from "react";
import Catalog from "./Catalog";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

function App() {
  const products = [
    {
      id: 1,
      name: "שמפו",
      sender: "L'Oreal",
      description: "שמפו לאיתמר לצרכי השיער המיוחדים שלך",
      quantity: 10,
      status: "במחסן",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "משחת שיניים",
      sender: "קולגייט",
      description: "Fluoride toothpaste for cavity protection",
      quantity: 20,
      status: "במחסן",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Soap",
      sender: "Dove",
      description: "Gentle cleansing bar for sensitive skin",
      quantity: 15,
      status: "במחסן",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Krupik",
      sender: "Dove",
      description: "skin",
      quantity: 15,
      status: "במחסן",
      image: "https://via.placeholder.com/150",
    },
  ];

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
