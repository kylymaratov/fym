import MusicPlayer from '@/features/AudioPlayer/MusicPlayer';
import { DynamicSection } from '@/features/DynamicSection/DynamicSection';
import { Navigation } from '@/features/Navigation/Navigation';

import { Outlet } from 'react-router-dom';

interface Props {}

export default function AppWrapper({}: Props) {
  return (
    <div className="fixed w-screen h-screen overflow-hidden grid grid-cols-1 grid-rows-1 pl-1 pr-1">
      <div className="flex">
        <Navigation />
        <div className="flex-grow-1 overflow-auto w-full">
          <Outlet />
        </div>
      </div>
      <MusicPlayer />
    </div>
  );
}
