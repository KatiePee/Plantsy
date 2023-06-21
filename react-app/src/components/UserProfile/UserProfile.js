import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useState } from 'react';
import ProductCard from '../Products/ProductCard';
import './UserProfile.css'

export default function UserProfile() {
  const user = useSelector(state => state.session.user)
  const products = user.Products
  const [nav, setNav] = useState('products')
  console.log('🤡~~~🤡~~~🤡~~~🤡~~~ products ', products)
  return (
    // <h1>user profile page!</h1>
    <div className='user-profile__wrapper'>

      <div className="user-profile__header">
        <div>Welcome, {user.firstName}</div>
        <nav className='user-profile__nav-bar'>
          <h3 onClick={() => setNav('products')}>My Products</h3>
          <h3 onClick={() => setNav('orders')}>My Orders</h3>
          <h3 onClick={() => setNav('wishlist')}>My Wishlist</h3>
        </nav>
      </div>

      <div className='user-profile__body'>
        <NavLink to='/products/new'>List a new product</NavLink>
        {nav === 'products' && (
          products.map(product => (
            <ProductCard product={product} key={product.id} />
          ))
        )
        }
        {nav === 'products' && <h1>TEST</h1>}
      </div>


    </div>
  )
}