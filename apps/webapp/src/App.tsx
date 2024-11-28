import { Flip, ToastContainer } from 'react-toastify';
import { UseRoutes } from './hooks/UseRoutes';
import { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routes = UseRoutes();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div onContextMenu={handleContextMenu} className="select-none">
      <div>{routes}</div>
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
