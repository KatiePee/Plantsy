import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editCartThunk } from '../../store/cart';
import CartItem from './CartItem';
import './Cart.css'

export default function CartModal() {
  const cart = useSelector(state => state.cart)
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)


  return (
    <div className='cart-modal modal-right'>
      <h1 >Your Cart</h1>
      <div className='cart-items'>
        {cart.items.map(item => (
          <CartItem item={item} key={item.id} />
        ))}

      </div>
    </div>
  )
}