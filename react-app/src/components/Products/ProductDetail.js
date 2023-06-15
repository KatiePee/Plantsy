import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { singleProductsThunk } from "../../store/products"
import OpenModalButton from "../OpenModalButton"
import EditProductModal from "./EditProductModal"

const ProductDetail = () => {
  const { productId } = useParams()
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.singleProduct)
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    async function fetchData() {
      await dispatch(singleProductsThunk(productId))
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>;

  const { id, title, description, price, userId, productImages, createdAt } = product

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
      <div className="product-detail__images">
        <img src={image.imageUrl} />
      </div>

      <div className="product-detail__info">
        <p className="product-detail__price">$ {price}</p>
        <p className="product-detail__title">{title}</p>
        <p className="product-detail__description">$ {description}</p>
        <button>Add to cart</button>
      </div>

      <div className="product-detail__reviews">
        Review Info
      </div>

    </div>
  )
}

export default ProductDetail