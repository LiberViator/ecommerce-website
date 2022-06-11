import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="header">
      <Topbar>
        <TopbarLogo />
        <TopbarMenu>
          <TopbarItem href="test" text="Polarstjärna" />
          <TopbarItem href="test" text="Vandringssäng" />
          <TopbarItem href="test" text="Contact" />
        </TopbarMenu>
        <TopbarProfile>
          <TopbarItem icon="./assets/cart.svg" href="/cart" alt="My Cart" />
          <TopbarItem
            icon="./assets/account.svg"
            href="/account"
            alt="My Account"
          />
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
          <SidebarItem text="Polarstjärna" href="" />
          <SidebarItem text="Vandringssäng" href="" />
          <SidebarItem text="Contact" href="" />
        </SidebarMenu>
        <SidebarProfile>
          <SidebarItem text="Cart" icon="./assets/cart.svg" href="/cart" />
          <SidebarItem
            text="Account"
            icon="./assets/account.svg"
            href="/account"
          />
        </SidebarProfile>
      </Sidebar>
    </header>
  );
}

function Topbar(props) {
  return (
    <div className="header__topbar">
      <div className="header__topbar__content">{props.children}</div>
    </div>
  );
}

function TopbarLogo() {
  return (
    <img className="header__topbar__logo" src="./assets/logo.svg" alt="logo" />
  );
}

function TopbarMenu(props) {
  return <ul className="header__topbar__menu">{props.children}</ul>;
}

function TopbarProfile(props) {
  return <ul className="header__topbar__profile">{props.children}</ul>;
}

function TopbarItem(props) {
  return (
    <Link className="header__topbar__item" to={props.href}>
      {props.icon ? (
        <img
          className="header__topbar__item__icon"
          src={props.icon}
          alt={props.alt}
        />
      ) : (
        ""
      )}
      {props.text ? props.text : ""}
    </Link>
  );
}

function Hamburger(props) {
  return (
    <button className="header__topbar__hamburger" onClick={props.onClick}>
      <img
        className="header__topbar__hamburger__icon"
        src={props.isOpen ? "./assets/close.svg" : "./assets/menu.svg"}
        alt="Menu button"
      />
    </button>
  );
}

function Sidebar(props) {
  return (
    <aside
      className={`header__sidebar ${
        props.isOpen ? "header__sidebar_open" : ""
      }`}
    >
      {props.children}
    </aside>
  );
}

function SidebarMenu(props) {
  return <div className="header__sidebar__menu">{props.children}</div>;
}

function SidebarProfile(props) {
  return <div className="header__sidebar__profile">{props.children}</div>;
}

function SidebarItem(props) {
  return (
    <Link className="header__sidebar__item" to={props.href}>
      {props.icon ? <img src={props.icon} alt={props.alt} /> : ""}
      <h4>{props.text}</h4>
    </Link>
  );
}
