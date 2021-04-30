import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const submit = e => {
		e.preventDefault();

		Meteor.loginWithPassword(username, password);
		};

	return (
		<div className = "panel panel-default styled-panel">
			<form onSubmit={submit} className="login-form">
				<div className="form-group">
					<label htmlFor = "username">Username</label>
					<input
					type="text"
					id = "username"
					placeholder="Username"
					name="username"
					required
					onChange={e => setUsername(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<label htmlFor = "password">Password</label>
					<input
					type="password"
					id = "password"
					placeholder="Password"
					name="password"
					required
					onChange={e => setPassword(e.target.value)}
					/>
				</div>

				<button type="submit" className = "btn btn-primary">Log In</button>
			</form>
		</div>
		);
	};