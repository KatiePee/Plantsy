import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { myWishlistThunk } from "../../store/wishlist";
import { disable } from "express/lib/application";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const formErrors = {}

  const _handleErrors = () => {
    email || (formErrors.email = 'email is required');
    password || (formErrors.password = 'password is required')
    setErrors(formErrors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    _handleErrors();

    if (!Object.values(formErrors).length) {
      const data = await dispatch(login(email, password))

      if (data) {
        formErrors.validations = 'invalid credentials'
        setErrors({ ...formErrors });
        return
      } else {
        closeModal()

      }
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
    closeModal()
  }

  return (
    <>
      <h1>Log In test!!</h1>
      <form onSubmit={handleSubmit}>
        <p className="errors">
          <p className='errors form__errors'>{errors.validations}</p>
        </p>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
        </label>
        <p className='errors form__errors'>{errors.email}</p>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}

          />
        </label>
        <p className='errors form__errors'>{errors.password}</p>
        <button type="submit" onClick={handleSubmit} >Log In</button>
      </form>
      <button onClick={demoUser}>Demo User</button>
    </>
  );
}

export default LoginFormModal;
