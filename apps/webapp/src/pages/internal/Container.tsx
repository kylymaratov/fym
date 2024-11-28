import { DataProvider } from '@/context/DataContext';
import { PlayerProvider } from '@/context/PlayerContext';
import { SearchProvider } from '@/context/SearchContext';
import MusicPlayer from '@/features/MusicPlayer';
import Navigatiion from '@/features/Navigation';
import { Outlet } from 'react-router-dom';

export const Container = () => {
  return (
    <DataProvider>
      <SearchProvider>
        <PlayerProvider>
          <div className="w-full m-auto h-screen overflow-hidden grid grid-cols-1 grid-rows-1 pl-1 pr-1">
            <div className="flex">
              <Navigatiion />
              <div className="flex-grow-1 ml-0 lg:ml-2 overflow-auto w-full lg:px-2 bg-secondary">
                <Outlet />
              </div>
            </div>
            <MusicPlayer />
          </div>
        </PlayerProvider>
      </SearchProvider>
    </DataProvider>
  );
};
