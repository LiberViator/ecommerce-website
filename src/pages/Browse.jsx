// Imports
import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import useFormatPrice from "hooks/useFormatPrice";

import {
  CatalogContext,
  catalogGet,
  catalogFilter,
} from "contexts/catalogContext";

import Footer from "layout/Footer";
import Header from "layout/Header";

import Button from "components/Button";
import QuantityInp from "components/QuantityInp";

import "./Browse.scss";

// Main component
export default function Browse() {
  const [{ catalog, filteredProducts }, catalogDispatch] =
    useContext(CatalogContext);
  const [page, setPage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    catalogGet(catalogDispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main className="browse">
        <div className="browse__content">
          <BrowseSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <BrowseFilter />
          {useMemo(
            () => (
              <BrowseList searchQuery={searchQuery} />
            ),
            [filteredProducts]
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function BrowseSearch({ searchQuery, setSearchQuery }) {
  const [{ catalog }, catalogDispatch] = useContext(CatalogContext);

  const handleChange = (e) => setSearchQuery(e.target.value);

  const handleClick = () => catalogFilter(catalogDispatch, searchQuery);

  if (!catalog) return undefined;

  return (
    <section className="browse__search">
      <input
        type="search"
        placeholder="Search.."
        value={searchQuery}
        onChange={(e) => handleChange(e)}
        className="browse__search__input"
      />
      <button className="browse__search__submit" onClick={handleClick}>
        <img src="assets/search.svg" alt="Search" />
      </button>
    </section>
  );
}

function BrowseFilter() {
  const [catalog] = useContext(CatalogContext);

  if (!catalog) return undefined;

  return (
    <section className="browse__filter">
      <span className="wip">Filter</span>
    </section>
  );
}

function BrowseList({ searchQuery }) {
  const [{ catalog, filteredProducts }] = useContext(CatalogContext);

  const filter =
    filteredProducts.length > 0 || searchQuery.length > 0
      ? filteredProducts.map((_catalogItem, index) => (
          <BrowseItem productData={_catalogItem} key={index} />
        ))
      : catalog.map((_catalogItem, index) => (
          <BrowseItem productData={_catalogItem} key={index} />
        ));

  return <section className="browse__list">{filter}</section>;

  // return (
  //   <section className="browse__list">
  //     {filteredProducts.length > 0 || searchQuery.length > 0
  //       ? filteredProducts.map((_catalogItem, index) => (
  //           <BrowseItem productData={_catalogItem} key={index} />
  //         ))
  //       : catalog.map((_catalogItem, index) => (
  //           <BrowseItem productData={_catalogItem} key={index} />
  //         ))}
  //   </section>
  // );
}

function BrowseItem({ productData }) {
  const [{ catalog }] = useContext(CatalogContext);
  const formatPrice = useFormatPrice(
    productData ? productData.price : undefined
  );

  if (!catalog || !productData || !formatPrice) return undefined;

  return (
    <div className="browse__list__item">
      <Link
        className="browse__list__item__image"
        to={`/products/${productData.id}`}
      >
        <img src={productData.images[0]} alt={productData.title} />
      </Link>
      <Link
        className="browse__list__item__title"
        to={`/products/${productData.id}`}
      >
        <h4>{productData.title}</h4>
      </Link>
      <h3 className="browse__list__item__price">{formatPrice}</h3>
    </div>
  );
}
