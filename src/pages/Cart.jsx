import { useState, useEffect, useContext } from "react";

// import { cartContext } from "./../contexts/cartContext";
// import { productContext } from "./../contexts/productContext";
import {
  UserContext,
  userLogin,
  userLogout,
  userCreate,
  userRemove,
  userUpdate,
} from "./../contexts/userContext";

import Header from "./../layout/Header";
import Footer from "./../layout/Footer";

import "./Cart.scss";

export default function Cart() {
  const { id, name } = useContext(UserContext);
  // const { cartData, cartRemove } = useCartData(0);
  // const { productData } = useProductData(
  //   cartData ? cartData.map((element) => element.id) : null
  // );
  console.log(id);

  return (
    <>
      <Header />
      <div className="cart">
        <h1>{name}</h1>
        {/* <div className="cart__content">
          <h1></h1>
          {cartData &&
            productData &&
            cartData.map(
              (element) =>
                productData.find((i) => element.id === i.id) && (
                  <Item
                    productData={productData.find((i) => element.id === i.id)}
                    quantity={element.qty}
                    onClick={cartRemove}
                    key={element.id}
                  />
                )
            )}
        </div> */}
      </div>
      <Footer />
    </>
  );
}

function Item({ productData, quantity, onClick }) {
  return (
    <div>
      <h3>Product Photo</h3>
      <h3>{productData.title}</h3>
      <h4>{productData.price.current}</h4>
      <h4>{quantity}</h4>
      <button onClick={onClick}>Delete</button>
    </div>
  );
}
