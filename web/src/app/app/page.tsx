import { Centered } from '@/components/centered';
import HomeNavbar from '@/components/home-navbar';
import UserLikedSongs from '@/components/liked-songs';
import LoadingSpinner from '@/components/loading-spinner';
import { lazy, Suspense } from 'react';

const RecentlyPlaySongs = lazy(
  () => import('@/components/recently-plays-songs'),
);
const MoreAuditionsSongs = lazy(
  () => import('@/components/more-auidtions-songs'),
);
const TopSongsByLikes = lazy(() => import('@/components/top-songs-by-likes'));

async function AppPage() {
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
        <div className="mt-5">
          <RecentlyPlaySongs />
        </div>

        <div className="block xl:flex mt-10 gap-4 justify-center w-full">
          <div className="xl:w-[50%]  overflow-hidden">
            <TopSongsByLikes />
          </div>
          <div className="xl:w-[50%]  overflow-hidden">
            <MoreAuditionsSongs />
          </div>
        </div>
        <div className="py-10">
          <UserLikedSongs />
        </div>
      </Suspense>
    </div>
  );
}

export default AppPage;
