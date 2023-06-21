import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { singleProductsThunk } from "../../store/products"
import OpenModalButton from "../OpenModalButton"
import EditProductModal from "./EditProductModal"
import DeleteProductModal from "./DeleteProductModal"
import { productReviewsThunk } from "../../store/reviews"
import ReviewCard from "../Reviews/ReviewCard"
import CreateReviewModal from "../Reviews/CreateReviewModal"
import LoginFormModal from "../LoginFormModal"
import StarRatings from 'react-star-ratings';

import './Products.css'

const ProductDetail = () => {
  const { productId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.singleProduct)
  const reviewsState = useSelector(state => state.reviews.product)
  const user = useSelector(state => state.session.user)
  const reviews = reviewsState ? Object.values(reviewsState) : [];

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

  console.log('🤑~🤑~🤑~🤑~🤑~🤑~🤑~ has left review~~', hasLeftReview)

  const { id, title, description, price, userId, productImages, createdAt, numReviews, avgRating } = product

  //TODO: set up preview image
  const image = productImages[0]
  const arr = [1, 2, 3, 4, 5]

  return (
    <>
      <div className="product-detail__wrapper">

        <div className="product-detail__main">

          <div className="product-detail__images">

            <div className="prodct-detail__side-images">
              {arr.map(img => (
                <img className="product-detail__image-side" src={image.imageUrl} />
              ))}
            </div >
            <div className="product-detail__preview">

              <div className="product-detail__left-arrow icons">
                <i class="fa-solid fa-arrow-left"></i>
              </div>

              <img className="product-detail__preview-image" src={image.imageUrl} />

              <div className="product-detail__left-arrow icons">
                <i class="fa-solid fa-arrow-right"></i>
              </div>

              <div className='product-detail__wishlist icons'>
                {/* <i class="fa-solid fa-heart"></i> */}
                <i class="fa-regular fa-heart"></i>
              </div>
            </div>

          </div>

          <div className="product-detail__info">
            <h2 className="product-detail__price">$ {price}</h2>
            <p className="product-detail__title">{title}</p>
            <h3 className="product-detail__desc-header">Description:</h3>
            <p className="product-detail__description">{description}</p>
            <button className="product-detail__cart">Add to cart</button>
          </div>

        </div>

        <div className="product-detail__reviews-wrapper">
          {!isOwner && !hasLeftReview && (
            <OpenModalButton
              buttonText="Post Your Review"
              modalComponent={user ? <CreateReviewModal props={{ product, user }} /> : <LoginFormModal />}
            />
          )}

          <h3>Reviews </h3>
          <div className='product-detail__avg-rating'>
            <StarRatings
              rating={avgRating}
              starRatedColor="#ffd700"
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
          </div>
          <div className="product-detail__reviews">
            {reviews.map(review => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </div>
        </div>
      </div>
      {isOwner && (
        <div>
          <OpenModalButton
            buttonText="Edit product"
            // onItemClick={closeMenu}
            modalComponent={<EditProductModal product={product} />}
          />
          <OpenModalButton
            buttonText="Delete product"
            // onItemClick={closeMenu}
            modalComponent={<DeleteProductModal product={product} />}
          />
        </div>
      )}
    </>
  )
}

export default ProductDetail