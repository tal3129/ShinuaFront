import axios from "axios";
import { STORAGE } from "./constants";

const API_HOST = "127.0.0.1";
const API_PORT = "8000";

export function getCatalog() {
  return axios
    .get(`http://${API_HOST}:${API_PORT}/products`, {
      params: {
        status: STORAGE,
      },
    })
    .then((response) => (response.data.Products));
}

export function getOrders() {
  return axios
    .get(`http://${API_HOST}:${API_PORT}/orders`)
    .then((response) => (response.data));
}

export function getOrder(oid) {
  return axios
    .get(`http://${API_HOST}:${API_PORT}/orders/${oid}`)
    .then((response) => (response.data));
}

export function getPickups() {
  return axios
    .get(`http://${API_HOST}:${API_PORT}/pickups`)
    .then((response) => (response.data))
    .catch((error) => {
      console.error(error);
    });
}

export function getPickup(pid) {
  return axios
    .get(`http://${API_HOST}:${API_PORT}/pickups/${pid}`)
    .then((response) => (response.data));
}

export function createOrder(order) {
  return axios
    .post(`http://${API_HOST}:${API_PORT}/orders`, {
      did: "", // We don't know the id yet
      name: order.name,
      address: order.address,
      description: order.description,
      date: order.date,
      status: order.status,
      ordered_products: {
        // No products yet :(
      },
    });
}

export function addProductToOrder({ oid, pid, amount }) {
  return axios
    .post(`http://${API_HOST}:${API_PORT}/add_product_to_order`, {
      pid: pid,
      oid: oid,
      amount: amount,
    });
}

export function moveProductToInventory({ pid }) {
  return axios
    .post(`http://${API_HOST}:${API_PORT}/move_product_to_inventory`, {
      pid: pid,
    });
}

export function movePickupToInventory(pickupId) {
  return axios.post(`http://${API_HOST}:${API_PORT}/pickups/${pickupId}/move_to_inventory`);
}

// Function to edit product using API
export function editProduct(product) {
  return axios.post(`http://${API_HOST}:${API_PORT}/products/${product.did}`, product);
}

export function editOrder(order) {
  return axios.put(`http://${API_HOST}:${API_PORT}/orders/${order.did}`, order);
}

export function deleteProduct(pid) {
  return axios.delete(`http://${API_HOST}:${API_PORT}/products/${pid}`);
}

export function deleteOrder(oid) {
  return axios.delete(`http://${API_HOST}:${API_PORT}/orders/${oid}`);
}

export function deletePickup(pickupId) {
  return axios.delete(`http://${API_HOST}:${API_PORT}/pickups/${pickupId}`);
}

export function markOrderAsDone(oid) {
  return axios.post(`http://${API_HOST}:${API_PORT}/mark_order_as_done`, {
    oid: oid,
  });
}