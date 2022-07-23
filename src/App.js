import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserProvider from "contexts/userContext";
import CatalogProvider from "contexts/catalogContext";
import CartProvider from "contexts/cartContext";
import ProductProvider from "contexts/productContext";

import Home from "pages/Home";
import Product from "pages/Product";
import Cart from "pages/Cart";
import NoPage from "pages/NoPage";

import "styles.scss";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <CatalogProvider>
            <CartProvider>
              <ProductProvider>
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/:productLink" element={<Product />} />
                  <Route exact path="/cart" element={<Cart />} />
                  <Route path="*" element={<NoPage />} />
                </Routes>
              </ProductProvider>
            </CartProvider>
          </CatalogProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}
