import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { allProductsThunk } from '../../store/products'
import ProductCard from '../Products/ProductCard'
import './LandingPage.css'

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
      <div className='landing-page__image-wrapper'>
        {/* <img src='https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_411/at%2Fart%2Fdesign%2F2021-02%2FGreendigs-plants%2Fzoom%20backgrounds%2Fzoombackground-2' /> */}
        {/* <img className='landing-page__image' src='https://cdn.discordapp.com/attachments/1106274559671418943/1119406195577458698/87767e8ef4bb3d828cc1382a8cd9485b.png' /> */}
        <h1>somthing about plants... shop now...?</h1>
        <div className='landing-page__products'>
          {products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LandingPage