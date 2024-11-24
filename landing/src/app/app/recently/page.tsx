import RecentlyPlaySongs from '@/components/recently-plays-songs';
import { Suspense } from 'react';

function RecentlyPage() {
  return (
    <div>
      <Suspense>
        <RecentlyPlaySongs variant="card" />
      </Suspense>
    </div>
  );
}

export default RecentlyPage;
