import ViewCase from '@/components/ViewCase';
import { Footer } from '@/features/Footer';
import HomeNavbar from '@/features/HomeNavbar';
import { useMemo } from 'react';
import {
  useGetRecentlySongsQuery,
  useGetRecomendationSongsQuery,
  useGetTopSongsByLikesQuery,
  useGetTopSongsByListeningQuery,
  useGetUserLikedSongsQuery,
} from '@/api/song.api';
import { useAppSelector } from '@/store/hooks';

export const HomePage = () => {
  const { user } = useAppSelector((state) => state.user);
  const topSongsByLikes = useGetTopSongsByLikesQuery('?limit=15');
  const topSongsByAuditions = useGetTopSongsByListeningQuery('?limit=15');
  const recentlySongs = useGetRecentlySongsQuery('?limit=10');
  const recomendationSongs = useGetRecomendationSongsQuery('?limit=15', {
    skip: !user,
  });
  const userLikedSongs = useGetUserLikedSongsQuery('?limit=10', {
    skip: !user,
  });

  const sections = useMemo(
    () => [
      {
        href: '/recently',
        data: recentlySongs,
      },
      {
        href: '/recomendations',
        data: recomendationSongs,
        rounded: 'rounded-full',
      },
      {
        href: '/top-by-likes',
        data: topSongsByLikes,
      },
      {
        href: '/top-listening',
        data: topSongsByAuditions,
      },
      {
        href: '/liked',
        data: userLikedSongs,
        rounded: 'rounded-full',
      },
    ],
    [
      topSongsByLikes.data,
      topSongsByAuditions.data,
      recentlySongs.data,
      recomendationSongs.data,
      userLikedSongs.data,
    ],
  );

  return (
    <div>
      <HomeNavbar />
      <div>
        <div className="relative">
          {sections.map(
            (item, key) =>
              item.data.data && (
                <div key={key} className="my-14">
                  <ViewCase
                    data={item.data.data}
                    rounded={item.rounded as 'rounded-full'}
                    more={item.href}
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
