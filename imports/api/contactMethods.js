import { check } from 'meteor/check';
import { ContactCollection } from '../db/ContactCollection';
 
Meteor.methods({
  'contacts.insert'(name) {
    check(name, String);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
 
    ContactCollection.insert({
      name,
      createdAt: new Date,
      userId: this.userId,
    })
  },
 
  'contacts.remove'(contactId) {
    check(contactId, String);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
 
    ContactCollection.remove(contactId);
  },
 
  'contacts.setIsChecked'(contactId, isChecked) {
    check(contactId, String);
    check(isChecked, Boolean);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
 
    ContactCollection.update(contactId, {
      $set: {
        isChecked
      }
    });
  }
});