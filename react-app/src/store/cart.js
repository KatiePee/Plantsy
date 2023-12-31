const LOAD_CART = 'cart/loadCart'
const CHECKOUT = 'cart/checkout'

export const loadCart = (cart) => ({
  type: LOAD_CART,
  payload: cart
})

const checkout = (cart) => ({
  type: CHECKOUT,
  payload: cart
})

export const loadCartThunk = () => async dispatch => {
  const res = await fetch('/api/cart/')
  if (res.ok) {
    const cart = await res.json();
    await dispatch(loadCart(cart))
    return cart
  } else {
    await dispatch(loadCart({ items: [] }))
  }
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
    await dispatch(loadCart(cart))
    return cart
  } else {
    const errors = await res.json()
    return errors
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
    return errors
  }
}

export const removeFromCartThunk = (itemId) => async dispatch => {
  const res = await fetch(`/api/cart/${itemId}/delete`, {
    method: 'DELETE',
  })
  if (res.ok) {
    const cart = await res.json();
    await dispatch(loadCart(cart))
    return cart
  } else {
    const errors = await res.json()
    return errors
  }
}

export const checkoutThunk = () => async dispatch => {
  const res = await fetch('/api/cart/checkout')
  if (res.ok) {
    const cart = await res.json()
    console.log('🎃~~~~~~~~~~~~res in checkout thunk', cart)
    await dispatch(checkout(cart))
    return cart
  } else {
    const errors = await res.json()
    console.log('🎃~~~~~~~~~~~~res in checkout thunk: errors: ', errors)
    return errors
  }
}

const initialState = { items: [] }
export default function cartReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case LOAD_CART:
      newState = { ...action.payload }
      return newState
    case CHECKOUT:
      newState = { ...action.payload }
      return newState
    default:
      return state

  }
}