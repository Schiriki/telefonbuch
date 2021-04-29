import React, { useState } from 'react';
import { Contact } from './Contact.jsx';
import { ContactForm } from './ContactForm.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { ContactCollection } from '/imports/api/ContactCollection';

const toggleChecked = ({ _id, isChecked }) => {
	ContactCollection.update(_id, {
		$set: {
			isChecked: !isChecked
			}
		})
	};

const deleteContact = ({ _id }) => ContactCollection.remove(_id);

  

export const App = () => {
	const [hideCompleted, setHideCompleted] = useState(false);
	const hideCompletedFilter = { isChecked: { $ne: true} };
	const contacts = useTracker(() => 
		ContactCollection.find(hideCompleted ? hideCompletedFilter : {}, {
			sort: {createdAt: -1},
			}).fetch());
	const pendingContactsCount = useTracker(() => 
		ContactCollection.find(hideCompletedFilter).count());
	const  pendingContactTitle = `${
		pendingContactsCount ? ` (${ pendingContactsCount })` : ''
	}`;

	return (
		<div className="app">
			<header>
				<div className="app-bar">
					<div className="app-header">
						<h1>Telefonbuch { pendingContactTitle }</h1>
					</div>
				</div>
			</header>

			<div className="main">
				<ContactForm />
				<div className="filter">
					<button onClick = {() => setHideCompleted(!hideCompleted)}>
						{ hideCompleted ? 'Show All' : 'Hide Completed'}
					</button>
				</div>
				<ul className = "contact">
					{ contacts.map(contact => 
						<Contact 
							key = { contact._id } 
							contact = { contact }
							onCheckboxClick = { toggleChecked }
							onDeleteClick = { deleteContact }
						/>) }
				</ul>
			</div>
		</div>
	)
};
