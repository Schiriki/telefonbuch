import { check } from 'meteor/check';
import { ContactCollection } from '../db/ContactCollection';
 
Meteor.methods({
  'contacts.insert'(name, number, city) {
    check(name, String);
    check(number, String);
    check(city, String);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
 
    ContactCollection.insert({
      name,
      number,
      city,
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

  'contacts.update'(id,name, number, city) {
    check(name, String);
    check(number, String);
    check(city, String);
 
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
 
    ContactCollection.update({ _id: id },{$set: 
      { name: name, 
        number: number, 
        city: city}})
  },
 
});