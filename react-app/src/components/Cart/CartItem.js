import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { editCartThunk } from '../../store/cart';

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

  console.log('🤡~~~~~~~~ quantity outside', quantity)
  return (
    <div>
      <div>
        <img className='cart-pic' src={item.product.productImages[0].imageUrl} />
        <h3>{item.product.title}</h3>
        <p>{item.product.price}</p>
        <div className='quantity'>
          <button onClick={handelMinus}>-</button>
          {quantity}
          <button onClick={handleAdd}>+</button>
          <p>remove</p>
        </div>
      </div>


    </div>
  )
}