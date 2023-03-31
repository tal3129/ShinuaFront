import React from "react";
import Catalog from "./Catalog";
import PickUps from "./PickUps";
import Pickup from "./Pickup";
import Orders from "./Orders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import OrderPage from "./OrderPage";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <BrowserRouter>
          <Box sx={{ flexGrow: 1 }}>
            <Navbar />
            <Box sx={{ p: 2 }}>
              <Routes>
                <Route path="/" element={<Catalog />} />
                <Route path="/catalog" element={<Catalog />} />
                {<Route path="/pickups" element={<PickUps />} />}
                {<Route path="/pickups/:id" element={<Pickup />} />}
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<OrderPage />} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
