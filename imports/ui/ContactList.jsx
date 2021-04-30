import React, { useState } from 'react';
import { AddContactForm } from './AddContactForm.jsx';
import { Contact } from './Contact.jsx';

const deleteContact = ({ _id }) => Meteor.call('contacts.remove', _id);

export const ContactList = (contacts) => {
    const [searchTerm, setSearchTerm] = useState("");
    const contactsArray = contacts.contacts;

	return (
        <div>
            <AddContactForm />
            <input type="text" className = "search" placeholder="Search..." onChange = {event => {setSearchTerm(event.target.value)}}/>
            <ul className = "contact">
                { contactsArray.filter((val) => {
                    if(searchTerm == ""){
                        return val;
                    }else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) 
                        || val.number.toLowerCase().includes(searchTerm.toLowerCase()) 
                        || val.city.toLowerCase().includes(searchTerm.toLowerCase())){
                        
                            return val;
                        }
                }).map(contact => 
                    <Contact 
                        key = { contact._id } 
                        contact = { contact }
                        onDeleteClick = { deleteContact }
                    />) }
            </ul>
        </div>
		);
	};