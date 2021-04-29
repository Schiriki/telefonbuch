import { Meteor } from 'meteor/meteor';
import { ContactCollection } from '/imports/api/ContactCollection';

const insertContact = contactName => ContactCollection.insert({ name: contactName });
 
Meteor.startup(() => {
  if (ContactCollection.find().count() === 0) {
    [
      'Luffy',
      'Kaneki',
      'Asuna',
      'Eren',
      'Kirito',
      'Law',
      'Ace'
    ].forEach(insertContact)
  }
});