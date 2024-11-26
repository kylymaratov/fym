import { useContext } from 'react';
import 'swiper/css';
import PlayIcon from '@/assets/icons/play.svg';
import LikeIcon from '@/assets/icons/like.svg';
import OptionIcon from '@/assets/icons/option.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import { PlayerContext } from '@/context/PlayerContext';
import { ShowSongResponse } from '@/types/song.types';

interface Props {
  data: ShowSongResponse;
  withButton?: boolean;
  numeric?: boolean;
}

function ShowTable({ data, withButton, numeric }: Props) {
  const {
    setPlayerState,
    state: { musicPlayer, playNow },
  } = useContext(PlayerContext);

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  return (
    <div className="lg:bg-secondary bg-transparent px-2 py-1 lg:px-5 rounded-xl lg:py-3 w-full h-full">
      <h1 className="font-bold text-lg ml-1">{data.title}</h1>
      <div className="mt-6">
        {data.songs.map((song, key) => (
          <div
            key={song.song_id}
            className="flex justify-between items-center select-none overflow-hidden p-1"
          >
            <div className="flex items-center justify-start">
              {numeric && (
                <span className="text-md lg:block hidden">#{key + 1}</span>
              )}
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
            <div className="flex justify-between w-1/4 lg:w-1/6">
              <button
                type="button"
                onClick={() => {
                  if (playNow?.song_id === song.song_id) {
                    if (musicPlayer?.paused) {
                      musicPlayer?.play();
                    } else {
                      musicPlayer?.pause();
                    }
                  } else {
                    setPlayerState('playNow', song);
                  }
                }}
              >
                <img
                  src={
                    playNow?.song_id === song.song_id && !musicPlayer?.paused
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
              <button type="button">
                <img src={OptionIcon} alt="option" />
              </button>
            </div>
          </div>
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
export default ShowTable;
