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
        // <div>
        //   <img className='cart-pic' src={item.product.productImages[0].imageUrl} />
        //   <h3>{item.product.title}</h3>
        //   <p>{item.product.price}</p>
        //   <div className='quantity'>
        //     <button onClick={handelMinus}>-</button>
        //     {item.quantity}
        //     <button>+</button>
        //     <p>remove</p>
        //   </div>
        // </div>
        <CartItem item={item} />

      ))}
    </div>
  )
}