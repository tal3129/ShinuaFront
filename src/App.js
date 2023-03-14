import React from "react";
import Catalog from "./Catalog";

function App() {
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
    <div className="App">
      <Catalog products={products} />
    </div>
  );
}

export default App;
