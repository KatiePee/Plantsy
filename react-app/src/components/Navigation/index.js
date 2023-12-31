import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import { loadCartThunk } from '../../store/cart';
import CartPane from '../Cart/CartPane';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const cart = useSelector(state => state.cart)
	const user = useSelector(state => state.session.user)
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true);
	const [showCart, setShowCart] = useState({ visible: false })


	// console.log('🍎 navigation, cart . items', cart?.items)
	useEffect(() => {
		async function fetchData() {
			await dispatch(loadCartThunk())
			setIsLoading(false)
		}
		fetchData()
	}, [user])

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='header'>
			<div className='header__banner'><p>Welcome, {user ? user.firstName : 'to Plantsy'}</p></div>

			<nav className='nav-bar'>
				<NavLink className='nav-logo' exact to="/">🌿Plantsy</NavLink>
				<div className='nav-links'>
					<NavLink className='nav-links__links' to='/'>Shop All</NavLink>
					<NavLink className='nav-links__links' to='/'>About</NavLink>
					<NavLink className='nav-links__links' to='/products/new'>Sell on Plantsy</NavLink>
				</div>
				{isLoaded && (
					<div className='nav-bar-buttons'>
						<ProfileButton user={sessionUser} />
						<div className='nav-bar__cart' onClick={() => setShowCart({ visible: true })}>
							<i className="fa-solid fa-cart-shopping icon"></i>
							{cart && cart.items?.length > 0 && (<div className='cart_bubble'>{cart.items.length}</div>)}
						</div>

						<CartPane
							visible={showCart.visible}
							closePane={() => setShowCart({ visible: false })}
						/>
					</div>
				)}
			</nav>
		</div>
	);
}

export default Navigation;