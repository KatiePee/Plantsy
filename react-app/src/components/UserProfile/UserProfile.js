import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import EditProductModal from '../Products/EditProductModal';
import DeleteProductModal from '../Products/DeleteProductModal';
import OpenModalButton from '../OpenModalButton';
import { myWishlistThunk } from '../../store/wishlist';
import './UserProfile.css'

export default function UserProfile() {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const wishlistState = useSelector(state => state.wishlist)
  const [nav, setNav] = useState('products')
  const [isLoading, setIsLoading] = useState(true);
  const wishlist = wishlistState ? Object.values(wishlistState) : [];
  console.log('💩~~💩~~💩~~💩~~💩~~~~~~~~~~~wishlist ', wishlist)

  useEffect(() => {
    async function fetchData() {
      await dispatch(myWishlistThunk())
      setIsLoading(false)
    }
    fetchData()
  }, [dispatch])

  if (!user) {
    return <Redirect to='/' />
  }

  if (isLoading) return <div>Loading...</div>;

  const products = user.Products

  return (
    // <h1>user profile page!</h1>
    <div className='user-profile__wrapper'>

      <div className="user-profile__header">
        <div>Welcome, {user.firstName}</div>
        <nav className='user-profile__nav-bar'>
          <h3 className={`user-profile__nav-buttons ${nav === 'products' && 'active'}`} onClick={() => setNav('products')}>My Products</h3>
          <h3 className={`user-profile__nav-buttons ${nav === 'wishlist' && 'active'}`} onClick={() => setNav('wishlist')}>My Wishlist</h3>
          <h3 className={`user-profile__nav-buttons ${nav === 'orders' && 'active'}`} onClick={() => setNav('orders')}>My Orders</h3>
        </nav>
      </div>

      <NavLink className='user-profile__new-product' to='/products/new'>List a new product</NavLink>
      <div className='user-profile__body'>
        {nav === 'products' && (
          products.map(product => (

            <div className='user-profile__products-cards'>
              <ProductCard product={product} key={product.id} />
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

          ))
        )}
        {nav === 'wishlist' && (
          wishlist.map(product => (
            <ProductCard product={product} key={product.id} />
          ))
        )}
      </div>


    </div>
  )
}