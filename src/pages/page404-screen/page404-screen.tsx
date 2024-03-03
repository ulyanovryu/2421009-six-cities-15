import {Link} from 'react-router-dom';

export default function Page404Screen() {
  return (
    <main className="page__main">
      <div className="container">
        <h1>Ошибка 404. Страница не существует.</h1>
        <p><Link to='/'>Вернуться на главную </Link></p>
      </div>
    </main>
  );
}
