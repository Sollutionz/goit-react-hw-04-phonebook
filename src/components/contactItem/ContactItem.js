import PropTypes from 'prop-types';
import css from './ContactsItem.module.css'

export const ContactItem = ({ name, number, id, deleteContact }) => {
  return (
    <>
      <span className={css.item}>
        {name}: {number}
      </span>
      <button className={css.deleteButton} type="button" onClick={() => deleteContact(id)}>
        Delete
      </button>
    </>
  );
};

ContactItem.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    deleteContact: PropTypes.func.isRequired
}
