import React from 'react';
import { Contact } from './Contact.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { ContactCollection } from '/imports/api/ContactCollection';

export const App = () => {
	const contacts = useTracker(() => ContactCollection.find({}).fetch());

	return (
		<div>
			<h1>Welcome to Meteor!</h1>

			<ul>
				{ contacts.map(contact => 
					<Contact 
						key = { contact._id } 
						contact = { contact }
					/>) }
			</ul>
		</div>
	)
};
