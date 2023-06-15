import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { allProductsThunk } from '../../store/products'
import ProductCard from '../Products/ProductCard'

const LandingPage = () => {
  const productsState = useSelector((state => state.products.allProducts))
  const products = productsState ? Object.values(productsState) : [];
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(allProductsThunk())
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {products.map(product =>
        <p>{product.title}</p>)}

      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

export default LandingPage