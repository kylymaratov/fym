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
import LogoIcon from '@/assets/icons/logo.svg';
import 'swiper/swiper-bundle.css'

interface Props {
  data: ShowSongResponse;
  more?: string;
  rounded?: "rounded-full" |"rounded-sm" |"rounded-lg" | "rounded-md";
}

function ViewCase({ data, more, rounded = "rounded-lg" }: Props) {
  const {
    setPlayerState,
    state: { playing, playNow },
  } = useContext(PlayerContext);
  const swiperRef = useRef<SwiperClass | null>(null);

  function playSong(song: SongTypes) {
    if (playNow?.song_id === song.song_id) {
      if (playing) {
        setPlayerState('playingTrigger', true);
      } else {
        setPlayerState('playingTrigger', false);
      }
    } else {
      setPlayerState('playNow', song);
    }
  }

  const openContextMenu = () => {
    console.log(1);
  };

  if (!data.songs.length) return;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-md ml-1 lg:ml-2.5 text-gray-200">
            {data.title}
          </h1>
          {more && (
            <Link to={more} className="text-sm italic text-gray-400">
              View all {'->'}
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
        spaceBetween={12}
        slidesPerView="auto"
        pagination={{ clickable: true }}
      >
        {data.songs.map((song) => (
          <SwiperSlide
            onContextMenu={openContextMenu}
            key={song.song_id}
            style={{ width: '200px', height: '220px' }}
            className="select-none bg-transparent group overflow-hidden hover:shadow-lg justify-center hover:bg-hover hover:shadow-hover flex items-center"
          >
            <div className="relative">
              <Link to={`/song/${song.song_id}`}>
                <img
                  loading="lazy"
                  src={`https://i.ytimg.com/vi/${song.song_id}/mqdefault.jpg`}
                  className={`w-[190px] h-[200px] m-auto object-cover duration-200 opacity-70 hover:opacity-100 shadow-sm shadow-gray-500 ${
                    rounded
                  }`}
                />
              </Link>

              {rounded !== "rounded-full" && (
                <img
                  src={LogoIcon}
                  className="absolute top-5 left-2 opacity-70"
                />
              )}
              <button
                type="button"
                className="absolute right-2 bottom-14 bg-orange-500 p-4 rounded-full hidden group-hover:block"
                onClick={() => playSong(song)}
              >
                <img
                  src={
                    playNow?.song_id === song.song_id && playing
                      ? PauseIcon
                      : PlayIcon
                  }
                  alt="play"
                />
              </button>
              <div className="my-4 text-start whitespace-nowrap text-[13px] text-gray-300 line-clamp-1">
                 <p>{song.original_title ? song.original_title.slice(0, 1) + song.original_title.slice(0, 25).toLocaleLowerCase() : "Unknown"}</p> 
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default ViewCase;
