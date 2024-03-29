// Imports
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFormatPrice from "hooks/useFormatPrice";

import { CatalogContext, catalogGet } from "contexts/catalogContext";
import {
  CartContext,
  cartAdd,
  cartRemove,
  cartSet,
} from "contexts/cartContext";

import Footer from "layout/Footer";
import Header from "layout/Header";

import Button from "components/Button";
import QuantityInp from "components/QuantityInp";

import "./Cart.scss";

// Main component
export default function Cart() {
  const [{ catalog }, catalogDispatch] = useContext(CatalogContext);
  const [{ cart }] = useContext(CartContext);
  const [total, setTotal] = useState(0);

  function getTotal() {
    const getPrices = cart.map((_cartItem) => {
      const catalogProduct = catalog.find(
        (_catalogProduct) => _catalogProduct.id === _cartItem.productId
      );

      if (!catalogProduct) {
        return null;
      }

      const mpyPrices = catalogProduct.price * _cartItem.quantity;
      return mpyPrices;
    });

    if (getPrices.length >= 1) {
      const sumPrices = getPrices.reduce((total, item) => total + item);
      setTotal(sumPrices);
    } else {
      setTotal(0);
    }
  }

  function getUniqueProductId() {
    return [...new Set(cart.map((_cartItem) => _cartItem.productId))];
  }

  useEffect(() => {
    catalogGet(catalogDispatch, getUniqueProductId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  useEffect(() => {
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, catalog]);

  return (
    <>
      <Header />
      <main className="cart">
        <div className="cart__content">
          <CartList />
          <Receipt total={total} />
          <Checkout total={total} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function CartList() {
  const [{ catalog }] = useContext(CatalogContext);
  const [{ cart }] = useContext(CartContext);

  if (!catalog || !cart) return undefined;

  return (
    <section className="cart__list">
      <div className="cart__list__content">
        {/* <h2>{`Shopping cart (${cart.length})`}</h2> */}
        {cart.map((_cartItem, index) => {
          const productData = catalog.find((_catalogProduct) =>
            _catalogProduct.id === _cartItem.productId ? _catalogProduct : false
          );

          if (!productData) return null;

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
      <hr />
    </section>
  );
}

function Item({ productData, color, size, quantity }) {
  const [, cartDispatch] = useContext(CartContext);
  const formatPrice = useFormatPrice(
    productData ? productData.price : undefined
  );

  if (!productData) return undefined;

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
    <div className="cart__list__item">
      <div className="cart__list__item__content">
        <Link
          className="cart__list__item__image"
          to={`/products/${productData.id}`}
        >
          <img src={productData.images[0]} alt="" />
        </Link>

        <Link
          className="cart__list__item__title"
          to={`/products/${productData.id}`}
        >
          <h3>{productData.title}</h3>
        </Link>

        <div className="cart__list__item__details">
          <h4>
            Color: <span>{color.name}</span>
          </h4>
          <h4>
            Size: <span>{size.name}</span>
          </h4>
        </div>
        <div className="cart__list__item__price">
          <h3>{formatPrice}</h3>
          <QuantityInp
            variant="CART"
            value={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onSet={handleSet}
          />
        </div>
      </div>
      <hr />
    </div>
  );
}

function Receipt({ total }) {
  const formatPrice = useFormatPrice(total);

  return (
    <section className="cart__receipt">
      <div className="cart__receipt__content">
        <h2>Summary</h2>
        <hr />
        <div className="cart__receipt__subtotal">
          <h4>Subtotal</h4>
          <h4>{formatPrice}</h4>
        </div>
        <div className="cart__receipt__discount">
          <h4>Discount</h4>
          <h4>0%</h4>
        </div>
        <div className="cart__receipt__shipping">
          <h4>Shipping</h4>
          <h4>Free</h4>
        </div>
      </div>
    </section>
  );
}

function Checkout({ total }) {
  const formatPrice = useFormatPrice(total ? total : 0);

  return (
    <section className="cart__checkout">
      <div className="cart__checkout__content">
        <hr />
        <div className="cart__checkout__total">
          <h3>Total</h3>
          <h3>{formatPrice}</h3>
        </div>
        <Button variant="CHECKOUT" />
      </div>
    </section>
  );
}
