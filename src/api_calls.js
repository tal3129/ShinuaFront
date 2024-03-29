import { useState, useEffect } from "react";
import axios from "axios";

const API_HOST = "127.0.0.1";
const API_PORT = "8000";

export function getCatalog() {
  return axios
    .get(`http://${API_HOST}:${API_PORT}/get_catalog`)
    .then((response) => (response.data.Products));
}

export function getOrders() {
  return axios
    .get(`http://${API_HOST}:${API_PORT}/get_orders`)
    .then((response) => (response.data));
}

export function createOrder(order) {
  return axios
    .post(`http://${API_HOST}:${API_PORT}/add_order`, {
      did: "", // We don't know the id yet
      name: order.name,
      address: order.address,
      description: order.description,
      date: new Date().toISOString(),
      status: order.status,
      ordered_products: {
        // No products yet :(
      },
    });
}

export function addProductToOrder({oid, pid, amount}) {
  return axios
    .post(`http://${API_HOST}:${API_PORT}/add_product_to_order`, {
      pid: pid,
      oid: oid,
      amount: amount,
    });
}

// Function to edit product using API
export function editProduct(product) {
  return axios.post(`http://${API_HOST}:${API_PORT}/edit_product`, product);
}

export function deleteProduct(pid) {
  return axios.post(`http://${API_HOST}:${API_PORT}/delete_product`, {
    pid: pid,
  });
}

export function usePickups() {
  const [pickups, setPickups] = useState([]);

  function fetchPickups() {
    axios
      .get(`http://${API_HOST}:${API_PORT}/get_pickups`)
      .then((response) => {
        setPickups(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Fetch once when the page loads
  useEffect(() => {
    fetchPickups();
  }, []);

  return {
    pickups,
    fetchPickups,
  };
}