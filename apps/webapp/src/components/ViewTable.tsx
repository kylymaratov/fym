import PlayIcon from '@/assets/icons/play.svg';
import OptionIcon from '@/assets/icons/option.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import { ViewCaseTypes, SongTypes } from '@/types/song.types';

import 'swiper/swiper-bundle.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { playerActions } from '@/store/slices/player.slice';
import { useState } from 'react';

interface Props {
  data: ViewCaseTypes;
  bySong?: boolean;
}

function ViewTable({ data, bySong }: Props) {
  const dispatch = useAppDispatch();

  const playAll = () => {
    if (data) {
      dispatch(playerActions.setPlayNow(data.songs[0]));
      dispatch(playerActions.setQueue(data.songs.slice(1, data.songs.length)));
    }
  };

  if (!data.songs.length)
    return <div className="text-center">Nothing here</div>;

  return (
    <div className="w-full h-full">
      <div className="relative">
        <img
          src={`https://i.ytimg.com/vi/${data.songs[0].song_id}/mqdefault.jpg`}
          className="w-full h-[300px] xl:h-[450px] rounded-xl object-cover opacity-10 z-10"
        />
        <div className="absolute left-2 xl:left-7 h-full top-0 flex items-center z-20">
          <div>
            <h1 className="font-bold text-2xl xl:text-6xl text-gray-300">
              {data.title}
            </h1>
            {bySong && (
              <h1 className="mt-10">by: {data.songs[0].original_title}</h1>
            )}
            <button
              onClick={playAll}
              type="button"
              className="uppercase mt-5 xl:mt-20 ml-1 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Listen all
            </button>
          </div>
        </div>
      </div>
      <table className="mt-6 w-full bg-transparent relative -top-16 z-30">
        <thead>
          <tr>
            <th className="px-1 py-2 text-[13px] text-center font-light">#</th>
            <th className="px-4 py-2 text-[13px] text-start font-light">
              Name
            </th>
            <th className="px-4 py-2 text-[13px] text-start font-light">
              Upload date
            </th>
            <th className="px-4 py-2 text-[13px] text-center font-light">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="mt-10">
          {data.songs.map((song, key) => (
            <SongItem song={song} key={key} num={key} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface SongItemProps {
  song: SongTypes;
  num: number;
}

export const SongItem: React.FC<SongItemProps> = ({ song, num }) => {
  const [hover, setHover] = useState<boolean>(false);
  const { playNow, playing } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  function playSong(song: SongTypes) {
    if (playNow?.song_id === song.song_id) {
      if (playing) {
        dispatch(playerActions.setPlayingTrigger(true));
      } else {
        dispatch(playerActions.setPlayingTrigger(false));
      }
    } else {
      dispatch(playerActions.setPlayNow(song));
    }
  }

  return (
    <tr
      key={song.song_id}
      className="hover:bg-hover h-16 group relative rounded-lg"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <td className="py-2 text-center">
        {hover ? (
          <button onClick={() => playSong(song)}>
            <img
              src={
                playNow?.song_id === song.song_id && playing
                  ? PauseIcon
                  : PlayIcon
              }
              alt="play"
              loading="lazy"
            />
          </button>
        ) : (
          num + 1
        )}
      </td>
      <td className="px-4 py-2 text-start flex items-center">
        <img
          src={`https://i.ytimg.com/vi/${song.song_id}/mqdefault.jpg`}
          loading="lazy"
          alt="cover"
          className="w-10 h-10 rounded-md"
        />
        <div className="ml-4">
          <p className="text-sm">{song.title || song.original_title}</p>
          <p className="text-sm text-gray-300">{song.artist || song.author}</p>
        </div>
      </td>
      <td className="px-4 py-2 text-start text-[12px] text-gray-300">
        {song.upload_date?.split('T')[0] || ''}
      </td>
      <td className="px-4 py-2 text-center text-[14px] text-gray-300">
        {formatTime(song.duration)}
      </td>
      <td className="hidden absolute right-3 top-[50%] -translate-y-[50%] group-hover:block">
        <img src={OptionIcon} alt="option" />
      </td>
    </tr>
  );
};

export default ViewTable;
