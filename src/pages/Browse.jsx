// Imports
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFormatPrice from "hooks/useFormatPrice";

import { CatalogContext, catalogGet } from "contexts/catalogContext";

import Footer from "layout/Footer";
import Header from "layout/Header";

import Button from "components/Button";
import QuantityInp from "components/QuantityInp";

import "./Browse.scss";

// Main component
export default function Browse() {
  const [catalog, catalogDispatch] = useContext(CatalogContext);
  const [page, setPage] = useState("");
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  function getUniqueProductId() {
    return filteredProducts.length > 0
      ? [...new Set(filteredProducts.map((_product) => _product.id))]
      : undefined;
  }

  useEffect(() => {
    catalogGet(catalogDispatch, getUniqueProductId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredProducts]);

  return (
    <>
      <Header />
      <main className="browse">
        <div className="browse__content">
          <BrowseSearch
            search={search}
            setSearch={setSearch}
            setFilteredProducts={setFilteredProducts}
          />
          <BrowseFiltr />
          <BrowseList search={search} filteredProducts={filteredProducts} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function BrowseSearch({ search, setSearch, setFilteredProducts }) {
  const [catalog] = useContext(CatalogContext);

  if (!catalog) return undefined;

  const handleClick = () => {
    setFilteredProducts();
  };

  return (
    <section className="browse__search">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="browse__search__input"
      />
      <input
        type="submit"
        className="browse__search__submit"
        value=">"
        onClick={handleClick}
      />
    </section>
  );
}

function BrowseFiltr() {
  const [catalog] = useContext(CatalogContext);

  if (!catalog) return undefined;

  return <section className="browse__filtr"></section>;
}

function BrowseList({ filteredProducts }) {
  const [catalog] = useContext(CatalogContext);

  if (!catalog) return undefined;

  return (
    <section className="browse__list">
      {filteredProducts.length > 0
        ? filteredProducts.map((_catalogItem, index) => (
            <BrowseItem productData={_catalogItem} key={index} />
          ))
        : catalog.map((_catalogItem, index) => (
            <BrowseItem productData={_catalogItem} key={index} />
          ))}
      {console.log(filteredProducts)}
    </section>
  );
}

function BrowseItem({ productData }) {
  const [catalog] = useContext(CatalogContext);
  const formatPrice = useFormatPrice(
    productData ? productData.price : undefined
  );

  if (!catalog || !productData || !formatPrice) return undefined;

  return (
    <div className="browse__list__item">
      <Link className="browse__list__item__image" to={`/${productData.id}`}>
        <img src={productData.images[0]} alt={productData.title} />
      </Link>
      <Link className="browse__list__item__title" to={`/${productData.id}`}>
        <h4>{productData.title}</h4>
      </Link>
      <h3 className="browse__list__item__price">{formatPrice}</h3>
    </div>
  );
}
