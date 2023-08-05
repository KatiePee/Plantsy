import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { editCartThunk, removeFromCartThunk } from '../../store/cart';
import './Cart.css'

export default function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item?.quantity);
  const dispatch = useDispatch()

  const handelMinus = async () => {
    await dispatch(editCartThunk(item.id, quantity - 1))
    await setQuantity(quantity - 1)
  }

  const handleAdd = async () => {
    await dispatch(editCartThunk(item.id, quantity + 1))
    await setQuantity(quantity + 1)
  }

  // const handleChange = async () => {
  //   await dispatch(editCartThunk(item.id, quantity + 1))
  //   await setQuantity(quantity + 1)
  // }

  const handelRemove = async () => {
    await dispatch(removeFromCartThunk(item.id))
  }

  return (
    <>
      <div className="cart-item" key={item.id}>

        <div className="cart-item__left">
          <img className='cart-pic' src={item.product.productImages[0].imageUrl} />
        </div>

        <div className="cart-item__right">

          <div className="cart-item__info">
            {/* <p>{item.product.title}</p> */}
            <p>Swiss Cheese Plant</p>
            <p >$ {item.product.price}</p>
          </div>

          <div className="cart-item__change">
            <div className="cart-item__quantity">
              <i class="fa-solid fa-minus cart-change" onClick={handelMinus}></i>
              <div className="quantity">{quantity}</div>
              {/* <input type="number" className="quantity" value={quantity} onChange={(e)=> handleChange(e)} /> */}
              <i class="fa-solid fa-plus cart-change" onClick={handleAdd}></i>
            </div>
            <div className="cart-item__remove" onClick={handelRemove}>
              <i class="fa-solid fa-trash-can"></i>
            </div>
          </div>

        </div>

      </div>
      <div className="line"></div>
    </>
  )
}