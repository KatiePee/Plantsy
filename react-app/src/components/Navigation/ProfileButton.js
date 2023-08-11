import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom";
import { loadCartThunk } from "../../store/cart";
import { useModal } from '../../context/Modal';


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const cart = useSelector(state => state.cart)
  const { setModalContent, setOnModalClose } = useModal();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(loadCartThunk())
  };

  const redirectUserProfile = (e) => {
    e.preventDefault();
    history.push(`/users/${user.id}`)
  }
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div onClick={openMenu} className="user-nav-button">
        <i class="fa-regular fa-user icon" />
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li onClick={redirectUserProfile}><i class="fa-solid fa-user"></i> {user.firstName}</li>
              <li onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out </li>
            </>
          ) : (
            <> <li onClick={() => setModalContent(<LoginFormModal />)}><i class="fa-solid fa-arrow-right-to-bracket"></i> Log In</li>
              <li onClick={() => setModalContent(<SignupFormModal />)}><i class="fa-solid fa-user-plus"></i>  Sign Up</li>
              {/* <OpenModalButton
                buttonText='Log In'
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              /> */}
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
