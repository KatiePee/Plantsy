import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editCartThunk } from '../../store/cart';
import CartItem from './CartItem';
import './Cart.css'

export default function CartModal() {
  const cart = useSelector(state => state.cart)
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState('')

  // const handelMinus = async () => {
  //   return dispatch(editCartThunk(1, 10))
  // }
  return (
    <div className='cart-modal'>
      <h1>Cart Modal!</h1>
      {cart.items.map(item => (
        <CartItem item={item} />

      ))}
    </div>
  )
}