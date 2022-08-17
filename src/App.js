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
            <ProductProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/0" />} />
                <Route exact path="products" element={<Browse />} />
                <Route exact path=":productLink" element={<Product />} />
                <Route exact path="cart" element={<Cart />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </ProductProvider>
          </CartProvider>
        </CatalogProvider>
      </UserProvider>
    </div>
  );
}
