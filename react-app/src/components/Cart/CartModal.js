import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

export default function CartModal() {
  const cart = useSelector(state => state.cart)
  const { closeModal } = useModal()

  return (
    <div>
      <h1>Cart Modal!</h1>
      {cart.items.map(item => (
        <img src={item.product.productImages[0]} />
      ))}
    </div>
  )
}