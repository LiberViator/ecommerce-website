// Imports
import { useContext, useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFormatPrice from "hooks/useFormatPrice";

import {
  CatalogContext,
  catalogGet,
  catalogFilter,
} from "contexts/catalogContext";

import Footer from "layout/Footer";
import Header from "layout/Header";

import "./Browse.scss";

// Main component
export default function Browse() {
  const [{ filteredProducts }, catalogDispatch] = useContext(CatalogContext);
  const [searchParams, updateSearchParams] = useSearchParams();

  const [titleInput, setTitleInput] = useState(searchParams.get("title") || "");
  const [categoryInput, setCategoryInput] = useState(
    searchParams.get("category") || ""
  );

  const setSearchParams = (object) => {
    const formatedParams = Object.fromEntries([...searchParams]);
    updateSearchParams({ ...formatedParams, ...object });
  };

  useEffect(() => {
    catalogGet(catalogDispatch);
  }, []);
  useEffect(() => {
    catalogFilter(catalogDispatch, titleInput, categoryInput);
  }, [searchParams]);

  return (
    <>
      <Header />
      <main className="browse">
        <div className="browse__content">
          <BrowseSearch
            titleInput={titleInput}
            setTitleInput={setTitleInput}
            setSearchParams={setSearchParams}
          />
          <BrowseFilter />
          {useMemo(
            () => (
              <BrowseList titleInput={titleInput} />
            ),
            [filteredProducts]
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function BrowseSearch({ titleInput, setTitleInput, setSearchParams }) {
  const handleChange = (e) => setTitleInput(e.target.value);

  const handleClick = () => setSearchParams({ title: titleInput });

  return (
    <section className="browse__search">
      <input
        type="search"
        placeholder="Search"
        value={titleInput}
        onChange={(e) => handleChange(e)}
        className="browse__search__input"
      />
      <button className="browse__search__submit" onClick={() => handleClick()}>
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

function BrowseList({ titleInput }) {
  const [{ catalog, filteredProducts }] = useContext(CatalogContext);

  const filteredItems =
    filteredProducts?.length > 0 || titleInput?.length > 0
      ? filteredProducts.map((_catalogItem, index) => (
          <BrowseItem productData={_catalogItem} key={index} />
        ))
      : catalog.map((_catalogItem, index) => (
          <BrowseItem productData={_catalogItem} key={index} />
        ));

  return <section className="browse__list">{filteredItems}</section>;
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
