import { useState, useEffect } from "react";
import axios from "axios";

const API_HOST = "127.0.0.1";
const API_PORT = "8000";

export function useCatalog() {
  const [products, setProducts] = useState([]);

  function fetchCatalog() {
      axios
        .get(`http://${API_HOST}:${API_PORT}/get_catalog`)
        .then((response) => {
          setProducts(response.data.Products);
        })
        .catch((error) => {
          console.error(error);
        });
  }

  // Fetch once when the page loads
  useEffect(() => {
    fetchCatalog()
  }, []);

  return {
    products,
    fetchCatalog,
  };
}

export function useOrders() {
  const [orders, setOrders] = useState([]);

  function fetchOrders() {
      axios
        .get(`http://${API_HOST}:${API_PORT}/get_orders`)
        .then((response) => {
          setOrders(response.data.Orders);
        })
        .catch((error) => {
          console.error(error);
        });
  }

  // Fetch once when the page loads
  useEffect(() => {
    fetchOrders()
  }, []);

  return {
    orders,
    fetchOrders,
  };
}

// Function to edit product using API
export function editProduct(product) {
  axios.post(`http://${API_HOST}:${API_PORT}/edit_product`, product)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
}
