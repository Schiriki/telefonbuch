import React, { useState } from 'react';

export const ContactForm = () => {
	const [name, setName] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

		if (!name) return;

		Meteor.call('contacts.insert', name);

		setName("");
	};  

	return (
		<form className="contact-form" onSubmit = { handleSubmit }>
			<input
				type="text"
				placeholder="Type to add new contacts"
				value = { name }
				onChange = {(e) => setName(e.target.value)}
				/>

			<button type="submit">Add Contact</button>
		</form>
		);
};