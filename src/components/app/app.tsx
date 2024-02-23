import MainScreen from '../../pages/main-screen/main-screen.tsx';

type AppProps = {
  offersCount: number;
}

function App({offersCount}: AppProps): JSX.Element {
  return (
    <MainScreen offersCount={offersCount}/>
  );
}

export default App;
