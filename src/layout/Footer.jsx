import React, { useState } from "react";

import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <Navigation>
        <Contact>
          <img
            src="assets/logo.svg"
            alt="logo"
            className="footer__nav__contact__logo"
          />
          <h4 className="footer__nav__contact__item">
            4206 Corbin Branch Road
            <br />
            37929 Knoxville
          </h4>
          <h4 className="footer__nav__contact__item">+62 361 419 288</h4>
          <nav className="footer__nav__contact__item">
            <img src="assets/instagram.svg" alt="instagram link" />
            <img src="assets/facebook.svg" alt="facebook link" />
          </nav>
        </Contact>
        <hr />
        <Accordion text="Services">
          <AccordionItem text="Returns & Exchanges" link="" />
          <AccordionItem text="Shipping Info" link="" />
          <AccordionItem text="Tracking Order" link="" />
          <AccordionItem text="Order status" link="" />
        </Accordion>
        <hr />
        <Accordion text="Info">
          <AccordionItem text="About Us" link="" />
          <AccordionItem text="Privacy Policy" link="" />
          <AccordionItem text="Terms of Use" link="" />
          <AccordionItem text="Contact Us" link="" />
        </Accordion>
      </Navigation>
      <Information>
        <InformationCredit></InformationCredit>
        <InformationPayment>
          <InformationIcon />
        </InformationPayment>
      </Information>
    </footer>
  );
}

function Navigation(props) {
  return (
    <div className="footer__nav">
      <div className="footer__nav__content">{props.children}</div>
    </div>
  );
}

function Contact(props) {
  return <section className="footer__nav__contact">{props.children}</section>;
}

function Accordion(props) {
  const [isOpen, setOpen] = useState(false);

  function openAccordion() {
    if (isOpen === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  return (
    <div className="footer__nav__accordion">
      <button
        className="footer__nav__accordion__button"
        onClick={openAccordion}
      >
        <h3 className="footer__nav__accordion__button__text">{props.text}</h3>
        <img
          className="footer__nav__accordion__button__icon"
          src={isOpen ? "assets/hide.svg" : "assets/show.svg"}
          alt=""
        />
      </button>
      <ul
        className={`footer__nav__accordion__list ${
          isOpen ? "footer__nav__accordion__list_open" : ""
        }`}
      >
        {props.children}
      </ul>
    </div>
  );
}

function AccordionItem(props) {
  return (
    <a href={props.link} className="footer__nav__accordion__list__item">
      {props.text}
    </a>
  );
}

function Information(props) {
  return (
    <div className="footer__info">
      <div className="footer__info__content">{props.children}</div>
    </div>
  );
}

function InformationCredit() {
  return (
    <p className="footer__info__credits">
      © 2022 Company. All rights reserved.
    </p>
  );
}

function InformationPayment(props) {
  return <div className="footer__info__payment">{props.children}</div>;
}

function InformationIcon() {
  return <img src="" alt="" className="footer__info__payment__icon" />;
}
