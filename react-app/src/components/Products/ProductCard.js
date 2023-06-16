import { useHistory } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const history = useHistory()

  const { id, title, description, price, userId, productImages, createdAt, numReviews, avgRating } = product

  //TODO: set up preview image
  const image = productImages[0]

  const handleClick = () => {
    history.push(`/products/${id}`)
  }

  return (
    <div className='product-card-wrapper' onClick={handleClick}>
      <div className='product-card__image-wrapper'>
        <img src={image.imageUrl} alt={`${title} image `} className='product-card__image' />
      </div>

      <div className='product-card__details'>
        <p className='product-card__title'>{title}</p>
        <div className='product-card__review-info'>
          <p className='product-card__num-reviews'>{numReviews} reviews</p>
          <p className='product-card__avg-rating'>{avgRating} stars</p>
        </div>
        <p>$ {price}</p>
      </div>
    </div>
  )
}

export default ProductCard