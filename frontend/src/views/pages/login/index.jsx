import CoffesImageMob from '../../../assets/img/mob_login_background@2x.png';
import CoffesImageDesk from '../../../assets/img/desk_login_background@2x.png';
import Logo from '../../../assets/img/marca lojistas.svg';
import './login-styles.css';
import { ButtonTag } from './components/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ShopkeeperController } from '../../../controllers/shopkeeper.controller';

export default function Login() {
  const navigate = useNavigate();
  const validateCredentials = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('O campo e-mail é obrigatório.'),
    password: yup.string().required('O campo senha é obrigatório.')
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validateCredentials)
  });
  const shopkeeperController = new ShopkeeperController();

  async function authenticateUser({ email, password }) {
    const shopkeeper = await shopkeeperController.authenticate({ email, password });
    const hasShopkeeper = !!shopkeeper;

    if (!hasShopkeeper) {
      alert('Conta não existe ou as credenciais estão incorretas!');
      return;
    }

    const shopkeeperObject = {
      name: shopkeeper.name,
      email: shopkeeper.email,
      phone: shopkeeper.phone
    };
    const shopkeeperData = JSON.stringify(shopkeeperObject);

    localStorage.setItem('at', shopkeeper.access_token);
    localStorage.setItem('shopkeeper', shopkeeperData);

    navigate('/consult');
  }

  return (
    <div id='login-screen'>
      <img src={CoffesImageMob} id='coffe-image-mob' alt={CoffesImageMob.length} />
      <img src={CoffesImageDesk} id='coffe-image-desk' alt={CoffesImageDesk.length} />

      <section id='login-section'>
        <img id='logo' src={Logo} alt={Logo.length} />

        <p id='text-info'>Acesse com seu e-mail e senha abaixo</p>

        <form onSubmit={handleSubmit(authenticateUser)}>
          <div id="inputs-container">
            <div id="text-field-label-container">
              <label htmlFor='text-field-email'>Seu e-mail</label>
              <input name='email' type='text' id='text-field-email' placeholder='Digite o seu e-mail' {...register('email')} />
              <span id='helper-text'>{errors.email?.message}</span>
            </div>

            <div id="text-field-label-container">
              <label htmlFor='text-field-password'>Senha</label>
              <input name='password' type='password' id='text-field-password' placeholder='Digite a sua senha' {...register('password')} />
              <span id='helper-text'>{errors.password?.message}</span>
            </div>
          </div>

          <ButtonTag type='submit' name='Entrar' />
        </form>

        <Link id='account-redirect' to='/cadastro'>Não possui uma conta? clique aqui</Link>

        <footer>
          <span>© 2021 Caffeine Army. CNPJ: 27.403.527/0001-13<br />Endereço: Rua Rubens Guelli, 68, Itaigara, Salvador - BA, 41815-135 E-mail: contato@caffeinearmy.com.br | Telefone: +55 11 91106-4910</span>
        </footer>
      </section>

    </div>
  );
}
