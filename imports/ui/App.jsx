import React, { Fragment, useState } from 'react';
import { Contact } from './Contact.jsx';
import { ContactForm } from './ContactForm.jsx';
import { useTracker } from 'meteor/react-meteor-data';
import { ContactCollection } from '/imports/db/ContactCollection';
import { LoginForm } from './LoginForm';

const toggleChecked = ({ _id, isChecked }) => 
	Meteor.call('contacts.setIsChecked', _id, !isChecked);

const deleteContact = ({ _id }) => Meteor.call('contacts.remove', _id);

  

export const App = () => {
	const user = useTracker(() => Meteor.user());
	const [hideCompleted, setHideCompleted] = useState(false);
	const hideCompletedFilter = { isChecked: { $ne: true} };
	const logout = () => Meteor.logout();

	const userFilter = user ? { userId: user._id } : {};

	const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

	const { contacts, pendingContactsCount, isLoading } = useTracker(() => {
		const noDataAvailable = { contacts: [], pendingContactsCount: 0 };
		if (!Meteor.user()) {
		  return noDataAvailable;
		}
		const handler = Meteor.subscribe('tasks');
	
		if (!handler.ready()) {
		  return { ...noDataAvailable, isLoading: true };
		}
	
		const contacts = ContactCollection.find(
		  hideCompleted ? pendingOnlyFilter : userFilter,
		  {
			sort: { createdAt: -1 },
		  }
		).fetch();
		const pendingContactsCount = ContactCollection.find(pendingOnlyFilter).count();
	
		return { contacts, pendingContactsCount };
	  });

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
				{user ? (
					<Fragment>
						<div className="user" onClick={logout}>
							{user.username} 🚪
						</div>
						<ContactForm user = { user }/>
						<div className="filter">
							<button onClick = {() => setHideCompleted(!hideCompleted)}>
								{ hideCompleted ? 'Show All' : 'Hide Completed'}
							</button>
						</div>
						{isLoading && <div className="loading">loading...</div>}
						<ul className = "contact">
							<li className = "row">
								<span className = "col-md-2">Name</span>
								<span className = "col-md-4">Telefonnummer</span>
								<span className = "col-md-3">Wohnort</span>
								<span className = "col-md-3">Aktionen</span>
							</li>
							{ contacts.map(contact => 
								<Contact 
									key = { contact._id } 
									contact = { contact }
									onCheckboxClick = { toggleChecked }
									onDeleteClick = { deleteContact }
								/>) }
						</ul>
					</Fragment>
				) : (
					<LoginForm />
				)}
			</div>
		</div>
	)
};
