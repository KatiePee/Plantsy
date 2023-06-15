import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { allListingsThunk } from '../../store/listings'
import ListingCard from '../Listings/ListingCard'

const LandingPage = () => {
  const listingsState = useSelector((state => state.listings.allListings))
  const listings = listingsState ? Object.values(listingsState) : [];
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(allListingsThunk())
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {listings.map(listing =>
        <p>{listing.title}</p>)}

      {listings.map(listing => (
        <ListingCard listing={listing} key={listing.id} />
      ))}
    </div>
  )
}

export default LandingPage