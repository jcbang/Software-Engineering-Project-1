import React, { Component } from 'react';
import axios from 'axios';
import logo from '../images/logo.jpg';

class RegisterBox extends Component {
	state = {
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
		errors: [],
		pwdStrength: null
	};

	showValidationErr = (elm, msg) => {
		this.setState(prevState => ({
			errors: [...prevState.errors, { elm, msg }]
		}));
	};

	clearValidationErr = elm => {
		this.setState(prevState => {
			let newArr = [];

			for (let err of prevState.errors) {
				if (elm != err.elm) {
					newArr.push(err);
				}
			}

			return { errors: newArr };
		});
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
		this.clearValidationErr(e.target.name);

		if (e.target.name == 'password') {
			this.setState({ pwdStrength: 'weak' });
			if (e.target.value.length > 6) {
				this.setState({ pwdStrength: 'medium' });
			}
			if (e.target.value.length > 12) {
				this.setState({ pwdStrength: 'strong' });
			}
		}
	};

	submitRegister = e => {
		let registerSuccess = true;
		const { email, firstName, lastName, password, confirmPassword } = this.state;

		if (email == '') {
			this.showValidationErr('email', 'Please enter an email.');
			registerSuccess = false;
		}
		if (firstName == '') {
			this.showValidationErr('firstName', 'Please enter your first name.');
			registerSuccess = false;
		}
		if (lastName == '') {
			this.showValidationErr('lastName', 'Please enter your last name.');
			registerSuccess = false;
		}
		if (password == '') {
			this.showValidationErr('password', 'Please enter a password.');
			registerSuccess = false;
		}
		if (confirmPassword == '') {
			this.showValidationErr('confirmPassword', 'Please confirm your password.');
			registerSuccess = false;
		} else if (confirmPassword !== password) {
			this.showValidationErr('confirmPassword', 'Passwords do not match.');
			registerSuccess = false;
		}

		if (registerSuccess) {
			const userInfo = {
				username: this.state.email,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				password: this.state.password
			};

			axios
				.post('api/user/register', userInfo)
				.then(res =>
					alert(
						res.data.success
							? 'Registered! :)'
							: 'Registration failed. :(\n' + res.data.message
					)
				);
		}
	};

	render() {
		let emailErr = null,
			firstNameError = null,
			lastNameError = null,
			passwordErr = null,
			confirmPasswordErr = null;

		for (let err of this.state.errors) {
			if (err.elm == 'email') {
				emailErr = err.msg;
			}
			if (err.elm == 'firstName') {
				firstNameError = err.msg;
			}
			if (err.elm == 'lastName') {
				lastNameError = err.msg;
			}
			if (err.elm == 'password') {
				passwordErr = err.msg;
			}
			if (err.elm == 'confirmPassword') {
				confirmPasswordErr = err.msg;
			}
		}

		let pwdWeak = false,
			pwdMedium = false,
			pwdStrong = false;

		switch (this.state.pwdStrength) {
			case 'strong':
				pwdStrong = true;
			case 'medium':
				pwdMedium = true;
			case 'weak':
				pwdWeak = true;
		}

		return (
			<div className='inner-container'>
				<img src={logo} className='logo-img' alt='logo'></img>

				<div className='header'>Register</div>

				<div className='input-group'>
					<label htmlFor='username'>First Name</label>
					<input
						type='text'
						name='firstName'
						className='login-input'
						placeholder='First Name'
						onChange={this.onChange}
					/>
					<small className='danger-error'>{firstNameError ? firstNameError : ''}</small>
				</div>

				<div className='input-group'>
					<label htmlFor='username'>Last Name</label>
					<input
						type='text'
						name='lastName'
						className='login-input'
						placeholder='Last Name'
						onChange={this.onChange}
					/>
					<small className='danger-error'>{lastNameError ? lastNameError : ''}</small>
				</div>

				<div className='box'>
					<div className='input-group'>
						<label htmlFor='username'>Email</label>
						<input
							type='text'
							name='email'
							className='login-input'
							placeholder='Email'
							onChange={this.onChange}
						/>
						<small className='danger-error'>{emailErr ? emailErr : ''}</small>
					</div>

					<div className='input-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							className='login-input'
							placeholder='Password'
							onChange={this.onChange}
						/>
						<small className='danger-error'>{passwordErr ? passwordErr : ''}</small>

						{this.state.password && (
							<div className='password-state'>
								<div className={'pwd pwd-weak ' + (pwdWeak ? 'show' : '')}></div>
								<div className={'pwd pwd-medium ' + (pwdMedium ? 'show' : '')}></div>
								<div className={'pwd pwd-strong ' + (pwdStrong ? 'show' : '')}></div>
							</div>
						)}
					</div>

					<div className='input-group'>
						<label htmlFor='password'>Confirm Password</label>
						<input
							type='password'
							name='confirmPassword'
							className='login-input'
							placeholder='Confirm Password'
							onChange={this.onChange}
						/>
						<small className='danger-error'>
							{confirmPasswordErr ? confirmPasswordErr : ''}
						</small>
					</div>

					<button type='button' className='login-btn' onClick={this.submitRegister}>
						Register
					</button>
				</div>
			</div>
		);
	}
}

export default RegisterBox;
