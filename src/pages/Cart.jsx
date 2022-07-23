import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CatalogContext, catalogGet } from "contexts/catalogContext";
import {
  CartContext,
  cartAdd,
  cartRemove,
  cartSet,
} from "contexts/cartContext";
import Header from "layout/Header";
import Footer from "layout/Footer";
import QuantityInp from "components/QuantityInp";
import Button from "components/Button";
import "./Cart.scss";

export default function Cart() {
  const [catalog, catalogDispatch] = useContext(CatalogContext);
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
  const [catalog] = useContext(CatalogContext);
  const [{ cart }] = useContext(CartContext);

  return (
    <section className="cart__list">
      <div className="cart__list__content">
        <h2>{`Shopping cart (${cart.length})`}</h2>
        <hr />
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
      <hr />
    </section>
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
    <div className="cart__list__item">
      <div className="cart__list__item__content">
        <div className="cart__list__item__image">
          <img src={productData.images[0]} alt="" />
        </div>

        <Link className="cart__list__item__title" to={`/${productData.id}`}>
          <h3>{productData.title}</h3>
        </Link>

        <div className="cart__list__item__details">
          <h4>
            Color: <span>{color}</span>
          </h4>
          <h4>
            Size: <span>{size}</span>
          </h4>
        </div>
        <div className="cart__list__item__price">
          <h3>{`$${productData.price},00`}</h3>
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
  return (
    <section className="cart__receipt">
      <div className="cart__receipt__content">
        <h2>Summary</h2>
        <hr />
        <div className="cart__receipt__subtotal">
          <h4>Subtotal</h4>
          <h4>{`$${total},00`}</h4>
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
  return (
    <section className="cart__checkout">
      <div className="cart__checkout__content">
        <hr />
        <div className="cart__checkout__total">
          <h3>Total</h3>
          <h3>{`$${total},00`}</h3>
        </div>
        <Button variant="CHECKOUT" />
      </div>
    </section>
  );
}
