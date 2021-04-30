import React from 'react';

export const Contact = ({ contact, onCheckboxClick, onDeleteClick }) => {
	return (
		<li className = "row">
			<span className = "col-md-2">{contact.name}</span>
			<span className = "col-md-4">{contact.number}</span>
			<span className = "col-md-3">{contact.city}</span>
			<span className = "col-md-3">
				<button className = "btn btn-primary" onClick = { () => onDeleteClick(contact) }>&times;</button>
				<button className = "btn btn-danger" onClick = { () => onDeleteClick(contact) }>&times;</button>
				</span>
		</li>
		);
	};