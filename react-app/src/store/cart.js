const LOAD_CART = 'cart/loadCart'
const ADD_TO_CART = 'cart/addToCart'
const EDIT_CART = 'cart/editCart'

const loadCart = (cart) => ({
  type: LOAD_CART,
  payload: cart
})

const addToCart = (cartItem) => ({
  type: ADD_TO_CART,
  payload: cartItem
})

// const editCart = (cart) => ({
//   type: 
// })

export const loadCartThunk = () => async dispatch => {
  const res = await fetch('/api/cart/')
  if (res.ok) {
    const cart = await res.json();
    await dispatch(loadCart(cart))
    return cart
  } else return null
}

export const addToCartThunk = (productId, quantity) => async dispatch => {
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
    return cart
  } else {
    const errors = await res.json()
  }
}

export const editCartThunk = (itemId, quantity) => async dispatch => {
  const res = await fetch(`/api/cart/${itemId}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity })
  })
  if (res.ok) {
    const cart = await res.json();
    await dispatch(loadCart(cart))
    return cart
  } else {
    const errors = await res.json()
  }
}

const initialState = {}
export default function cartReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case LOAD_CART:
      newState = { ...action.payload }
      return newState
    case ADD_TO_CART:
      newState = { ...action.payload }
      return newState
    default:
      return state

  }
}