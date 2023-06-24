import React, { createContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';
import { ContactForm } from './contactForm/ContactForm';
import './App.css';
export const Context = createContext();

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const onChangeFilter = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  const addNewContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim()
      )
    ) {
      alert(`Contact ${newContact.name} is already exists!`);
      return;
    } else {
      try {
        const contact = JSON.stringify(newContact);
        localStorage.setItem(newContact.id, contact);
      } catch (error) {
        console.log(error);
      }

      setContacts(prev => [...prev, newContact]);
    }
  };

  const getFiltered = () => {
    const normalized = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalized));
  };

  const deleteContact = contactId => {
    localStorage.removeItem(contactId);
    setContacts(prev => prev.filter(({ id }) => id !== contactId));
  };

  useEffect(() => {
    localStorageCheck();
  });

  const localStorageCheck = () => {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const savedCont = localStorage.getItem(key);
        const parsedCont = JSON.parse(savedCont);
        if (
          contacts.some(
            contact =>
              contact.name.toLowerCase().trim() ===
              parsedCont.name.toLowerCase().trim()
          )
        ) {
          return;
        } else {
          setContacts(prev => [...prev, parsedCont]);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const filteredContacts = getFiltered();

  return (
    <>
      <Context.Provider value={deleteContact}>
        <ContactForm addNewContact={addNewContact} />
        <div className="container">
          <Filter filter={filter} onChange={onChangeFilter} />
          <ContactList
            contacts={filteredContacts}
            deleteContact={deleteContact}
          />
        </div>
      </Context.Provider>
    </>
  );
};

export default App;
