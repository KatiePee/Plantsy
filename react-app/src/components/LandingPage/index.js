import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { allProductsThunk } from '../../store/products'
import { myWishlistThunk } from '../../store/wishlist';
import ProductCard from '../Products/ProductCard'

import './LandingPage.css'

const LandingPage = () => {
  const productsState = useSelector((state => state.products.allProducts))
  const user = useSelector(state => state.session.user)
  const scroll = useRef()
  const products = productsState ? Object.values(productsState) : [];
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(allProductsThunk())
      await dispatch(myWishlistThunk())
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])

  const handleScroll = () => {
    if (scroll.current) {
      scroll.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };


  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className='landing-page__image-wrapper'>
        {/* <img src='https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_411/at%2Fart%2Fdesign%2F2021-02%2FGreendigs-plants%2Fzoom%20backgrounds%2Fzoombackground-2' /> */}
        {/* <img className='landing-page__image' src='https://cdn.discordapp.com/attachments/1106274559671418943/1119406195577458698/87767e8ef4bb3d828cc1382a8cd9485b.png' /> */}
        <h1>Welcome, {user ? user.firstName : 'to Plantsy'}</h1>
        <button className='landing-page__shop-button' onClick={handleScroll}>Shop Now</button>
      </div>
      <div ref={scroll} className='landing-page__products'>
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default LandingPage