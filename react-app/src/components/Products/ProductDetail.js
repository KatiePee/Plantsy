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

  const { id, title, description, price, userId, productImages, createdAt, numReviews, avgRating } = product

  //TODO: set up preview image
  const image = productImages[0]
  const arr = [1, 2, 3, 4, 5]

  return (
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
          <p className="product-detail__price">$ {price}</p>
          <p className="product-detail__title">{title}</p>
          <p className="product-detail__description">$ {description}</p>
          <button>Add to cart</button>
        </div>

      </div>

      <div className="product-detail__reviews-wrapper">
        <OpenModalButton
          buttonText="Post Your Review"
          modalComponent={<CreateReviewModal props={{ product, user }} />}
        />
        <p className='product-detail__num-reviews'>{numReviews} reviews</p>
        <p className='product-detail__avg-rating'>{avgRating} stars</p>
        <div className="product-detail__reviews">

        </div>
        {reviews.map(review => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>

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
  )
}

export default ProductDetail