import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ContactCollection } from '/imports/db/ContactCollection';
import '/imports/api/contactMethods';
import '/imports/api/contactsPublications';

const insertContact = (contactName, contactNumber, contactCity, user) =>
  ContactCollection.insert({
    name: contactName,
	number: contactNumber,
	city: contactCity,
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
		const basicData = [
			['Luffy', '01705558967', 'Foosha Village'],
			['Kirito', '01703452965', 'Tokyo'],
			['Asuna', '01504457728', 'Kyoto'],
			['Eren', '01503989765', 'Shiganshina'],
			['Kaneki', '01704047078', 'Tokyo'],
			['Law', '01506667799', 'Flevance'],
			['Ace', '01705556389', 'Baterilla']
		].forEach(contacts =>{
			let contactName = contacts[0];
			let contactNumber = contacts[1];
			let contactCity = contacts[2];
	
			insertContact(contactName, contactNumber, contactCity, user);
		});
		}
});