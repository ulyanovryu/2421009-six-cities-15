import {Helmet} from 'react-helmet-async';

import {NavLink} from 'react-router-dom';

import {DEFAULT_CITY} from '../../const.ts';
import {FormEvent, useRef} from 'react';
import {loginAction} from '../../store/thunks/api.ts';
import {useAppDispatch} from '../../hooks';

function LoginScreen (): JSX.Element {

  const defaultCityParams = DEFAULT_CITY;

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return (

    <main className="page__main page__main--login">
      <Helmet>
        <title>Авторизация</title>
      </Helmet>

      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                ref={loginRef}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
                ref={passwordRef}
              />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <NavLink to={`/${defaultCityParams.id}`} className={'locations__item-link'}>
              <span>{defaultCityParams.name}</span>
            </NavLink>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;
