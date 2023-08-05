const LOAD_CART = 'cart/loadCart'

const loadCart = (cart) => ({
  type: LOAD_CART,
  payload: cart
})

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

const initialState = { items: [] }
export default function cartReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case LOAD_CART:
      newState = { ...action.payload }
      return newState
    default:
      return state

  }
}