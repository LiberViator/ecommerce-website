// https://ui.dev/react-router-tutorial

import { useState, useEffect, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import useProductData from "./../contexts/productContext";

import Header from "./../layout/Header";
import Footer from "./../layout/Footer";

import Button from "./../components/Button";
import Divider from "./../components/Divider";
import Gallery from "./../components/Gallery";
import Rating from "./../components/Rating";

import "./Product.scss";

const ProductContext = createContext();

export default function Product() {
  const { productLink } = useParams();
  const [productId, setProductId] = useState(Number(productLink));
  const productData = useProductData([productId]);
  // productData ? console.log(productData[0]) : null;

  const [productQuantity, setProductQuantity] = useState(1);
  const [productColor, setProductColor] = useState(null);
  const [productSize, setProductSize] = useState(null);
  const [productRanking, setProductRanking] = useState(null);

  useEffect(() => {
    if (productData) {
      console.log(productData);
      setProductColor(productData.colors[0]);
      setProductSize(productData.sizes[0]);
      setProductRanking(
        Math.round(
          (productData.reviews.map((i) => i.rate).reduce((a, b) => a + b, 0) /
            productData.reviews.length +
            Number.EPSILON) *
            10
        ) / 10
      );
    }
  }, productData);

  return (
    <>
      <Header />
      <ProductContext.Provider
        value={{
          productData,
          productQuantity,
          setProductQuantity,
          productColor,
          setProductColor,
          productSize,
          setProductSize,
          productRanking,
          setProductRanking,
        }}
      >
        <div className="product">
          <div className="product__content">
            <Gallery />
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
      </ProductContext.Provider>
      <Footer />
    </>
  );
}

// Checkout
function Checkout(props) {
  return <div className="product__checkout">{props.children}</div>;
}

function Name() {
  const { productData } = useContext(ProductContext);

  return (
    <h2 className="product__checkout__name">
      {productData ? productData.title : ""}
    </h2>
  );
}

function Ranking() {
  const { productRanking } = useContext(ProductContext);

  return (
    <div className="product__checkout__ranking">
      <div>
        <img src="./assets/star.svg" alt="" />
        {productRanking ? productRanking : ""}
      </div>
      <a href="#reviews">See 8 reviews</a>
    </div>
  );
}

function Price() {
  const { productData } = useContext(ProductContext);

  return (
    <div className="product__checkout__pricing">
      <h2 className="product__checkout__pricing__current">
        {productData ? productData.price : ""}
      </h2>
    </div>
  );
}

function Description() {
  const { productData } = useContext(ProductContext);

  return (
    <p className="product__checkout__desc">
      {productData ? productData.description : ""}
    </p>
  );
}

function Colors() {
  const { productData, productColor } = useContext(ProductContext);

  if (productData && productData.colors.length > 1) {
    return (
      <div className="product__checkout__colors">
        <h4 className="product__checkout__title">
          Color: <span>{productColor}</span>
        </h4>
        <ul>
          {productData.colors.map((item, index) => (
            <Color item={item} index={index} key={index} />
          ))}
        </ul>
      </div>
    );
  }
}

function Color(props) {
  const { productData, productColor, setProductColor } =
    useContext(ProductContext);

  return (
    <li>
      <input
        type="radio"
        id="color"
        name="color"
        onChange={(e) => {
          setProductColor(productData.colors[props.index]);
        }}
        checked={productColor === productData.colors[props.index]}
      />
      <span style={{ backgroundColor: "#000000" }} />
    </li>
  );
}

function Sizes() {
  const { productData } = useContext(ProductContext);

  if (productData && productData.colors.length > 1) {
    return (
      <div className="product__checkout__sizes">
        <h4 className="product__checkout__title">Size</h4>
        <ul>
          {productData.sizes.map((item, index) => (
            <Size item={item} index={index} key={index} />
          ))}
        </ul>
      </div>
    );
  }
}

function Size(props) {
  const { productData, productSize, setProductSize } =
    useContext(ProductContext);

  return (
    <li>
      <input
        type="radio"
        name="size"
        onChange={(e) => {
          setProductSize(productData.sizes[props.index]);
        }}
        checked={productSize === productData.sizes[props.index]}
      />
      <span>{productData.sizes[props.index]}</span>
    </li>
  );
}

function Quantity() {
  const { productData, productQuantity, setProductQuantity } =
    useContext(ProductContext);

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
          max={productData ? productData.quantity : ""}
          value={productQuantity}
          onChange={(e) => {
            setProductQuantity(e.target.value);
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
  const { productData } = useContext(ProductContext);

  return (
    <div id="specification" className="product__specs">
      <h2 className="product__heading">Specification:</h2>
      <ul className="product__specs__list">
        {productData && productData.colors
          ? productData.colors.map((item, index) => <SpecsItem key={index} />)
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
