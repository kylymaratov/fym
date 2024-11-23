import { Centered } from '@/components/centered';
import HomeNavbar from '@/components/home-navbar';
import UserLikedSongs from '@/components/liked-songs';
import LoadingSpinner from '@/components/loading-spinner';
import RecomendSongs from '@/components/recomend-songs';
import { lazy, LazyExoticComponent, ReactNode, Suspense, useMemo } from 'react';

const RecentlyPlaySongs = lazy(
  () => import('@/components/recently-plays-songs'),
);
const MoreAuditionsSongs = lazy(
  () => import('@/components/more-auidtions-songs'),
);
const TopSongsByLikes = lazy(() => import('@/components/top-songs-by-likes'));

interface Components {
  limit?: number;
  variant: 'case' | 'card';
  component: any;
}

async function AppPage() {
  const components: Components[] = useMemo(
    () => [
      {
        limit: 12,
        variant: 'case',
        component: RecentlyPlaySongs,
      },
      {
        variant: 'case',
        component: RecomendSongs,
      },

      {
        variant: 'card',
        component: TopSongsByLikes,
      },
      {
        variant: 'card',
        component: MoreAuditionsSongs,
      },
      {
        variant: 'case',
        component: UserLikedSongs,
      },
    ],
    [],
  );

  return (
    <div className="relative w-full h-full">
      <Suspense
        fallback={
          <Centered>
            <LoadingSpinner />
          </Centered>
        }
      >
        <HomeNavbar />
        <div>
          {components.map((item) => (
            <div className="my-10 md:my-14">
              <item.component variant={item.variant} limit={item.limit} />
            </div>
          ))}
        </div>
      </Suspense>
    </div>
  );
}

export default AppPage;
