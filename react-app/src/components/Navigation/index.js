import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const cart = useSelector(state => state.cart)


	return (
		<div className='nav-bar'>
			<NavLink className='nav-logo' exact to="/">🌿Plantsy</NavLink>
			{isLoaded && (
				<div className='nav-bar-buttons'>
					<ProfileButton user={sessionUser} />
					<div className='nav-bar__cart' onClick={() => alert('feature coming soon')}>
						<i className="fa-solid fa-cart-shopping"></i>
						<div className='cart_bubble'>{cart.items.length}</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;