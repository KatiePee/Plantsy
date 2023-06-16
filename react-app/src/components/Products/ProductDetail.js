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

const ProductDetail = () => {
  const { productId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.singleProduct)
  const reviewsState = useSelector(state => state.reviews.product)
  const user = useSelector(state => state.session.user)
  const reviews = reviewsState ? Object.values(reviewsState) : [];
  console.log('👺~~~👺~~~👺~~~👺~~~👺~~~👺~~~ review card review', reviews)

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


  console.log('🤡~~🤡~~🤡~~🤡~~~~~ product detail page')
  return (
    <div className="product-detail__wrapper">
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
      <div className="product-detail__images">
        <img src={image.imageUrl} />
      </div>

      <div className="product-detail__info">
        <p className="product-detail__price">$ {price}</p>
        <p className="product-detail__title">{title}</p>
        <p className="product-detail__description">$ {description}</p>
        <button>Add to cart</button>
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

    </div>
  )
}

export default ProductDetail