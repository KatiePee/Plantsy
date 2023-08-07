import React, { Component, useState } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import CartItem from './CartItem';
import Cart from "./Cart";
import './Cart.css'

export default function CartPane({ visible, closePane }) {
  // const [isOpen, setIsOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(visible);
  const cart = useSelector(state => state.cart)



  return (
    <div >

      <SlidingPane
        className="cart-slide"
        isOpen={visible}
        hideHeader
        width='25rem'
        onRequestClose={closePane}
      >
        <Cart closePane={closePane} />

      </SlidingPane>




      {/* <div className="nav-bar__cart" onClick={() => setIsOpen(true)}>
        <i className="fa-solid fa-cart-shopping"></i>
        {cart.items.length && (<div className='cart_bubble'>{cart.items.length}</div>)}
      </div>

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
            <i onClick={() => setIsOpen(false)} class="fa-solid fa-x icon"></i>
          </div>
          
          <div className='cart-items'>
            {cart.items.map(item => (
              <CartItem item={item} key={item.id} />
            ))}
          </div>
          <div className="line"></div>
          <div className="cart-footer">
            <p className="cart-total">Subtotal: </p>
            <p className="cart-total">$ {cart.total}</p>
          </div>
          <p className="cart-warning">Most items ship separately. Orders cannot be cancelled once placed.</p>
          <button className="cart-button">Checkout</button>
        </div>
      </SlidingPane> */}
    </div>
  );
};