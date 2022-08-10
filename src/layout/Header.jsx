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
        <Link to="/">
          <img
            className="header__topbar__logo"
            src="assets/logo.svg"
            alt="logo"
          />
        </Link>

        <TopbarMenu>
          <Link className="header__topbar__item" to="/0">
            <h4>Polarstjärna</h4>
          </Link>
          <Link className="header__topbar__item" to="/1">
            <h4>Vandringssäng</h4>
          </Link>
        </TopbarMenu>
        <TopbarProfile>
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
        </TopbarProfile>
        <Hamburger
          isOpen={isOpen}
          onClick={() => {
            !isOpen ? setOpen(true) : setOpen(false);
          }}
        />
      </Topbar>
      <Sidebar isOpen={isOpen}>
        <SidebarMenu>
          <Link className="header__sidebar__item" to="/0">
            <h4>Polarstjärna</h4>
          </Link>
          <Link className="header__sidebar__item" to="/1">
            <h4>Vandringssäng</h4>
          </Link>
          {/* <SidebarItem text="Polarstjärna" to="/0" />
          <SidebarItem text="Vandringssäng" to="/1" /> */}
        </SidebarMenu>
        <SidebarProfile>
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
        </SidebarProfile>
      </Sidebar>

      <aside
        className={isOpen ? "header__fade header__fade_open" : "header__fade"}
        onClick={() => setOpen(false)}
      ></aside>
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

function TopbarMenu({ children }) {
  return <ul className="header__topbar__menu">{children}</ul>;
}

function TopbarProfile({ children }) {
  return <ul className="header__topbar__profile">{children}</ul>;
}

function Hamburger({ isOpen, onClick }) {
  return (
    <button className="header__topbar__hamburger" onClick={onClick}>
      <img
        className="header__topbar__hamburger__icon"
        src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
        alt="Menu button"
      />
    </button>
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

function SidebarMenu({ children }) {
  return <div className="header__sidebar__menu">{children}</div>;
}

function SidebarProfile({ children }) {
  return <div className="header__sidebar__profile">{children}</div>;
}
