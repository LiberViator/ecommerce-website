import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";

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
          <div className="cart__list">
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
          <div className="cart__checkout"></div>
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
    <section className="cart__list__item">
      <div className="cart__list__item__content">
        <div className="cart__list__item__image">
          <img src={productData.images[0]} alt="" />
        </div>
        <div className="cart__list__item__details">
          <Link to={`/${productData.id}`}>
            <h3>{productData.title}</h3>
          </Link>
          <h4>
            Color: <b>{color}</b>
          </h4>
          <h4>
            Size: <b>{size}</b>
          </h4>
        </div>
        <div className="cart__list__item__price">
          <h3>{productData.price}</h3>
          <QtyInput
            variant="CART"
            value={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onSet={handleSet}
          />
        </div>
      </div>
      <hr />
    </section>
  );
}
