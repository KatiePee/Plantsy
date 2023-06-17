import { useHistory } from 'react-router-dom'
import './Products.css'
const ProductCard = ({ product }) => {
  const history = useHistory()

  const { id, title, description, price, userId, productImages, createdAt, numReviews, avgRating } = product

  //TODO: set up preview image
  const image = productImages[0]

  const handleClick = () => {
    history.push(`/products/${id}`)
  }

  const imageStyle = {
    backgroundImage: `url(${image.imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: '19rem',
    height: "19rem",
    borderRadius: "5px",
    objectFit: 'cover',
    // backgroundRepeat: 'no-repeat'
  }

  return (
    <div className='product-card__wrapper' onClick={handleClick} style={imageStyle}>

      {/* <img src={image.imageUrl} alt={`${title} image `} className='product-card__image' /> */}

      <div className='product-card__wishlist'>
        {/* <i class="fa-solid fa-heart"></i> */}
        <i class="fa-regular fa-heart"></i>
      </div>

      <span className='product-card__price'>
        <p>$ {price}</p>
      </span>



      {/* <div className='product-card__details'> */}
      {/* <p className='product-card__title'>{title}</p>
        <div className='product-card__review-info'>
          <p className='product-card__num-reviews'>{numReviews} reviews</p>
          <p className='product-card__avg-rating'>{avgRating} stars</p>
        </div> */}


      {/* {postImages.map((image) => {
          const imageStyle = {
            backgroundImage: `url(${image.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "300px",
            borderRadius: "10px",
          };

          return <div className="post-card__image" style={imageStyle}></div>;
        })} */}




      {/* </div> */}
    </div>
  )
}

export default ProductCard