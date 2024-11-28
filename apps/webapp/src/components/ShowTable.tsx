import PlayIcon from '@/assets/icons/play.svg';
import OptionIcon from '@/assets/icons/option.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import { ViewCaseTypes, SongTypes } from '@/types/song.types';
import UseVisible from '@/hooks/UseVisible';

import 'swiper/swiper-bundle.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { playerActions } from '@/store/slices/player.slice';

interface Props {
  data: ViewCaseTypes;
  withButton?: boolean;
  numeric?: boolean;
}

function ViewTable({ data, withButton, numeric }: Props) {
  return (
    <div className="lg:bg-secondary bg-transparent px-2 py-1 lg:px-5 rounded-xl lg:py-3 w-full h-full">
      <h1 className="font-bold text-lg ml-1">{data.title}</h1>
      <div className="mt-6">
        {data.songs.map((song, key) => (
          <SongItem
            song={song}
            key={key}
            numeric={numeric ? key + 1 : undefined}
          />
        ))}
      </div>
      {withButton && (
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-bold text-gray-200 "
          >
            More {'  ->'}
          </button>
        </div>
      )}
    </div>
  );
}

interface SongItemProps {
  song: SongTypes;
  numeric?: number;
}

export const SongItem: React.FC<SongItemProps> = ({ song, numeric }) => {
  const showOptions = UseVisible(false);
  const { playNow, playing } = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  function playSong(song: SongTypes) {
    if (playNow?.song_id === song.song_id) {
    } else {
      dispatch(playerActions.setPlayNow(song));
    }
  }
  return (
    <div
      key={song.song_id}
      className="flex z-20 justify-between items-center select-none overflow-hidden  px-1 py-1 lg:px-3 rounded-lg hover:bg-hover"
    >
      <div className="flex items-center justify-start">
        {numeric && <span className="text-md lg:block hidden">{numeric}</span>}
        <img
          src={`https://i.ytimg.com/vi/${song.song_id}/mqdefault.jpg`}
          className={`rounded-lg w-[55px] h-[55px] object-cover ${
            numeric && 'lg:ml-5 ml-0'
          }`}
          loading="lazy"
        />
        <div className="ml-3 md:ml-5">
          {song.title ? (
            <>
              <p className="text-sm">{song.title.slice(0, 30)}</p>
              <p className="text-sm text-gray-400">
                {song.artist?.slice(0, 30) || song.author?.slice(0, 30)}
              </p>
            </>
          ) : (
            <p>{song.original_title.slice(0, 30)}</p>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center relative w-1/4 lg:w-1/6">
        <button type="button" onClick={() => playSong(song)}>
          <img
            src={
              playNow?.song_id === song.song_id && playing
                ? PauseIcon
                : PlayIcon
            }
            alt="play"
          />
        </button>

        {/* <button type="button">
        <img src={LikeIcon} alt="like" />
      </button> */}
        <span className="text-sm md:block hidden">
          {song.upload_date.split('T')[0]}
        </span>
        <span className="text-sm md:block hidden">
          {formatTime(song.duration)}
        </span>
        <div
          className="cursor-pointer"
          onClick={() =>
            showOptions.setIsComponentVisible(!showOptions.isComponentVisible)
          }
        >
          <img src={OptionIcon} alt="option" />
        </div>
        {showOptions.isComponentVisible && (
          <div
            className="p-2 z-30 absolute bg-hover top-4 right-0"
            ref={showOptions.ref}
          >
            <div>
              <button type="button">Liked song</button>
            </div>
            <div>
              <button type="button">Liked song</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTable;
