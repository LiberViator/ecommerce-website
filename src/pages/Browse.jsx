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
export default function Cart() {
  const [catalog, catalogDispatch] = useContext(CatalogContext);

  useEffect(() => {
    catalogGet(catalogDispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main className="browse">
        <div className="browse__content">
          <BrowseSearch />
          <BrowseFiltr />
          <BrowseList />
        </div>
      </main>
      <Footer />
    </>
  );
}

function BrowseSearch() {
  const [catalog] = useContext(CatalogContext);

  if (!catalog) return undefined;

  return (
    <section className="browse__search">
      <input type="text" className="browse__search__input" />
      <input type="submit" className="browse__search__submit" value=">" />
    </section>
  );
}

function BrowseFiltr() {
  const [catalog] = useContext(CatalogContext);

  if (!catalog) return undefined;

  return <section className="browse__filtr"></section>;
}

function BrowseList() {
  const [catalog] = useContext(CatalogContext);

  if (!catalog) return undefined;

  return (
    <section className="browse__list">
      {catalog.map((_catalogItem) => (
        <BrowseItem key={_catalogItem.id} />
      ))}
    </section>
  );
}

function BrowseItem() {
  const [catalog] = useContext(CatalogContext);

  if (!catalog) return undefined;

  return <div className="browse__list__item"></div>;
}
