import SearchIcon from '../../../../common/icons/search';
import './search-text-field-styles.css';

function SearchTextFieldTag({ placeholder, onChange, value, maxLength }) {
  return (
    <div id="search-text-field-label-container">
      <SearchIcon />
      <input type="text" value={value} onChange={onChange} maxLength={maxLength} placeholder={placeholder} />
    </div>
  );
}

export default SearchTextFieldTag;
