import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar'>
			<NavLink className='nav-logo' exact to="/">🌿Plantsy</NavLink>
			{isLoaded && (
				<div className='nav-bar-buttons'>
					<i class="fa-solid fa-cart-shopping"></i>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;