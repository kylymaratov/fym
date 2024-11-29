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
}

function ViewTable({ data }: Props) {
  return (
    <div className="w-full h-full">
      <h1 className="font-bold text-lg">{data.title}</h1>
      <table className="mt-6 w-full">
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
      className="hover:bg-hover h-16 group relative"
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
        {song.upload_date.split('T')[0]}
      </td>
      <td className="px-4 py-2 text-center text-[14px] text-gray-300">
        {formatTime(song.duration)}
      </td>
      <button
        type="button"
        className="hidden absolute right-5 top-[50%] -translate-y-[50%] group-hover:block"
      >
        <img src={OptionIcon} alt="option" />
      </button>
    </tr>
  );
};

export default ViewTable;
