import { useHistory } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const history = useHistory()

  const { id, title, description, price, userId, productImages, createdAt } = product

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
          review info
        </div>
        <p>$ {price}</p>
      </div>
    </div>
  )
}

export default ProductCard