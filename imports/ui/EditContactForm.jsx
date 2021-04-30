import React, {Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { FlowRouter } from 'meteor/kadira:flow-router';

export const EditContactForm = (data) => {
	const [name, setName] = useState(data.data.name);
    const [number, setNumber] = useState(data.data.number);
    const [city, setCity] = useState(data.data.city);
	const user = useTracker(() => Meteor.user());
	const id = data.data._id;
	const logout = () => Meteor.logout();

	const handleSubmit = e => {
		e.preventDefault();

		if (!name) return;

		Meteor.call('contacts.update', id, name, number, city);

		setName("");
        setNumber("");
        setCity("");
		FlowRouter.go('root');
	};  

	return (
		<div className="main">
		{user ? (
			<Fragment>
				<div className="user" onClick={logout}>
					<h2>Welcome {user.username} 🚪</h2>
				</div>
				<div className = "content">
					<form onSubmit = { handleSubmit }>
						<div className="form-group">
							<label htmlFor = "contactName">Name:</label>
							<input type="text" className = "form-control" id = "contactName" placeholder="name" value = {name} onChange = {(e) => setName(e.target.value)} />
						</div>
						<div className="form-group">
							<label htmlFor = "contactNumber">Number:</label>
							<input type="text" className = "form-control" id = "contactNumber" placeholder="number" value = {number} onChange = {(e) => setNumber(e.target.value)}/>
						</div>
						<div className="form-group">
							<label htmlFor = "contactCity">City:</label>
							<input type="text" className = "form-control" id = "contactCity" placeholder="city" value = {city} onChange = {(e) => setCity(e.target.value)}/>
						</div>

						<div className = "edit-buttons">
							<button type="submit" className = "btn btn-warning" onClick = { () => FlowRouter.go("root") }>Abort</button>
							<button type="submit" className = "btn btn-success">Save</button>
						</div>
					</form>
				</div>
			</Fragment>
		) : (
			<LoginForm />
		)}
	</div>
		);
};