import { useHistory } from 'react-router-dom'

const ListingCard = ({ listing }) => {
  const history = useHistory()

  const { id, title, description, price, userId, listingImages, createdAt } = listing

  //TODO: set up preview image
  const image = listingImages[0]

  const handleClick = () => {
    history.push(`/listings/${id}`)
  }

  return (
    <div className='listing-card-wrapper' onClick={handleClick}>
      <div className='listing-card__image-wrapper'>
        <img src={image.imageUrl} alt={`${title} image `} className='listing-card__image' />
      </div>

      <div className='listing-card__details'>
        <p className='listing-card__title'>{title}</p>
        <div className='listing-card__review-info'>
          review info
        </div>
        <p>$ {price}</p>
      </div>
    </div>
  )
}

export default ListingCard