import { TShowCase } from '@/types/song.types';

interface Props {
  data: TShowCase;
}

export const ShowCase: React.FC<Props> = ({ data }) => {
  if (!data.songs.length) return;

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
};
