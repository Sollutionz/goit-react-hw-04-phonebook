import React from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';
import { ContactForm } from './contactForm/ContactForm';
import './App.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleInputChange = e => {
    // console.log(e)
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.addNewContact(this.state);
    // this.reset();
  };

  reset = () => {
    this.setState({
      contacts: [],
      name: '',
    });
  };

  onChangeFilter = ({ currentTarget: { value } }) => {
    this.setState({ filter: value });
  };

  addNewContact = data => {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    if (
      this.state.contacts.some(
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

      this.setState(prev => ({
        contacts: [...prev.contacts, newContact],
      }));
    }
  };

  getFiltered = () => {
    const Normalize = this.state.filter;
    const Contacts = this.state.contacts;
    const Normalized = Normalize.toLowerCase();
    return Contacts.filter(contact =>
      contact.name.toLowerCase().includes(Normalized)
    );
  };

  deleteContact = contactId => {
    localStorage.removeItem(contactId);
    this.setState(prev => ({
      contacts: prev.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  componentDidMount() {
    this.localStorageCheck();
  }
  localStorageCheck = () => {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const savedCont = localStorage.getItem(key);
        const parsedCont = JSON.parse(savedCont);
        if (
          this.state.contacts.some(
            contact =>
              contact.name.toLowerCase().trim() ===
              parsedCont.name.toLowerCase().trim()
          )
        ) {
          return;
        } else {
          this.setState(prev => ({
            contacts: [...prev.contacts, parsedCont],
          }));
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const filter = this.state.filter;
    const filteredContacts = this.getFiltered();
    return (
      <>
        <ContactForm addNewContact={this.addNewContact} />

        <div className="container">
          <Filter filter={filter} onChange={this.onChangeFilter} />
          <ContactList
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
