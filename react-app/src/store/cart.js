const ADD_TO_CART = 'cart/addToCart'

const addToCart = (cartItem) => ({
  type: ADD_TO_CART,
  payload: cartItem
})

export const addToCartThunk = (productId, quantity) => async dispatch => {
  // const res = await fetch(`api/cart/${productId}/add`, {
  //   method: 'POST',
  //   body: { quantity }
  // })
  console.log('🤡~~~~~ addto cart thunk - before fetch')

  const res = await fetch(`/api/cart/${productId}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity, productId })
  })
  if (res.ok) {
    const cart = await res.json();
    await dispatch(addToCart(cart))
    console.log('🎃~~~~~~~~~~~ res ok cart added cart item:', cart)
    return cart
  } else {
    const errors = await res.json()
    console.log('🤑~~~~~~~~~ add cart errors: ', errors)
  }
}

const initialState = {}
export default function cartReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case ADD_TO_CART:
      newState = { ...action.payload }
      return newState
    default:
      return state

  }
}