import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/app/context/UserContext';
import { UseRequest } from '@/hooks/UseRequest';

import { Navbar } from '@/features/Navbar/Navbar';
import { TShowCase } from '@/types/song.types';
import { ShowCase } from '@/components/ShowCase';

export default function HomePage() {
  const { state } = useContext(UserContext);
  const { request } = UseRequest();
  const [songForYou, setSongForYou] = useState<TShowCase>({
    title: '',
    songs: [],
  });
  useEffect(() => {
    request('/song/top')
      .then((response) => {
        setSongForYou(response.data || { ...setSongForYou, songs: [] });
      })
      .catch(() => {
        setSongForYou({ ...songForYou, songs: [] });
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-3">
        {state.user && (
          <h1 className="text-xl">
            Welcome back, <span className="font-bold">{state.user?.email}</span>
          </h1>
        )}
        <div id="content">
          <ShowCase data={songForYou} />
        </div>
      </div>
    </>
  );
}
