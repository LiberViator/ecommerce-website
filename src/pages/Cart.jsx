import { useEffect, useContext } from "react";

import { CatalogContext, catalogGet } from "./../contexts/catalogContext";
import {
  CartContext,
  cartGet,
  cartAdd,
  cartRemove,
} from "./../contexts/cartContext";

import Header from "./../layout/Header";
import Footer from "./../layout/Footer";

import "./Cart.scss";

export default function Cart() {
  const [productList, catalogDispatch] = useContext(CatalogContext);
  const [cartData, cartDispatch] = useContext(CartContext);

  useEffect(() => cartGet(cartDispatch), []);

  useEffect(() => {
    catalogGet(
      catalogDispatch,
      cartData.map((element) => element.productId)
    );
  }, [cartData]);

  return (
    <>
      <Header />
      <div className="cart">
        <div className="cart__content">
          {cartData &&
            productList &&
            cartData.map((cartProduct, index) => {
              let productData = productList.find(
                (i) => i.id === cartProduct.productId
              );

              if (!productData) {
                return null;
              }

              return (
                <Item
                  productData={productData}
                  quantity={cartProduct.quantity}
                  key={index}
                />
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
}

function Item({ productData, quantity }) {
  const [, cartDispatch] = useContext(CartContext);

  return (
    <div>
      <h3>Product Photo</h3>
      <h3>{productData.title}</h3>
      <h4>{productData.price}</h4>
      <h4>{quantity}</h4>
      <button onClick={(e) => cartAdd(cartDispatch, productData.id, 1)}>
        Add
      </button>
      <button onClick={(e) => cartRemove(cartDispatch, productData.id)}>
        Delete
      </button>
    </div>
  );
}
