import { useState, useEffect } from 'react';
import axios from 'axios';

const API_HOST = '127.0.0.1';
const API_PORT = '8000';

export function useCatalog() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://${API_HOST}:${API_PORT}/get_catalog`)
      .then(response => {
        setProducts(response.data.Products);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return products;
}