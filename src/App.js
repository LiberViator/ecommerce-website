import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProvider from "./contexts/userContext";
import CatalogProvider from "./contexts/catalogContext";
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
      <BrowserRouter>
        <UserProvider>
          <CatalogProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/:productLink"
                  element={
                    <ProductProvider>
                      <Product />
                    </ProductProvider>
                  }
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </CartProvider>
          </CatalogProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
