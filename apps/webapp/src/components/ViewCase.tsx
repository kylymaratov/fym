import { Swiper as SwiperClass } from 'swiper/types'; //
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import PlayIcon from '@/assets/icons/play.svg';
import PrevIcon from '@/assets/icons/prev.svg';
import NextIcon from '@/assets/icons/next.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import { ViewCaseTypes, SongTypes } from '@/types/song.types';
import { Link, useNavigate } from 'react-router-dom';
import LogoIcon from '@/assets/icons/logo.svg';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { playerActions } from '@/store/slices/player.slice';
import 'swiper/swiper-bundle.css';
import { useLazyGetRelatedSongsQuery } from '@/api/song.api';

interface Props {
  data: ViewCaseTypes;
  more?: string;
  rounded?: 'rounded-full' | 'rounded-sm' | 'rounded-lg' | 'rounded-md';
}

function ViewCase({ data, more, rounded = 'rounded-lg' }: Props) {
  const player = useAppSelector((state) => state.player);
  const dispatch = useAppDispatch();
  const swiperRef = useRef<SwiperClass | null>(null);
  const navigate = useNavigate();
  const [getRelated, relatedSongs] = useLazyGetRelatedSongsQuery();

  function playSong(song: SongTypes) {
    if (player.playNow?.song_id === song.song_id) {
      if (player.playing) {
        dispatch(playerActions.setPlayingTrigger(true));
      } else {
        dispatch(playerActions.setPlayingTrigger(false));
      }
    } else {
      dispatch(playerActions.setPlayNow(song));
      setRelatedSongs(song);
    }
  }

  async function setRelatedSongs(song: SongTypes) {
    try {
      const data = await getRelated(`?song_id=${song.song_id}`).unwrap();

      const relatedSongs = data ? data.songs.slice(1, data.songs.length) : [];

      dispatch(playerActions.setQueue(relatedSongs));
    } catch {
      dispatch(playerActions.setQueue([]));
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
          <h1 className="font-bold text-md ml-1 text-gray-200">{data.title}</h1>
          {more && (
            <Link to={more} className="text-[13px] italic text-gray-400">
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
        className="my-7"
        spaceBetween={12}
        slidesPerView="auto"
        pagination={{ clickable: true }}
      >
        {data.songs.map((song) => (
          <SwiperSlide
            onContextMenu={openContextMenu}
            key={song.song_id}
            style={{ width: '200px', height: '240px' }}
            className="select-none bg-transparent group overflow-hidden hover:shadow-lg justify-center hover:bg-hover hover:shadow-hover flex items-center"
          >
            <div className="relative">
              <img
                onClick={() =>
                  navigate(`/song/${song.song_id}`, {
                    state: { relatedSongs: relatedSongs.data },
                  })
                }
                loading="lazy"
                src={`https://i.ytimg.com/vi/${song.song_id}/mqdefault.jpg`}
                className={`cursor-pointer w-[190px] h-[190px] m-auto object-cover duration-200 opacity-70 hover:opacity-100 shadow-sm shadow-gray-500 ${rounded}`}
              />
              {rounded !== 'rounded-full' && (
                <img
                  alt="b"
                  src={LogoIcon}
                  className="absolute top-5 left-3 opacity-70 w-[30px]"
                />
              )}

              <button
                type="button"
                className="absolute right-1.5 bottom-20 bg-orange-500 p-4 rounded-full hidden group-hover:block"
                onClick={() => playSong(song)}
              >
                <img
                  src={
                    player.playNow?.song_id === song.song_id && player.playing
                      ? PauseIcon
                      : PlayIcon
                  }
                  alt="play"
                />
              </button>
              <div className="my-4 text-start w-full whitespace-nowrap text-gray-300 line-clamp-2">
                <p className="text-[14px]">
                  {song.title?.slice(0, 25) || 'Unknown'}
                </p>
                <p className="text-[13px]">
                  {song.artist?.slice(0, 15) ||
                    song.author?.slice(0, 15) ||
                    'Unknown'}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default ViewCase;
