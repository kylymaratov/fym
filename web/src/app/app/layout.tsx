import type { Metadata } from 'next';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import MusicPlayer from '@/components/music-player';
import Navigatiion from '@/components/navigation';
import { PlayerProvider } from '@/context/player-context';

export const metadata: Metadata = {
  title: 'Songfiy application',
  description: 'Generated by create next app',
};

export default async function AppLaylout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PlayerProvider>
      <div className="w-full m-auto h-screen overflow-hidden grid grid-cols-1 grid-rows-1 pl-1 pr-1">
        <div className="flex p-0 lg:p-7">
          <Navigatiion />
          <div className="flex-grow-1 overflow-auto w-full px-[10px] lg:px-[29px]">
            {children}
          </div>
        </div>
        <MusicPlayer />
      </div>
    </PlayerProvider>
  );
}
