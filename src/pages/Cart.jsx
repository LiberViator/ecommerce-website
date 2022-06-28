import { useEffect, useContext } from "react";

import { CatalogContext, catalogGet } from "./../contexts/catalogContext";
import { CartContext, cartAdd, cartRemove } from "./../contexts/cartContext";

import Header from "./../layout/Header";
import Footer from "./../layout/Footer";

import "./Cart.scss";

export default function Cart() {
  const [catalog, catalogDispatch] = useContext(CatalogContext);
  const [{ cart }] = useContext(CartContext);

  useEffect(() => {
    catalogGet(
      catalogDispatch,
      cart.map((_cartItem) => _cartItem.productId)
    );
  }, [cart]);

  return (
    <>
      <Header />
      <div className="cart">
        <div className="cart__content">
          {cart &&
            catalog &&
            cart.map((_cartItem, index) => {
              const productData = catalog.find((_product) =>
                _product.id === _cartItem.productId ? _product : false
              );

              if (!productData) {
                return <h1></h1>;
              }

              return (
                <Item
                  productData={productData}
                  quantity={_cartItem.quantity}
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
