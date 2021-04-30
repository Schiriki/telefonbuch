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
 
    const contact = ContactCollection.findOne({ _id: contactId, userId: this.userId });

    if (!contact) {
      throw new Meteor.Error('Access denied.');
    }

    ContactCollection.remove(contactId);
  },
 
  'contacts.setIsChecked'(contactId, isChecked) {
    check(contactId, String);
    check(isChecked, Boolean);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const contact = ContactCollection.findOne({ _id: contactId, userId: this.userId });

    if (!contact) {
      throw new Meteor.Error('Access denied.');
    }
 
    ContactCollection.update(contactId, {
      $set: {
        isChecked
      }
    });
  }
});