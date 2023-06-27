import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToWishlistThunk } from '../../store/wishlist'
import { removeFromWishlistThunk } from '../../store/wishlist'
import { useModal } from '../../context/Modal';
import LoginFormModal from "../LoginFormModal"

import './Products.css'
const ProductCard = ({ product }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { setModalContent, setOnModalClose } = useModal();
  const wishlist = useSelector(state => state.wishlist)
  const user = useSelector(state => state.session.user)

  const { id, title, description, price, userId, productImages, createdAt, numReviews, avgRating } = product

  //TODO: set up preview image
  const image = productImages[0]
  console.log('🤡~~~~~~~~~~~ id, image url~~~~~~~~~~', id, image?.imageUrl)
  const handleClick = () => {
    history.push(`/products/${id}`)
  }
  const inWishlist = product.id in wishlist

  const handleWishlist = async (e) => {
    if (!user) {
      setModalContent(<LoginFormModal />);
    }
    const data = inWishlist ? await dispatch(removeFromWishlistThunk(product)) : await dispatch(addToWishlistThunk(product))
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

    <div className='product-card__wrapper' >

      <div className='product-card' onClick={handleClick} style={imageStyle}>
        <span className='product-card__price'>
          <p>$ {price}</p>
        </span>
      </div>

      <div className={`product-card__wishlist ${inWishlist ? 'filled-heart' : 'empty-heart'}`} onClick={handleWishlist}>
        {inWishlist ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}
      </div>

    </div>
  )
}

export default ProductCard