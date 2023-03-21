import './search-button-styles.css';

function SearchButtonTag({ id, text, disabled, onClick }) {
  return (
    <button id={id} className="search-button" onClick={onClick} disabled={disabled}>{text}</button>
  );
}

export default SearchButtonTag;
