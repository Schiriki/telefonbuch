import { Meteor } from 'meteor/meteor';
import { ContactCollection } from '/imports/db/ContactCollection';

Meteor.publish('contacts', function publishContacts() {
  return ContactCollection.find({ userId: this.userId });
});