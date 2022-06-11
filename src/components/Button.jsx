import React from "react";

import "./Button.scss";

export default function Button(props) {
  return props.type === "cart" ? (
    <button className="button button_cart">{props.text}</button>
  ) : props.type === "like" ? (
    <button className="button button_like">
      <img src="./assets/heart.svg" alt="Like this product" />
    </button>
  ) : (
    ""
  );
}
