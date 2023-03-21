import './button-styles.css';

function button({ name, onclick, type = 'button', disabled }) {
  return (
    <button id='register-button' type={type} disabled={disabled} onClick={onclick}>{name}</button>
  );
}

export default button;
