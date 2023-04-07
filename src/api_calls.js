import axios from "axios";
import { STORAGE } from "./constants";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.baseURL = API_BASE_URL;


export const getOrderPDF = (order_id) => {
  return fetch(`${API_BASE_URL}orders/${order_id}/export_pdf`);
};

export function getCatalog() {
  return axios
    .get(`/products`, {
      params: {
        status: STORAGE,
      },
    })
    .then((response) => response.data.Products);
}

export function getOrders() {
  return axios.get(`/orders`).then((response) => response.data);
}

export function getOrder(oid) {
  return axios.get(`/orders/${oid}`).then((response) => response.data);
}

export function getPickups() {
  return axios.get(`/pickups`).then((response) => response.data).catch((error) => {
      console.error(error);
  });
}

export function getPickup(pid) {
  return axios.get(`/pickups/${pid}`).then((response) => response.data);
}

export function createOrder(order) {
  return axios
    .post(`/orders`, {
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
    .post(`/add_product_to_order`, {
      pid: pid,
      oid: oid,
      amount: amount,
    });
}

export function moveProductToInventory({ pid }) {
  return axios
    .post(`/move_product_to_inventory`, {
      pid: pid,
    });
}

export function movePickupToInventory(pickupId) {
  return axios.post(`/pickups/${pickupId}/move_to_inventory`);
}

// Function to edit product using API
export function editProduct(product) {
  return axios.post(`/products/${product.did}`, product);
}

export function editOrder(order) {
  return axios.put(`/orders/${order.did}`, order);
}

export function deleteProduct(pid) {
  return axios.delete(`/products/${pid}`);
}

export function deleteOrder(oid) {
  return axios.delete(`/orders/${oid}`);
}

export function deletePickup(pickupId) {
  return axios.delete(`/pickups/${pickupId}`);
}

export function markOrderAsDone(oid) {
  return axios.post(`/mark_order_as_done`, {
    oid: oid,
  });
}
