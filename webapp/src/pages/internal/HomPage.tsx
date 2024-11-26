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
    '/song/top-by-likes?limit=5',
  );
  const topSongsByAuditions = UseGetData<ShowSongResponse>(
    'topSongsByAuditions',
    '/song/more-auditions?limit=5',
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

  return (
    <div>
      <HomeNavbar />
      <div>
        {recentlyPlaysSongs.data && (
          <div className="my-5">
            <ShowCase data={recentlyPlaysSongs.data} toMore="/recently" />
          </div>
        )}
        {recomendationSongs.data && (
          <div className="my-14">
            <ShowCase data={recomendationSongs.data} toMore="/recomendations" />
          </div>
        )}
        <div className="relative">
          {topSongsByLikes.loading ? (
            <Centered>
              <LoadingSpinner />
            </Centered>
          ) : (
            [topSongsByLikes, topSongsByAuditions].map(
              (item, key) =>
                item.data && (
                  <div key={key} className="my-10">
                    <ShowTable data={item.data} numeric />
                  </div>
                ),
            )
          )}
        </div>
        {userLikedSongs.data && (
          <div className="my-5">
            <ShowCase data={userLikedSongs.data} toMore="/liked" />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
