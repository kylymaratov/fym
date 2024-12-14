import { useGetRelatedSongsQuery } from '@/api/song.api';
import { Centered } from '@/components/Centered';
import LoadingSpinner from '@/components/LoadingSpinner';
import ViewTable from '@/components/ViewTable';
import { useLocation, useParams } from 'react-router-dom';

export const SongPage = () => {
  const params = useParams();
  const location = useLocation();
  const fromLocationData = location.state?.relatedSongs;
  const { data } = useGetRelatedSongsQuery(`?song_id=${params.songId || ''}`, {
    skip: !!fromLocationData,
  });

  const relatedSongs = fromLocationData || data;

  return (
    <div className="relative w-full h-full">
      {relatedSongs ? (
        <ViewTable data={relatedSongs} bySong />
      ) : (
        <Centered>
          <LoadingSpinner />
        </Centered>
      )}
    </div>
  );
};
