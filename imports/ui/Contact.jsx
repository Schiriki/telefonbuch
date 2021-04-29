import React from 'react';
 
export const Contact = ({ contact, onCheckboxClick, onDeleteClick }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!contact.isChecked}
        onClick={() => onCheckboxClick(contact)}
        readOnly
      />
      <span>{contact.name}</span>
      <button onClick = { () => onDeleteClick(contact) }>&times;</button>
    </li>
  );
};