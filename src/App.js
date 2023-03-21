import React from "react";
import Catalog from "./Catalog";
import PickUps from "./PickUps";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

function App() {
  const pickups = [
  {
    id: 1,
    name: "Pickup 1",
    address: "123 Main St, Anytown, USA",
    products: [
      {
        id: 1,
        name: "Product 1",
        description: "This is product 1",
        amount: "$10",
        image: "https://picsum.photos/200",
      },
      {
        id: 2,
        name: "Product 2",
        description: "This is product 2",
        amount: "$15",
        image: "https://picsum.photos/201",
      },
      {
        id: 3,
        name: "Product 3",
        description: "This is product 3",
        amount: "$20",
        image: "https://picsum.photos/202",
      },
      {
        id: 4,
        name: "Product 4",
        description: "This is product 4",
        amount: "$25",
        image: "https://picsum.photos/203",
      },
      {
        id: 5,
        name: "Product 5",
        description: "This is product 5",
        amount: "$30",
        image: "https://picsum.photos/204",
      },
      {
        id: 6,
        name: "Product 6",
        description: "This is product 6",
        amount: "$35",
        image: "https://picsum.photos/205",
      },
      {
        id: 7,
        name: "Product 7",
        description: "This is product 7",
        amount: "$40",
        image: "https://picsum.photos/206",
      },
      {
        id: 8,
        name: "Product 8",
        description: "This is product 8",
        amount: "$45",
        image: "https://picsum.photos/207",
      },
      {
        id: 9,
        name: "Product 9",
        description: "This is product 9",
        amount: "$45",
        image: "https://picsum.photos/208",
      },
    ],
  },
  {
    id: 2,
    name: "Pickup 2",
    address: "456 Oak St, Anytown, USA",
    products: [
      {
        id: 1,
        name: "Product 1",
        description: "This is product 1",
        amount: "$10",
        image: "https://picsum.photos/208",
      },
      {
        id: 2,
        name: "Product 2",
        description: "This is product 2",
        amount: "$15",
        image: "https://picsum.photos/209",
      }]}];

  const products = [
    {
      id: 1,
      name: "שמפו",
      sender: "L'Oreal",
      description: "שמפו לאיתמר לצרכי השיער המיוחדים שלך",
      quantity: 10,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "משחת שיניים",
      sender: "קולגייט",
      description: "Fluoride toothpaste for cavity protection",
      quantity: 20,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Soap",
      sender: "Dove",
      description: "Gentle cleansing bar for sensitive skin",
      quantity: 15,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Krupik",
      sender: "Dove",
      description: "skin",
      quantity: 15,
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
          { <Route path="/pickups" element={<PickUps pickups={pickups}/>} /> }
          {/* <Route path="/orders" element={<Orders />} /> */}
        </Routes>
      </Box>
    </Box>
  </BrowserRouter>
  );
}

export default App;
