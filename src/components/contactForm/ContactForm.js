import React from "react";
import PropTypes from 'prop-types';
import css from './ContactForm.module.css'

export class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    // console.log(e)
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  handleSubmit = e => {
    const {addNewContact} = this.props
    e.preventDefault();
    addNewContact(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

 

  render() {

    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <h1 className={css.title}>Phonebook</h1>
        <div className={css.container}>
          {' '}
          <p className={css.inputTitle}>Name</p>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={this.handleInputChange}
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
            value={this.state.number}
            onChange={this.handleInputChange}
            className={css.input}
          />
        </div>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addNewContact: PropTypes.func.isRequired
}