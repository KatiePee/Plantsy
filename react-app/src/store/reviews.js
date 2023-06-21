
const PRODUCT_REVIEWS = 'reviews/productReviews'
const SINGLE_REVIEW = 'reviews/singleReview'
const DELETE_REVIEW = 'reviews/deleteReview'
const CREATE_REVIEW = 'reviews/createReview'
const EDIT_REVIEW = 'reviews/editReview'

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

const createReview = (review) => ({
  type: CREATE_REVIEW,
  payload: review
})

const editReview = (review) => ({
  type: CREATE_REVIEW,
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

export const createReviewThunk = (review, productId) => async dispatch => {
  console.log('🤒~~~~~~~~~~create thunk review, prod id', review, productId)
  const res = await fetch(`/api/products/${productId}/review/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  // Set the content type to JSON
    },
    body: JSON.stringify(review)
  })
  if (res.ok) {
    const newReview = await res.json();
    await dispatch(createReview(newReview))
    return newReview;
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const editReviewThunk = (review, id) => async dispatch => {
  const res = await fetch(`/api/reviews/${id}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'  // Set the content type to JSON
    },
    body: JSON.stringify(review)
  })

  if (res.ok) {
    const newReview = await res.json();
    await dispatch(editReview(newReview))
    return newReview;
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
    case CREATE_REVIEW:
      newState = { ...state, product: { ...state.product } }
      newState.product[action.payload.id] = action.payload
      return newState
    case DELETE_REVIEW:
      newState = { ...state, product: { ...state.product } }
      delete newState.product[action.payload];
      return newState
    case EDIT_REVIEW:
      newState = { ...state, product: { ...state.product } }
      newState.product[action.payload.id] = action.payload
      return newState
    default:
      return state
  }
}