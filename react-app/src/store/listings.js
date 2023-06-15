const ALL_LISTINGS = 'listings/allListing'
const SINGLE_LISTING = 'listings/singleListing'
const CREAT_LISTING = 'listings/creatListing'

const allListings = (listings) => ({
  type: ALL_LISTINGS,
  payload: listings
})

const singleListing = (listing) => ({
  type: SINGLE_LISTING,
  payload: listing
})

const createListing = (listing) => ({
  type: CREAT_LISTING,
  payload: listing
})

export const allListingsThunk = () => async dispatch => {
  const res = await fetch('/api/listings/');
  if (res.ok) {
    const listings = await res.json()
    await dispatch(allListings(listings.listings))
    return listings
  } else return null
}

export const singleListingsThunk = (listingId) => async dispatch => {
  const res = await fetch(`/api/listings/${listingId}`);
  if (res.ok) {
    const listing = await res.json()
    await dispatch(singleListing(listing))
    return listing
  } else {
    const errors = await res.json();
    return errors;
  }
}

export const createListingThunk = (listing) => async dispatch => {
  console.log('🤡~~~🤡~~~🤡~~~🤡~~~🤡~~~🤡~~~ create listing thunk', JSON.stringify(listing))
  const res = await fetch('/api/listings/new', {
    method: 'POST',
    body: JSON.stringify(listing)
  })

  if (res.ok) {
    const newListing = await res.json();
    console.log('🤡~~~🤡~~~🤡~~~🤡~~~🤡~~~🤡~~~ create listing thunk res', newListing)
    await dispatch(createListing(newListing))
    return newListing;
  } else {
    const errors = await res.json();
    console.log('🤡~~~🤡~~~🤡~~~🤡~~~🤡~~~🤡~~~ create listing thunk res', errors)
    return errors;
  }
}



const initialState = { allListings: {}, singleListing: {} }
export default function listingsReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case ALL_LISTINGS:
      newState = { ...state, allListings: {} };
      action.payload.forEach(el => newState.allListings[el.id] = el)
      return newState;
    case SINGLE_LISTING:
      newState = { ...state, singleListing: { ...action.payload } }
      return newState
    case CREAT_LISTING:
      newState = { ...state, allListings: { ...state.allListings }, singleListing: { ...action.payload } }
      newState.allListings[action.payload.id] = action.payload
      return newState
    default:
      return state
  }
}