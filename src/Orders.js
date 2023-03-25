import { Button } from '@mui/material';
import { useState } from 'react';
import OrderPage from './OrderPage';

const example_product1 = {
  pid: 321,
	name: "my_product_name", 
	description: "hi its for free cuz you have no money",
	image_url_list: Array(2).fill("https://via.placeholder.com/200"),
	status: 0,
	amount: 5
};

const example_product2 = {
  pid: 345,
	name: "rgg", 
	description: "hi its sdfg free cusdfgs",
	image_url_list: Array(5).fill("https://via.placeholder.com/200"),
	status: 0,
	amount: 5
};

const example_order = {
  oid: 123,
  name: "Order 123",
  address: "Example St",
  date: "Today",
  ordered_products: [[example_product1, 20], [example_product2, 30], [example_product1, 20], [example_product2, 30], [example_product1, 20], [example_product2, 30]]
};

const Orders = () => {
  return (
    <>
      <OrderPage order={example_order}/>
    </>
  );
}

export default Orders;
