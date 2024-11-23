import UserLikedSongs from '@/components/liked-songs';
import { Suspense } from 'react';

function LikedPage() {
  return (
    <div>
      <Suspense>
        <UserLikedSongs variant="card" limit={50} />
      </Suspense>
    </div>
  );
}

export default LikedPage;
