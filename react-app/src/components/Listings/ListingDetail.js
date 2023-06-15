import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { singleListingsThunk } from "../../store/listings"

const ListingDetail = () => {
  const { listingId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const listing = useSelector(state => state.listings.singleListing)

  useEffect(() => {
    async function fetchData() {
      await dispatch(singleListingsThunk(listingId))
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>;

  const { id, title, description, price, userId, listingImages, createdAt } = listing

  //TODO: set up preview image
  const image = listingImages[0]


  console.log('🤡~~🤡~~🤡~~🤡~~~~~ listing detail page')
  return (
    <div className="listing-detail__wrapper">
      <div className="listing-detail__images">
        <img src={image.imageUrl} />
      </div>

      <div className="listing-detail__info">
        <p className="listing-detail__price">$ {price}</p>
        <p className="listing-detail__title">{title}</p>
        <p className="listing-detail__description">$ {description}</p>
        <button>Add to cart</button>
      </div>

      <div className="listing-detail__reviews">
        Review Info
      </div>
    </div>
  )
}

export default ListingDetail