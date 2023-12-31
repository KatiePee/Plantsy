import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { useHistory } from 'react-router-dom'
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const history = useHistory()

	let formErrors = {}

	const _handelErrors = () => {
		const regex = /^\s+/g
		setFirstName(firstName.replace(regex, ''))
		setLastName(lastName.replace(regex, ''))

		regex.test(firstName) && (formErrors.firstName = 'first name is required.');
		regex.test(lastName) && (formErrors.lastName = 'last name is required.');
		firstName || (formErrors.firstName = 'first name is required.');
		firstName.length > 0 || (formErrors.firstName = 'First name must be at least 1 character.');
		firstName.length < 30 || (formErrors.firstName = 'First name must be less than 30 characters.');
		lastName || (formErrors.lastName = 'last name is required.');
		lastName.length > 0 || (formErrors.lastName = 'Last name must be at least 1 character.');
		lastName.length < 30 || (formErrors.lastName = 'Last name must be less than 30 characters.');
		email || (formErrors.email = 'email is required.');
		email.length < 30 || (formErrors.email = 'email is required and must be less than 50 characters.');
		password || (formErrors.password = 'password is required.');
		password.length < 225 || (formErrors.password = 'password is too long');
		password === confirmPassword || (formErrors.confirmPassword = 'passwords do not match');

		const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValidEmail = validEmail.test(email);

		isValidEmail || (formErrors.email = 'please enter a valid email')


		setErrors(formErrors)

	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		_handelErrors()

		if (!Object.values(formErrors).length) {
			const data = await dispatch(signUp(firstName, lastName, email, password));
			if (data) {
				formErrors.validations = data
				setErrors({ ...formErrors })
			} else {
				history.push('/')
				closeModal();
			}
		}
	};

	return (
		<div className="modal-form__wrapper">
			<div className="modal-form__header">
				<h2>Sign Up</h2>
			</div>
			<form onSubmit={handleSubmit} className="modal-form__form">
				<p className='errors form__errors'>{errors.validations}</p>
				<div className="input-wrapper">
					<label>
						First Name:
						<input
							type="text"
							value={firstName}
							className="input-info"
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</label>
					<p className='errors form__errors'>{errors.firstName}</p>
				</div>

				<div className="input-wrapper">
					<label>
						Last Name:
						<input
							type="text"
							value={lastName}
							className="input-info"
							onChange={(e) => setLastName(e.target.value)}
						/>
					</label>
					<p className='errors form__errors'>{errors.lastName}</p>
				</div>

				<div className="input-wrapper">
					<label>
						Email:
						<input
							type="text"
							value={email}
							className="input-info"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</label>
					<p className='errors form__errors'>{errors.email}</p>
				</div>

				<div className="input-wrapper">
					<label>
						Password:
						<input
							type="password"
							value={password}
							className="input-info"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
					<p className='errors form__errors'>{errors.password}</p>
				</div>

				<div className="input-wrapper">
					<label>
						Confirm Password:
						<input
							type="password"
							value={confirmPassword}
							className="input-info"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</label>
					<p className='errors form__errors'>{errors.confirmPassword}</p>
				</div >
				<button type="submit" className="form-button signup-button">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;