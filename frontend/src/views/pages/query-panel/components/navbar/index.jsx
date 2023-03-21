import LogoTag from '../../../../common/icons/logo';
import PinkStoreIcon from '../../../../common/icons/pink-shop';
import ExitIcon from '../../../../common/icons/exit';
import './navbar-styles.css';
import { useNavigate } from 'react-router-dom';

function NavbarTag() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <nav id='navbar'>
      <LogoTag id='logo-mobile' />
      <LogoTag id='logo-desktop' width='248' height='16' />
      <div id="navbar-action">
        <div id="navbar-action-item">
          <PinkStoreIcon />
          <p id="navbar-action-item-name">Loja</p>
        </div>

        <div id="navbar-action-item" onClick={handleLogout}>
          <ExitIcon fill="#fb637e" />
          <p id="navbar-action-item-name">Sair</p>
        </div>
      </div>
    </nav>
  );
}

export default NavbarTag;
