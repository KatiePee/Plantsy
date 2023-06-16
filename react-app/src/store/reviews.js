const PRODUCT_REVIEWS = 'reviews/productReviews'
const SINGLE_REVIEW = 'reviews/singleReview'

const productReviews = (reviews) => ({
  type: PRODUCT_REVIEWS,
  payload: reviews
})

const singleReview = (review) => ({
  type: SINGLE_REVIEW,
  payload: review
})

export const productReviewsThunk = (productId) => async dispatch => {
  const res = await fetch(`/api/products/${productId}/reviews`);
  if (res.ok) {
    const reviews = await res.json()
    await dispatch(productReviews(reviews.reviews))
    return reviews
  } else return null
}

const initialState = { product: {} }
export default function reviewsReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case PRODUCT_REVIEWS:
      newState = { ...state, product: {} };
      action.payload.forEach(el => newState.product[el.id] = el)
      return newState;
    default:
      return state
  }
}