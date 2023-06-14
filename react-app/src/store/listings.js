const ALL_LISTINGS = 'listings/allListing'
const SINGLE_LISTING = 'listings/singleListing'

const allListings = (listings) => ({
  type: ALL_LISTINGS,
  payload: listings
})

const singleListing = (listing) => ({
  type: SINGLE_LISTING,
  payload: listing
})

export const allListingsThunk = () => async dispatch => {
  const res = await fetch('/api/listings/');
  if (res.ok) {
    const listings = await res.json()
    await dispatch(allListings(listings))
    return listings
  } else return null
}

export const singleListingsThunk = (listingId) => async dispatch => {
  const res = await fetch(`/api/listings/${listingId}`);
  if (res.ok) {
    const listing = await res.json()
    await dispatch(singleListingListings(listing))
    return listing
  } else {
    const errors = await res.json();
    return errors;
  }
}



initialState = { allListings: {}, singleListing: {} }
export default function listingsReducer(state = initialState, action) {
  let newState = {}
  switch (action.type) {
    case ALL_LISTINGS:
      newState = { ...state, allListings: {} };
      action.payload.forEach(el => newState.allListings[el.id] = el)
      return newState;
    case SINGLE_LISTING:
      newState = { ...state, singleListing: { ...action.payload } }
      return newState
    default:
      return state
  }
}