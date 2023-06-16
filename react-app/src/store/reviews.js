const PRODUCT_REVIEWS = 'reviews/productReviews'
const SINGLE_REVIEW = 'reviews/singleReview'
const DELETE_REVIEW = 'reviews/deleteReview'

const productReviews = (reviews) => ({
  type: PRODUCT_REVIEWS,
  payload: reviews
})

const singleReview = (review) => ({
  type: SINGLE_REVIEW,
  payload: review
})

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId
})

export const productReviewsThunk = (productId) => async dispatch => {
  const res = await fetch(`/api/products/${productId}/reviews`);
  if (res.ok) {
    const reviews = await res.json()
    await dispatch(productReviews(reviews.reviews))
    return reviews
  } else return null
}

export const deleteReviewThunk = (id) => async dispatch => {
  const res = await fetch(`/api/reviews/${id}/delete`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const deleted = await res.json()
    await dispatch(deleteReview(id))
    return deleted
  } else {
    const errors = await res.json();
    return errors;
  }
}

const initialState = { product: {} }
export default function reviewsReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case PRODUCT_REVIEWS:
      newState = { ...state, product: {} };
      action.payload.forEach(el => newState.product[el.id] = el)
      return newState;
    case DELETE_REVIEW:
      newState = { ...state, product: { ...state.product } }
      delete newState.product[action.payload];
      return newState
    default:
      return state
  }
}