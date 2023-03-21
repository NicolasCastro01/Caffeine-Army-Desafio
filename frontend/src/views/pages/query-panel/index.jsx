import NavbarTag from "./components/navbar";
import SearchTextFieldTag from "./components/search-text-field";
import SearchButtonTag from "./components/search-button";
import WhiteArrowIcon from '../../common/icons/white-arrow';
import PurpleStoreIcon from '../../common/icons/purple-store';
import './query-panel-styles.css';
import AccordionTag from "./components/accordion";
import AccordionContentInfoTag from "./components/accordion/components/accordion-content";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { ShopkeeperController } from "../../../controllers/shopkeeper.controller";

function QueryPanel() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    searchValue: '',
    accessToken: '',
    shopkeeper: {},
    store: {}
  });
  const shopkeeperController = new ShopkeeperController();

  function handleState(key, value) {
    setState(prevState => ({ ...prevState, [key]: value }));
  }

  async function handleLoadStoreData() {
    const { searchValue, accessToken } = state;
    const response = await shopkeeperController.getStore(searchValue, accessToken);

    handleState('store', response);
  }

  function handleSearchButtonClick() {
    handleLoadStoreData();
  }

  function handleFormatCnpj(e) {
    let cnpjNumber = e.target.value.replace(/\D/g, '');
    cnpjNumber = cnpjNumber.substring(0, 14);
    cnpjNumber = cnpjNumber.replace(/^(\d{2})(\d)/, '$1.$2');
    cnpjNumber = cnpjNumber.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cnpjNumber = cnpjNumber.replace(/\.(\d{3})(\d)/, '.$1/$2');
    cnpjNumber = cnpjNumber.replace(/(\d{4})(\d)/, '$1-$2');

    handleState('searchValue', cnpjNumber);
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('at');
    const hasAccessToken = !!accessToken;

    if (!hasAccessToken) {
      alert('Usuário não autorizado.');
      navigate('/login');

      return;
    }

    const shopkeeper = localStorage.getItem('shopkeeper');
    const shopkeeperData = JSON.parse(shopkeeper);

    handleState('accessToken', accessToken);
    handleState('shopkeeper', { ...shopkeeperData });
  }, [navigate]);

  return (
    <div id="query-panel-screen">
      <NavbarTag />
      <main>
        <div id="search-container">
          <SearchTextFieldTag value={state.searchValue} onChange={handleFormatCnpj} placeholder='Digite um CNPJ' />
          <SearchButtonTag id='search-button-mobile' onClick={handleSearchButtonClick} text={<WhiteArrowIcon />} />
          <SearchButtonTag id='search-button-desktop' onClick={handleSearchButtonClick} text='Buscar Loja' />
        </div>

        <span id="divisor"></span>

        <section id='additional-information-section'>
          <div id="store-name-container">
            <span id="store-logo-container">
              <PurpleStoreIcon />
            </span>
            <p id="store-name">{state.store.fantasyName}<span id="corporate-name"> - {state.store.corporateReason}</span></p>
          </div>

          <p id="additional-information-title">Informações Adicionais</p>
        </section>

        <p id="additional-information-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>

        <section id="registration-data-section">
          <p id="registration-data-title">Dados Cadastrais</p>
        </section>

        <div id="registration-data-accordions-section">
          <AccordionTag title='Lojista'>
            <AccordionContentInfoTag
              title='Nome'
              value={state.shopkeeper.name}
            />
            <AccordionContentInfoTag
              title='E-mail'
              value={state.shopkeeper.email}
            />
            <AccordionContentInfoTag
              title='Telefone 1'
              value={state.shopkeeper.phone}
            />
            <AccordionContentInfoTag
              title='Telefone 2'
            />
          </AccordionTag>

          <AccordionTag title='Dados da loja'>
            <AccordionContentInfoTag
              title='CNPJ'
              value={state.store.cnpj}
            />
            <AccordionContentInfoTag
              title='Nome Fantasia'
              value={state.store.fantasyName}
            />
            <AccordionContentInfoTag
              title='Razão Social'
              value={state.store.corporateReason}
            />
            <AccordionContentInfoTag
              title='E-mail'
              value={state.store.email}
            />
            <AccordionContentInfoTag
              title='Telefone 1'
              value={state.store.phone}
            />
          </AccordionTag>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export default QueryPanel;
