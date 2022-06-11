import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProvider from "./contexts/userContext";
import CartProvider from "./contexts/cartContext";
import ProductProvider from "./contexts/productContext";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import NoPage from "./pages/NoPage";

import "./styles.scss";

export default function App() {
  return (
    <div className="App">
      <UserProvider>
        <CartProvider>
          <ProductProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/:productLink" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </BrowserRouter>
          </ProductProvider>
        </CartProvider>
      </UserProvider>
    </div>
  );
}
