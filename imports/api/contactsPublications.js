import { Meteor } from 'meteor/meteor';
import { ContactCollection } from '/imports/db/ContactCollection';

Meteor.publish('tasks', function publishTasks() {
  return ContactCollection.find({ userId: this.userId });
});