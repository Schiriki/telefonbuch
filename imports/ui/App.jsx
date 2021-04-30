import React, { Fragment, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ContactCollection } from '/imports/db/ContactCollection';
import { LoginForm } from './LoginForm';
import { ContactList } from './ContactList.jsx';

export const App = () => {
	const user = useTracker(() => Meteor.user());
	const logout = () => Meteor.logout();
	const userFilter = user ? { userId: user._id } : {};

	// make sure that just the Contacts of the user are loaded
	const { contacts, isLoading } = useTracker(() => {
		const noDataAvailable = { contacts: [], pendingContactsCount: 0 };
		if (!Meteor.user()) {
		  return noDataAvailable;
		}
		const handler = Meteor.subscribe('contacts');
	
		if (!handler.ready()) {
		  return { ...noDataAvailable, isLoading: true };
		}
	
		const contacts = ContactCollection.find(
			userFilter,
			{
				sort: { createdAt: -1 },
			}
		).fetch();
	
		return { contacts};
	  });

	return (
		<div className="main">
			{user ? (
				<Fragment>
					<div className="user" onClick={logout}>
						<h2>Welcome {user.username} 🚪</h2>
					</div>
					<div id="content">
						{isLoading && <div className="loading">loading...</div>}
						<ContactList contacts = {contacts}/>
					</div>
				</Fragment>
			) : (
				<LoginForm />
			)}
		</div>

	)
};
