import { TShowCase } from '@/types/song.types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useContext } from 'react';
import { PlayerContext } from '@/app/context/PlayerContext';

interface Props {
  data: TShowCase | null;
}

export const ShowCase: React.FC<Props> = ({ data }) => {
  const { state, setPlayerState } = useContext(PlayerContext);

  if (!data || !data?.songs.length) return;

  return (
    <div>
      <h1 className="font-bold text-xl ml-1">{data.title}</h1>
      <Swiper
        className="mt-5"
        spaceBetween={7}
        slidesPerView="auto"
        navigation
        pagination={{ clickable: true }}
      >
        {data.songs.map((song) => (
          <SwiperSlide
            onDoubleClick={() => {
              setPlayerState('playNow', song);
            }}
            key={song.song_id}
            style={{ width: '200px', height: '250px' }}
            className="select-none overflow-hidden p-1 hover:shadow-lg hover:bg-secondary hover:shadow-secondary"
          >
            <img
              src={`https://i.ytimg.com/vi/${song.song_id}/mqdefault.jpg`}
              className=" rounded-md w-[200px] h-[180px] m-auto object-cover opacity-70 hover:opacity-100 duration-200"
            />
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
};
