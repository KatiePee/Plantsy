import React, { Component, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutThunk } from "../../store/cart";
import CartItem from "./CartItem";
import './Cart.css'

export default function Cart({ closePane }) {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const handleCheckout = async () => {
    await dispatch(checkoutThunk())
  }

  return (
    <div className='cart'>
      <div className="cart-header">
        <h1 >Your Cart</h1>
        <i onClick={closePane} class="fa-solid fa-x icon"></i>
      </div>

      <div className='cart-items'>
        {cart.items?.map(item => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      <div className="line"></div>
      <div className="cart-footer">
        <p className="cart-total">Subtotal: </p>
        <p className="cart-total">$ {cart.total}</p>
      </div>
      <p className="cart-warning">Most items ship separately. Orders cannot be cancelled once placed.</p>
      <button className="cart-button" onClick={handleCheckout}>Checkout</button>
    </div>
  )
}