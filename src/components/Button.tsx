import React from "react";

import "./Button.scss";

export default function Button({ variant, onClick }) {
  switch (variant) {
    case "PRODUCT": {
      return (
        <button className="button button_cart" onClick={onClick}>
          Add to Cart
        </button>
      );
    }
    case "LIKE": {
      return (
        <button className="button button_like">
          <img src="assets/heart.svg" alt="Like this product" />
        </button>
      );
    }
    case "CHECKOUT": {
      return <button className="button button_checkout">Checkout</button>;
    }
    default:
      break;
  }
}
