import React, { useState } from 'react';
import { ContactCollection } from '/imports/api/ContactCollection';

export const ContactForm = () => {
	const [name, setName] = useState("");

	const handleSubmit = e => {
	e.preventDefault();

	if (!name) return;

	ContactCollection.insert({
		name: name.trim(),
		createdAt: new Date()
		});

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