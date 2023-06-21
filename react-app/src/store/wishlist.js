const MY_WISHLIST = 'wishlist/myWishlist'
const ADD_TO_WISHLIST = 'wishlist/addToWishlist'
const REMOVE_FROM_WISHLIST = 'wishlist/removeFromWishlist'

const myWishlist = (products) => ({
  type: MY_WISHLIST,
  payload: products
})

const addToWishlist = (product) => ({
  type: ADD_TO_WISHLIST,
  payload: product
})

const removeFromWishlist = (product) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: product
})

export const myWishlistThunk = () => async dispatch => {
  console.log('🌿~~~~~~~~~~~~ my wishlist thunk')
  const res = await fetch('/api/wishlist/');
  if (res.ok) {
    const products = await res.json()
    await dispatch(myWishlist(products))
    return products
  } else return null
}

export const addToWishlistThunk = (product) => async dispatch => {
  const res = await fetch(`/api/wishlist/product/${product.id}`, {
    method: 'POST',
  })
  if (res.ok) {
    const response = await res.json()
    await dispatch(addToWishlist(product))
    return product
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const removeFromWishlistThunk = (product) => async dispatch => {
  const res = await fetch(`/api/wishlist/product/${product.id}`, {
    method: 'DELETE',
  })
  if (res.ok) {
    const response = await res.json()
    await dispatch(removeFromWishlist(product))
    return product
  } else {
    const errors = await res.json();
    return errors;
  }
}

const initialState = {}
export default function wishlistReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case MY_WISHLIST:
      newState = { ...state };
      action.payload.forEach(el => newState[el.id] = el)
      return newState;
    case ADD_TO_WISHLIST:
      newState = { ...state }
      newState[action.payload.id] = action.payload
      return newState
    case REMOVE_FROM_WISHLIST:
      newState = { ...state }
      delete newState[action.payload.id]
      return newState
    default:
      return state
  }
}
