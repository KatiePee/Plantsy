import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { singleProductsThunk } from "../../store/products"
import OpenModalButton from "../OpenModalButton"
import EditProductModal from "./EditProductModal"
import DeleteProductModal from "./DeleteProductModal"
import { productReviewsThunk } from "../../store/reviews"
import { addToWishlistThunk } from '../../store/wishlist'
import { removeFromWishlistThunk } from '../../store/wishlist'
import ReviewCard from "../Reviews/ReviewCard"
import CreateReviewModal from "../Reviews/CreateReviewModal"
import LoginFormModal from "../LoginFormModal"
import StarRatings from 'react-star-ratings';
import { useModal } from '../../context/Modal';
import { addToCartThunk } from "../../store/cart"

import './Products.css'
import CartPane from "../Cart/CartPane"

const ProductDetail = () => {
  const { productId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0)
  const [showCart, setShowCart] = useState({ visible: false })
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.singleProduct)
  const reviewsState = useSelector(state => state.reviews.product)
  const user = useSelector(state => state.session.user)
  const wishlist = useSelector(state => state.wishlist)
  const reviews = reviewsState ? Object.values(reviewsState) : [];
  const { setModalContent, setOnModalClose } = useModal();

  useEffect(() => {
    async function fetchData() {
      await dispatch(singleProductsThunk(productId))
      await dispatch(productReviewsThunk(productId))
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>;

  const isOwner = user ? product.id === user.id : false;
  const hasLeftReview = user ? reviews.some(review => review.userId === user.id) : false;

  const { id, title, description, price, userId, productImages, createdAt, numReviews, avgRating } = product

  //TODO: set up preview image
  const image = productImages[0]
  const arr = [1, 2, 3, 4, 5]

  const inWishlist = product.id in wishlist
  const handleWishlist = async (e) => {
    if (!user) {
      return setModalContent(<LoginFormModal />);
    }
    const data = inWishlist ? await dispatch(removeFromWishlistThunk(product)) : await dispatch(addToWishlistThunk(product))
  }

  const handleIndex = (i) => {
    setIndex(i)
  }

  const handleDown = () => {
    index === 0 ? setIndex(productImages.length - 1) : setIndex(index - 1)
  }
  const handleUp = () => {
    index === productImages.length - 1 ? setIndex(0) : setIndex(index + 1)
  }

  const addToCart = async () => {
    if (!user) {
      return setModalContent(<LoginFormModal />);
    }
    await dispatch(addToCartThunk(product.id, 1))
    await setShowCart({ visible: true })
    // dispatch(addToCartThunk(product.id, 1)).then(() => setShowCart(true))
  }

  return (
    <>
      <div className="product-detail__wrapper">

        {/* <div className="product-detail__main"> */}

        <div className="product-detail__images">

          <div className="prodct-detail__side-images">
            {productImages.map((img, i) => (
              <img className="product-detail__image-side" src={img.imageUrl} onClick={() => handleIndex(i)} />
            ))}
          </div >



          <div className="product-detail__preview">
            <div className="product-detail__left-arrow icons" onClick={handleDown}>
              <i class="fa-solid fa-arrow-left"></i>
            </div>

            <img className="product-detail__preview-image" src={productImages[index].imageUrl} />

            <div className="product-detail__left-arrow icons" onClick={handleUp}>
              <i class="fa-solid fa-arrow-right"></i>
            </div>

            <div className={`product-detail__wishlist icons ${inWishlist ? 'filled-heart' : 'empty-heart'}`} onClick={handleWishlist}>
              {inWishlist ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}
            </div>
          </div>
        </div>




        <div className="product-detail__info">
          <h2 className="product-detail__price">$ {price}</h2>
          <p className="product-detail__title">{title}</p>
          <h3 className="product-detail__desc-header">Description:</h3>
          <p className="product-detail__description">{description}</p>
          {/* <button className="product-detail__cart" onClick={() => alert('feature coming soon')}>Add to cart</button> */}
          <button className="product-detail__cart" onClick={addToCart}>Add to cart</button>
          {/* {showCart && (<CartPane visible={showCart} />)} */}
          <CartPane
            visible={showCart.visible}
            closePane={() => setShowCart({ visible: false })}
          />

        </div>



        <div className="product-detail__reviews-wrapper">

          <h3>Reviews </h3>
          <div className='product-detail__avg-rating'>
            <StarRatings
              rating={avgRating}
              starRatedColor="var(--color-gold)"
              starSpacing='2px'
              svgIconPath="M63.893,24.277c-0.238-0.711-0.854-1.229-1.595-1.343l-19.674-3.006L33.809,1.15
  C33.479,0.448,32.773,0,31.998,0s-1.48,0.448-1.811,1.15l-8.815,18.778L1.698,22.935c-0.741,0.113-1.356,0.632-1.595,1.343
  c-0.238,0.71-0.059,1.494,0.465,2.031l14.294,14.657L11.484,61.67c-0.124,0.756,0.195,1.517,0.822,1.957
  c0.344,0.243,0.747,0.366,1.151,0.366c0.332,0,0.666-0.084,0.968-0.25l17.572-9.719l17.572,9.719c0.302,0.166,0.636,0.25,0.968,0.25
  c0.404,0,0.808-0.123,1.151-0.366c0.627-0.44,0.946-1.201,0.822-1.957l-3.378-20.704l14.294-14.657
  C63.951,25.771,64.131,24.987,63.893,24.277z"
              svgIconViewBox='0 0 64 64'
              numberOfStars={5}
              starDimension='15px'
              name="rating"
            /> <span className='product-detail__num-reviews'> ({numReviews})</span>
            {!isOwner && !hasLeftReview && (
              <OpenModalButton
                buttonText="Post Your Review"
                modalComponent={user ? <CreateReviewModal props={{ product, user }} /> : <LoginFormModal />}
              />
            )}
          </div>

          <div className="product-detail__reviews">
            {reviews.map(review => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </div>
        </div>

      </div>

    </>
  )

}

export default ProductDetail