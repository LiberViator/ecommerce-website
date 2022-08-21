import { Routes, Route, Navigate } from "react-router-dom";

import UserProvider from "contexts/userContext";
import CatalogProvider from "contexts/catalogContext";
import CartProvider from "contexts/cartContext";
import ProductProvider from "contexts/productContext";

import Product from "pages/Product";
import Cart from "pages/Cart";
import Browse from "pages/Browse";
import NoPage from "pages/NoPage";

import "styles.scss";

export default function App() {
  return (
    <div className="App">
      <UserProvider>
        <CatalogProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/products" />} />
              <Route exact path="/products" element={<Browse />} />
              <Route
                exact
                path="/products/:productLink"
                element={
                  <ProductProvider>
                    <Product />
                  </ProductProvider>
                }
              />
              <Route exact path="/cart" element={<Cart />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </CartProvider>
        </CatalogProvider>
      </UserProvider>
    </div>
  );
}
