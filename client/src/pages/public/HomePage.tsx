import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/app/context/UserContext';
import { UseRequest } from '@/hooks/UseRequest';

import { Navbar } from '@/features/Navbar/Navbar';
import { TShowCase } from '@/types/song.types';
import { ShowCase } from '@/components/ShowCase';

export default function HomePage() {
  const { state } = useContext(UserContext);
  const { request } = UseRequest();
  const [songForYou, setSongForYou] = useState<TShowCase | null>(null);
  const [topSongs, setTopSongs] = useState<TShowCase | null>(null);
  const [moreAuditions, setMoreAuditions] = useState<TShowCase | null>(null);

  const getSongForYou = async () => {
    if (songForYou && songForYou.songs.length) return;
    try {
      const response = await request('/song/top');

      setSongForYou(response.data || null);
    } catch {
      setSongForYou(null);
    }
  };

  const getTopSongs = async () => {
    if (topSongs && topSongs.songs.length) return;
    try {
      const response = await request('/song/top-by-likes');

      setTopSongs(response.data || null);
    } catch {
      setTopSongs(null);
    }
  };

  const getMoreAuidions = async () => {
    if (moreAuditions && moreAuditions.songs.length) return;
    try {
      const response = await request('/song/more-auditions');

      setMoreAuditions(response.data || null);
    } catch {
      setMoreAuditions(null);
    }
  };

  useEffect(() => {
    if (state.user) {
      getSongForYou();
    } else {
      getTopSongs();
      getMoreAuidions();
    }
  }, [state.user]);

  return (
    <>
      <Navbar />
      <div className="p-2">
        {state.user ? (
          <div>
            <h1 className="text-xl">
              Welcome back,{' '}
              <span className="font-bold">{state.user?.email}</span>
            </h1>
            <div id="content">
              <ShowCase data={songForYou} />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div className="mt-10">
                <ShowCase data={topSongs} />
              </div>
              <div className="mt-10">
                <ShowCase data={moreAuditions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
