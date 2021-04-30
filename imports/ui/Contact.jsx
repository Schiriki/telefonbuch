import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

export const Contact = ({ contact, onDeleteClick }) => {
	return (
		<li className = "panel panel-default">
			<div className="row entry-row">
				<span className = "col-md-2 col-sm-3">{contact.name}</span>
				<span className = "col-md-4 col-sm-3">{contact.number}</span>
				<span className = "col-md-3 col-sm-6">{contact.city}</span>
				<span className = "col-md-3 col-sm-12 contact-button">
					<button className = "btn btn-primary" 
						onClick = { () => FlowRouter.go('/edit?_id='+ contact._id +'&name='+ contact.name +'&number='+ contact.number +'&city=' + contact.city)}>
							Edit</button>
					<button className = "btn btn-danger" onClick = { () => onDeleteClick(contact) }>Delete</button>
					</span>
			</div>
		</li>
		);
	};