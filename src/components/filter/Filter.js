import PropTypes from "prop-types";
import css from './Filter.module.css'
export const Filter = ({filter, onChange})=> {
    return (
      <>
        <h2 className={css.title}>Contacts</h2>
        <p className={css.descrip}>Find contacts by name</p>
        <input
          className={css.input}
          type="text"
          name="filter"
          onChange={onChange}
          value={filter}
        />
      </>
    );
    
}
 
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}
 
 