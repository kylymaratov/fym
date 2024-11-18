import { useContext } from 'react';
import './App.css';
import { UseAppRoutes } from './hooks/UseRoutes';
import { UseTheme } from './hooks/UseTheme';
import { Flip, ToastContainer } from 'react-toastify';
import { AppContext } from './app/context/AppContext';
import { UseAuth } from './hooks/UseAuth';
import { Loading } from './components/Loading';
import { Centered } from './components/Centered';

function App() {
  UseTheme();

  const routes = UseAppRoutes();

  const { appLoaded } = UseAuth();
  const { state } = useContext(AppContext);

  return (
    <main>
      {appLoaded ? (
        <>
          <div>{routes}</div>
          <ToastContainer
            position="bottom-right"
            theme={state.theme}
            hideProgressBar
            newestOnTop
            draggable={false}
            pauseOnHover
            transition={Flip}
          />
        </>
      ) : (
        <Centered>
          <Loading />
        </Centered>
      )}
    </main>
  );
}

export default App;
