import React, { useState } from 'react';

export const AddContactForm = () => {
	const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [city, setCity] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

		if (!name) return;

		Meteor.call('contacts.insert', name, number, city);

		setName("");
        setNumber("");
        setCity("");
	};  

	return (
        <div className="panel panel-default styled-panel">
            <h4>Add a new Contact</h4>
            <form className="add-contact-form" onSubmit = { handleSubmit }>
                <div className="form-group add-element">
                    <label htmlFor = "contactName">Name:</label>
                    <input type="text" className = "form-control" id = "contactName" placeholder="name" value = {name} onChange = {(e) => setName(e.target.value)} />
                </div>
                <div className="form-group add-element">
                    <label htmlFor = "contactNumber">Number:</label>
                    <input type="text" className = "form-control" id = "contactNumber" placeholder="number" value = {number} onChange = {(e) => setNumber(e.target.value)}/>
                </div>
                <div className="form-group add-element">
                    <label htmlFor = "contactCity">City:</label>
                    <input type="text" className = "form-control" id = "contactCity" placeholder="city" value = {city} onChange = {(e) => setCity(e.target.value)}/>
                </div>
                <div className="form-group add-element">
                    <button type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
		);
};
