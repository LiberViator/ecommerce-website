import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "contexts/cartContext";

import "./Header.scss";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const [{ cart }] = useContext(CartContext);

  return (
    <header className="header">
      <Topbar>
        <Link className="header__topbar__item" to="/">
          <img
            className="header__topbar__logo"
            src="assets/logo.svg"
            alt="logo"
          />
        </Link>
        <ul className="header__topbar__menu">
          <Link className="header__topbar__item" to="/">
            <h4>Home</h4>
          </Link>
          <Link className="header__topbar__item" to="/products">
            <h4>Products</h4>
          </Link>
        </ul>
        <ul className="header__topbar__profile">
          <Link className="header__topbar__item" to="/cart">
            <div className="counter">
              {cart.length >= 1 ? <span>{cart.length}</span> : ""}
              <img
                className="header__topbar__item__icon"
                src="assets/cart.svg"
                alt="My Cart"
              />
            </div>
          </Link>
          {/* <TopbarItem
            icon="./assets/account.svg"
            href="/account"
            alt="My Account"
          /> */}
        </ul>
        <button
          className="header__topbar__hamburger"
          onClick={() => {
            !isOpen ? setOpen(true) : setOpen(false);
          }}
        >
          <img
            className="header__topbar__hamburger__icon"
            src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
            alt="Menu button"
          />
        </button>
      </Topbar>
      <Sidebar isOpen={isOpen}>
        <div className="header__sidebar__menu">
          <Link className="header__sidebar__item" to="/">
            <h4>Home</h4>
          </Link>
          <Link className="header__sidebar__item" to="/products">
            <h4>Products</h4>
          </Link>
        </div>
        <div className="header__sidebar__profile">
          <Link className="header__sidebar__item" to="/cart">
            <div className="counter">
              {cart.length >= 1 ? <span>{cart.length}</span> : ""}
              <img src="assets/cart.svg" alt="My Cart" />
            </div>

            <h4>Cart</h4>
          </Link>
          {/* <SidebarItem
            text="Account"
            icon="./assets/account.svg"
            href="/account"
          /> */}
        </div>
      </Sidebar>

      <aside
        className={isOpen ? "header__fade header__fade_open" : "header__fade"}
        onClick={() => setOpen(false)}
      />
    </header>
  );
}

function Topbar({ children }) {
  return (
    <div className="header__topbar">
      <div className="header__topbar__content">{children}</div>
    </div>
  );
}

function Sidebar({ children, isOpen }) {
  return (
    <aside
      className={
        isOpen ? "header__sidebar header__sidebar_open" : "header__sidebar"
      }
    >
      {children}
    </aside>
  );
}
