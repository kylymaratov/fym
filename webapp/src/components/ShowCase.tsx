import { Swiper as SwiperClass } from 'swiper/types'; //
import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext, useRef } from 'react';
import PlayIcon from '@/assets/icons/play.svg';
import PrevIcon from '@/assets/icons/prev.svg';
import NextIcon from '@/assets/icons/next.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import { ShowSongResponse, SongTypes } from '@/types/song.types';
import { PlayerContext } from '@/context/PlayerContext';
import { Link } from 'react-router-dom';
import 'swiper/css';
import LogoIcon from '@/assets/icons/logo.svg';

interface Props {
  data: ShowSongResponse;
  toMore?: string;
  roundedFull?: boolean;
}

function ShowCase({ data, toMore, roundedFull }: Props) {
  const {
    setPlayerState,
    state: { musicPlayer, playNow, playNext },
  } = useContext(PlayerContext);
  const swiperRef = useRef<SwiperClass | null>(null);

  function playSong(song: SongTypes) {
    if (playNow?.song_id === song.song_id) {
      if (musicPlayer?.paused) {
        musicPlayer?.play();
      } else {
        musicPlayer?.pause();
      }
    } else {
      setPlayerState('playNow', song);
      if (data.title && !playNext.length) {
        setPlayerState('playNext', data.songs);
      }
    }
  }

  if (!data.songs.length) return;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-xl ml-2.5 text-gray-200">
            {data.title}
          </h1>
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
        className="my-4"
        spaceBetween={3}
        slidesPerView="auto"
        pagination={{ clickable: true }}
      >
        {data.songs.map((song) => (
          <SwiperSlide
            key={song.song_id}
            style={{ width: '240px', height: '260px' }}
            className="select-none bg-transparent group overflow-hidden hover:shadow-lg justify-center hover:bg-hover hover:shadow-hover flex items-center"
          >
            <div className="relative">
              <Link to={`/song/${song.song_id}`}>
                <img
                  loading="lazy"
                  src={`https://i.ytimg.com/vi/${song.song_id}/mqdefault.jpg`}
                  className={`w-[220px] h-[210px] object-cover duration-200 opacity-90 hover:opacity-100 shadow-lg shadow-black ${
                    roundedFull ? 'rounded-full' : 'rounded-lg'
                  }`}
                />
              </Link>

              <img
                src={LogoIcon}
                className="absolute top-2 left-2 opacity-70"
              />
              <button
                type="button"
                className="absolute right-1 bottom-12 bg-orange-500 p-5 rounded-full hidden group-hover:block"
                onClick={() => playSong(song)}
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
              <div className="my-3 text-[13px] text-gray-400">
                <p>{song.original_title.slice(0, 30)}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default ShowCase;
