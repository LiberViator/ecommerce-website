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
                return;
              }

              return (
                <Item
                  productData={productData}
                  color={_cartItem.color}
                  size={_cartItem.size}
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

function Item({ productData, color, size, quantity }) {
  const [, cartDispatch] = useContext(CartContext);

  return (
    <div>
      <h3>Product Photo</h3>
      <h3>{productData.title}</h3>
      <h4>{productData.price}</h4>
      <h4>Color: {color}</h4>
      <h4>Size: {size}</h4>
      <h4>{quantity}</h4>
      <button
        onClick={(e) => cartAdd(cartDispatch, productData.id, color, size, 1)}
      >
        Add
      </button>
      <button
        onClick={(e) => cartRemove(cartDispatch, productData.id, color, size)}
      >
        Delete
      </button>
    </div>
  );
}
