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

		firstName || (formErrors.firstName = 'firstName is required.');
		firstName.length > 1 || (formErrors.firstName = 'First name is required and must be at least 1 character.');
		firstName.length < 30 || (formErrors.firstName = 'First name is required and must be less than 30 characters.');
		lastName || (formErrors.lastName = 'lastName is required.');
		lastName.length > 1 || (formErrors.lastName = 'Last name is required and must be at least 1 character.');
		lastName.length < 30 || (formErrors.lastName = 'Last name is required and must be less than 30 characters.');
		email || (formErrors.email = 'email is required.');
		email.length < 30 || (formErrors.email = 'email is required and must be less than 50 characters.');
		password || (formErrors.password = 'password is required.');
		password.length < 225 || (formErrors.password = 'password is too long');
		confirmPassword || (formErrors.confirmPassword = 'confirmPassword is required.');
		password === confirmPassword || (formErrors.confirmPassword = 'passwords do not match');
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
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<p className='errors form__errors'>{errors.validations}</p>

				<label>
					First Name
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</label>
				<p className='errors form__errors'>{errors.firstName}</p>

				<label>
					Last Name
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</label>
				<p className='errors form__errors'>{errors.lastName}</p>

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

				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</label>
				<p className='errors form__errors'>{errors.confirmPassword}</p>

				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;