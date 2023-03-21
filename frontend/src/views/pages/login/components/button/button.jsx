import './button-styles.css';

function button({ name, onclick, type = 'button' }) {
  return (
    <button id='login-button' type={type} onClick={onclick}>{name}</button>
  );
}

export default button;
