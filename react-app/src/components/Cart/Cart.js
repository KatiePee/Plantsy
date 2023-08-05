import React, { Component, useState } from "react";
import { render } from "react-dom";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CartModal from "./CartModal";
import './Cart.css'

export default function Cart() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div >
      <button onClick={() => setIsOpen(true)}>
        <i className="fa-solid fa-cart-shopping"></i>

      </button>

      <SlidingPane
        className="cart"
        overlayClassName="some-custom-overlay-class"
        isOpen={isOpen}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setIsOpen(false);
        }}
        hideHeader
        width='25rem'
      >
        <CartModal />
      </SlidingPane>
    </div>
  );
};