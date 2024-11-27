import { UseGetData } from '@/api/requests';
import { Centered } from '@/components/Centered';
import LoadingSpinner from '@/components/LoadingSpinner';
import ShowCase from '@/components/ShowCase';
import ShowTable from '@/components/ShowTable';
import { PlayerContext } from '@/context/PlayerContext';
import { Footer } from '@/features/Footer';
import HomeNavbar from '@/features/HomeNavbar';
import { ShowSongResponse } from '@/types/song.types';
import { useContext } from 'react';

export const HomePage = () => {
  const playerState = useContext(PlayerContext);
  const topSongsByLikes = UseGetData<ShowSongResponse>(
    'topSongsByLikes',
    '/song/top-by-likes?limit=20',
  );
  const topSongsByAuditions = UseGetData<ShowSongResponse>(
    'topSongsByAuditions',
    '/song/more-auditions?limit=20',
  );
  const recentlyPlaysSongs = UseGetData<ShowSongResponse>(
    'recentlyPlaysSongs',
    `/song/recently?limit=12&playNow=${playerState.state.playNow?.song_id}`,
  );
  const recomendationSongs = UseGetData<ShowSongResponse>(
    'recomendationSongs',
    '/user/song/recomend',
    true,
  );
  const userLikedSongs = UseGetData<ShowSongResponse>(
    'userLikedSongs',
    `/user/song/liked`,
    true,
  );

  const sections = [
    {
      href: '/recently',
      data: recentlyPlaysSongs,
    },
    {
      href: '/recomendations',
      data: recomendationSongs,
    },
    {
      href: '/top-by-likes',
      data: topSongsByLikes,
    },
    {
      href: '/top-auditions',
      data: topSongsByAuditions,
    },
    {
      href: '/liked',
      data: userLikedSongs,
      roundedFull: true,
    },
  ];

  return (
    <div>
      <HomeNavbar />
      <div>
        <div className="relative">
          {sections.map(
            (item, key) =>
              item.data.data && (
                <div key={key} className="my-8">
                  <ShowCase
                    data={item.data.data}
                    roundedFull={item.roundedFull}
                    toMore={item.href}
                  />
                </div>
              ),
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
