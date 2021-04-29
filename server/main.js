import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ContactCollection } from '/imports/db/ContactCollection';
import '/imports/api/contactMethods';

const insertContact = (contactName, user) =>
  ContactCollection.insert({
    name: contactName,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password'; 

Meteor.startup(() => {
	if (!Accounts.findUserByUsername(SEED_USERNAME)) {
		Accounts.createUser({
			username: SEED_USERNAME,
			password: SEED_PASSWORD,
			});
		}
	
	const user = Accounts.findUserByUsername(SEED_USERNAME);

	if (ContactCollection.find().count() === 0) {
		[
			'Luffy',
			'Kaneki',
			'Asuna',
			'Eren',
			'Kirito',
			'Law',
			'Ace'
			].forEach(contactName => insertContact(contactName, user));
		}
});