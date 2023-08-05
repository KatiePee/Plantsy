import React, { Component, useState } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

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
        className="cart-slide"
        overlayClassName="some-custom-overlay-class"
        isOpen={isOpen}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setIsOpen(false);
        }}
        hideHeader
        width='25rem'
      >

        <div className='cart'>
          <div className="cart-header">
            <h1 >Your Cart</h1>
            <i class="fa-solid fa-x"></i>

          </div>
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