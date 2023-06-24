import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export const ContactForm = ({ addNewContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = e => {
    if (e.currentTarget.name === 'name') {
      setName(e.currentTarget.value);
    } else setNumber(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addNewContact(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h1 className={css.title}>Phonebook</h1>

      <div className={css.container}>
        <p className={css.inputTitle}>Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleInputChange}
          className={css.input}
        />
      </div>

      <div className={css.container}>
        <p className={css.inputTitle}>Number</p>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleInputChange}
          className={css.input}
        />
      </div>
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  addNewContact: PropTypes.func.isRequired,
};
