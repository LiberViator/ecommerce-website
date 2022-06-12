// https://ui.dev/react-router-tutorial

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import {
  ProductDispatchContext,
  ProductStateContext,
  productGet,
  productSetColor,
  productSetSize,
  productSetQuantity,
} from "./../contexts/productContext";

import Header from "./../layout/Header";
import Footer from "./../layout/Footer";

import Button from "./../components/Button";
import Divider from "./../components/Divider";
import Gallery from "./../components/Gallery";
import Rating from "./../components/Rating";

import "./Product.scss";

export default function Product() {
  const { productLink } = useParams();
  const [productId] = useState(Number(productLink));
  const dispatch = useContext(ProductDispatchContext);
  const { product, quantity, color, size } = useContext(ProductStateContext);

  useEffect(() => {
    productGet(dispatch, productId);
  }, []);

  return (
    <>
      <Header />
      <div className="product">
        <div className="product__content">
          <Gallery product={product && product} />
          <Checkout>
            <Name />
            <Ranking />
            <Price />
            <Description />
            <Divider />
            <Colors />
            <Sizes />
            <Divider />
            <Quantity />
            <nav className="product__checkout__nav">
              <Button type="cart" text="Add to Cart" />
              <Button type="like" />
            </nav>
          </Checkout>
          <Divider />
          <Overview></Overview>
          <Divider />
          <Specs />
          <Divider />
          <Reviews></Reviews>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Checkout
function Checkout(props) {
  return <div className="product__checkout">{props.children}</div>;
}

function Name() {
  const { product } = useContext(ProductStateContext);

  return (
    <h2 className="product__checkout__name">{product ? product.title : ""}</h2>
  );
}

function Ranking() {
  return (
    <div className="product__checkout__ranking">
      <div>
        <img src="./assets/star.svg" alt="" />
        {/* {productRanking ? productRanking : ""} */}
      </div>
      <a href="#reviews">See 8 reviews</a>
    </div>
  );
}

function Price() {
  const { product } = useContext(ProductStateContext);

  return (
    <div className="product__checkout__pricing">
      <h2 className="product__checkout__pricing__current">
        {product ? product.price : ""}
      </h2>
    </div>
  );
}

function Description() {
  const { product } = useContext(ProductStateContext);

  return (
    <p className="product__checkout__desc">
      {product ? product.description : ""}
    </p>
  );
}

function Colors() {
  const { product, color } = useContext(ProductStateContext);

  if (product && product.colors.length > 1) {
    return (
      <div className="product__checkout__colors">
        <h4 className="product__checkout__title">
          Color: <span>{color}</span>
        </h4>
        <ul>
          {product.colors.map((item, index) => (
            <Color item={item} index={index} key={index} />
          ))}
        </ul>
      </div>
    );
  }
}

function Color(props) {
  const dispatch = useContext(ProductDispatchContext);
  const { product, color } = useContext(ProductStateContext);

  return (
    <li>
      <input
        type="radio"
        name="color"
        onChange={(e) => {
          productSetColor(dispatch, product.colors[props.index]);
        }}
        checked={color === product.colors[props.index]}
      />
      <span style={{ backgroundColor: "#000000" }} />
    </li>
  );
}

function Sizes() {
  const { product } = useContext(ProductStateContext);

  if (product && product.sizes.length > 1) {
    return (
      <div className="product__checkout__sizes">
        <h4 className="product__checkout__title">Size</h4>
        <ul>
          {product.sizes.map((item, index) => (
            <Size item={item} index={index} key={index} />
          ))}
        </ul>
      </div>
    );
  }
}

function Size(props) {
  const dispatch = useContext(ProductDispatchContext);
  const { product, size } = useContext(ProductStateContext);

  return (
    <li>
      <input
        type="radio"
        name="size"
        onChange={(e) => {
          productSetSize(dispatch, product.sizes[props.index]);
        }}
        checked={size === product.sizes[props.index]}
      />
      <span>{product.sizes[props.index]}</span>
    </li>
  );
}

function Quantity() {
  const dispatch = useContext(ProductDispatchContext);
  const { product, quantity } = useContext(ProductStateContext);

  return (
    <div className="product__checkout__quantity">
      <div>
        <label className="product__checkout__title" htmlFor="quantity">
          Quantity:
        </label>
        <input
          type="number"
          name="quantity"
          min="1"
          max={product ? product.quantity : ""}
          value={quantity}
          onChange={(e) => {
            productSetQuantity(dispatch, e.target.value);
          }}
        />
      </div>
      <h4 className="product__checkout__title">In Stock</h4>
    </div>
  );
}

// Overview
function Overview(props) {
  return (
    <div id="overview" className="product__overview">
      <h2 className="product__heading">Overview:</h2>
      {props.children}
    </div>
  );
}

// Specification
function Specs() {
  const { product } = useContext(ProductStateContext);

  return (
    <div id="specification" className="product__specs">
      <h2 className="product__heading">Specification:</h2>
      <ul className="product__specs__list">
        {product && product.colors
          ? product.colors.map((item, index) => <SpecsItem key={index} />)
          : ""}
      </ul>
    </div>
  );
}

function SpecsItem(props) {
  return (
    <li className="product__specs__list__item">
      <h4>Weight:</h4>
      <h3>600g</h3>
    </li>
  );
}

// Reviews
function Reviews(props) {
  return (
    <div id="reviews" className="product__reviews">
      <h2 className="product__heading">Reviews:</h2>
      {props.children}
    </div>
  );
}
