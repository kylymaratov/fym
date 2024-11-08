import './App.css';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Navbar } from './components/Navbar/Navbar';
import { Navigation } from './components/Navigation/Navigation';
import { MusicPlayer } from './components/Player/Player';
import { UseLocation } from './hooks/UseLocation';
import { UseRoutes } from './hooks/UseRoutes';

function App() {
  const routes = UseRoutes();
  UseLocation();

  return (
    <div className="bg-primary fixed overflow-hidden w-full h-full text-white">
      <div className="grid grid-rows-layout grid-cols-1 h-full">
        <Navbar />
        <div className="flex overflow-hidden">
          <div className="w-auto h-full">
            <Navigation />
          </div>
          <div className="w-auto h-full">
            <Dashboard />
          </div>
          <div className="flex-grow overflow-y-auto">{routes}</div>
        </div>
        <MusicPlayer />
      </div>
    </div>
  );
}

export default App;
