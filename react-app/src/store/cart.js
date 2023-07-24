const ADD_TO_CART = 'cart/addToCart'

const addToCart = (cartItem) => ({
  type: ADD_TO_CART,
  payload: cartItem
})

export const addToCartThunk = () => async dispatch => {
  // const res = await fetch(`api/cart/${productId}/add`, {
  //   method: 'POST',
  //   body: { quantity }
  // })
  console.log('🤡~~~~~ addto cart thunk - before fetch')

  const res = await fetch(`/api/cart/1/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "quantity": 3, "product_id": 4 })
  })
  if (res.ok) {
    const cartItem = await res.json();
    console.log('🎃~~~~~~~~~~~ res ok cart added cart item:', cartItem)
    return cartItem
  } else {
    const errors = await res.json()
    console.log('🤑~~~~~~~~~ add cart errors: ', errors)
  }

}