import { Flip, ToastContainer } from 'react-toastify';
import { UseRoutes } from './hooks/UseRoutes';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routes = UseRoutes();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div>
      {routes}
      <ToastContainer
        position="bottom-right"
        closeOnClick
        hideProgressBar
        theme="dark"
        transition={Flip}
      />
    </div>
  );
}

export default App;
