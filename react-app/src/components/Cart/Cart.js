import React, { Component, useState } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import CartModal from "./CartModal";
import CartItem from './CartItem';
import './Cart.css'

export default function Cart() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector(state => state.cart)


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
        {/* <CartModal /> */}
        <div className='cart-modal modal-right'>
          <h1 >Your Cart</h1>
          <div className='cart-items'>
            {cart.items.map(item => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
        </div>
      </SlidingPane>
    </div>
  );
};