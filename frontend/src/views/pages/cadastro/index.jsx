import CoffesImageMob from '../../../assets/img/mob_login_background@2x.png';
import CoffesImageDesk from '../../../assets/img/desk_login_background@2x.png';
import Logo from '../../../assets/img/marca lojistas.svg';
import './cadastro-styles.css';
import { ButtonTag } from './components/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ShopkeeperController } from '../../../controllers/shopkeeper.controller';
import { useState } from 'react';

export default function Cadastro() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    phoneInput: '',
    disabled: false
  });
  const validateCredentials = yup.object().shape({
    name: yup.string().required('O campo nome é obrigatório'),
    password: yup.string().required('O campo senha é obrigatório.'),
    phone: yup.string()
      .required('Telefone é obrigatório'),
    email: yup.string()
      .email('E-mail inválido')
      .required('O campo e-mail é obrigatório.'),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validateCredentials)
  });
  const shopkeeperController = new ShopkeeperController();

  function handleState(key, value) {
    setState(prevState => ({ ...prevState, [key]: value }));
  }

  async function registerShopkeeper(data) {
    try {
      handleState('disabled', true);
      const shopkeeper = await shopkeeperController.register(data);
      console.log(shopkeeper);
      navigate('/login');
    } catch (error) {
      alert('Ocorreu um erro ao cadastrar lojista.');
    } finally {
      handleState('disabled', false);
    }
  }

  function handleFormatPhone(e) {
    let phoneNumber = e.target.value.replace(/\D/g, '');
    phoneNumber = phoneNumber.substring(0, 11);
    phoneNumber = phoneNumber.replace(/^(\d{2})(\d{1})(\d)/g, '($1) $2 $3');
    phoneNumber = phoneNumber.replace(/(\d)(\d{4})$/, '$1-$2');

    handleState('phoneInput', phoneNumber);
  }

  return (
    <div id='register-screen'>
      <img src={CoffesImageMob} id='coffe-image-mob' alt={CoffesImageMob.length} />
      <img src={CoffesImageDesk} id='coffe-image-desk' alt={CoffesImageDesk.length} />

      <section id='register-section'>
        <img id='logo' src={Logo} alt={Logo.length} />

        <p id='text-info'>Para cadastrar, complete o formulário abaixo</p>

        <form onSubmit={handleSubmit(registerShopkeeper)}>
          <div id="inputs-container">
            <div id="text-field-label-container">
              <label htmlFor='text-field-name'>Nome completo</label>
              <input name='name' type='text' id='text-field-name' placeholder='Digite o seu nome completo' {...register('name')} />
              <span id='helper-text'>{errors.name?.message}</span>
            </div>

            <div id="text-field-label-container">
              <label htmlFor='text-field-email'>Seu e-mail</label>
              <input name='email' type='text' id='text-field-email' placeholder='Digite o seu e-mail' {...register('email')} />
              <span id='helper-text'>{errors.email?.message}</span>
            </div>
            <div id="text-field-label-container">
              <label htmlFor='text-field-phone'>Seu telefone</label>
              <input name='phone' type='text' value={state.phoneInput} onInput={handleFormatPhone} id='text-field-phone' {...register('phone')} />
              <span id='helper-text'>{errors.phone?.message}</span>
            </div>

            <div id="text-field-label-container">
              <label htmlFor='text-field-password'>Senha</label>
              <input name='password' type='password' id='text-field-password' placeholder='Digite a sua senha' {...register('password')} />
              <span id='helper-text'>{errors.password?.message}</span>
            </div>
          </div>

          <ButtonTag type='submit' name='Cadastrar' disabled={state.disabled} />
        </form>

        <Link id='account-redirect' to='/login'>Já possui uma conta? clique aqui</Link>

      </section>

    </div>
  );
}
