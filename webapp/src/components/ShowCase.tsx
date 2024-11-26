import { Swiper as SwiperClass } from 'swiper/types'; //
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext, useRef } from 'react';
import PlayIcon from '@/assets/icons/play.svg';
import PrevIcon from '@/assets/icons/prev.svg';
import NextIcon from '@/assets/icons/next.svg';
import OptionIcon from '@/assets/icons/option.svg';
import LikeIcon from '@/assets/icons/like.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import { ShowSongResponse } from '@/types/song.types';
import { PlayerContext } from '@/context/PlayerContext';
import { Link } from 'react-router-dom';
import 'swiper/css';

interface Props {
  data: ShowSongResponse;
  toMore?: string;
}

function ShowCase({ data, toMore }: Props) {
  const {
    setPlayerState,
    state: { musicPlayer, playNow },
  } = useContext(PlayerContext);
  const swiperRef = useRef<SwiperClass | null>(null);

  if (!data.songs.length) return;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-xl ml-1">{data.title}</h1>
          {toMore && (
            <Link to={toMore} className="text-sm text-gray-400 font-bold">
              More {'->'}
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => swiperRef.current?.slidePrev()}>
            <img src={PrevIcon} alt="prev" />
          </button>
          <button type="button" onClick={() => swiperRef.current?.slideNext()}>
            <img src={NextIcon} alt="next" />
          </button>
        </div>
      </div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="mt-5"
        spaceBetween={10}
        slidesPerView="auto"
        pagination={{ clickable: true }}
      >
        {data.songs.map((song) => (
          <SwiperSlide
            key={song.song_id}
            style={{ width: '180px', height: '240px' }}
            className="select-none group overflow-hidden p-1 hover:shadow-lg hover:bg-secondary hover:shadow-secondary relative"
          >
            <img
              loading="lazy"
              src={`https://i.ytimg.com/vi/${song.song_id}/mqdefault.jpg`}
              className="rounded-md w-[200px] h-[180px] m-auto object-cover opacity-60 hover:opacity-100 duration-200"
            />
            {/* <button
            type="button"
            className="absolute top-3 left-3 hidden group-hover:block"
          >
            <img src={LikeIcon} alt="option" />
          </button> */}
            <button
              type="button"
              className="absolute right-3 top-3 hidden group-hover:block"
            >
              <img src={OptionIcon} alt="option" />
            </button>
            <button
              type="button"
              className="absolute right-4 bottom-4"
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

            <div className="mt-5 text-sm">
              {song.title ? (
                <>
                  <p className="text-md">{song.title.slice(0, 18)}</p>
                  <p className="text-sm text-gray-400">
                    {song.artist || song.author}
                  </p>
                </>
              ) : (
                <p>{song.original_title.slice(0, 20)}</p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default ShowCase;
