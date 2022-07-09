import { useEffect, useContext } from "react";

import { CatalogContext, catalogGet } from "./../contexts/catalogContext";
import {
  CartContext,
  cartAdd,
  cartRemove,
  cartSet,
} from "./../contexts/cartContext";

import Header from "./../layout/Header";
import Footer from "./../layout/Footer";

import QtyInput from "../components/QtyInput";

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
                return null;
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

  const handleIncrease = (e) => {
    e.preventDefault();
    cartAdd(cartDispatch, productData.id, color, size, 1);
  };
  const handleDecrease = (e) => {
    e.preventDefault();
    cartRemove(cartDispatch, productData.id, color, size);
  };
  const handleSet = (e) => {
    cartSet(cartDispatch, productData.id, color, size, Number(e.target.value));
  };

  return (
    <div>
      <h3>Product Photo</h3>
      <h3>{productData.title}</h3>
      <h4>{productData.price}</h4>
      <h4>Color: {color}</h4>
      <h4>Size: {size}</h4>
      <QtyInput
        type="CART"
        value={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onSet={handleSet}
      />
    </div>
  );
}
