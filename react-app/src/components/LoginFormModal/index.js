import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


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
    <div className="modal-form__wrapper">
      <div className="modal-form__header">
        <h2>Log In</h2>
      </div>
      <form onSubmit={handleSubmit} className="modal-form__form">
        <p className='errors form__errors'>{errors.validations}</p>
        <div className="input-wrapper">
          <label htmlFor='email'>
            Email:
          </label>
          <input
            type="text"
            name='email'
            value={email}
            className="input-info"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className='errors form__errors'>{errors.email}</p>
        </div>
        <div className="input-wrapper">
          <label htmlFor='password'>
            Password:
          </label>
          <input
            type="password"
            name='password'
            value={password}
            className="input-info"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className='errors form__errors'>{errors.password}</p>
        </div>

        <button type="submit" onClick={handleSubmit} className="form-button login-button">Log In</button>
        <button onClick={demoUser} className="form-button signup-button">Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
