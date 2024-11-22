'use client';

import 'swiper/css';
import { SongShowCaseTypes } from '@/types/song-types';
import { useContext } from 'react';
import { PlayerContext } from '@/context/player-context';
import PlayIcon from '@/assets/icons/play.svg';
import LikeIcon from '@/assets/icons/like.svg';
import Image from 'next/image';
import OptionIcon from '@/assets/icons/option.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import { UseRequest } from '@/hooks/use-request';
import { base_url } from '@/api/base-url';

interface Props {
  data: SongShowCaseTypes;
  withButton?: boolean;
}

function SongShowCard({ data, withButton }: Props) {
  const { setPlayerState, state } = useContext(PlayerContext);
  const { request } = UseRequest();

  function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  async function likeSong(song_id: string) {
    try {
      const response = await request(
        base_url + `/song/like?song_id=${song_id}`,
        'PUT',
      );

      console.log(response);
    } catch (error) {}
  }

  return (
    <div className="bg-secondary px-5 rounded-xl py-[10px] w-full h-full">
      <h1 className="font-bold text-lg ml-1">{data.title}</h1>
      <div className="mt-6">
        {data.songs.map((song, key) => (
          <div
            key={song.song_id}
            className="flex justify-between items-center select-none overflow-hidden p-1"
          >
            <div className="flex items-center justify-start">
              <span className="text-md font-bold">#{key + 1}</span>
              <img
                src={`https://i.ytimg.com/vi/${song.song_id}/mqdefault.jpg`}
                className=" rounded-lg w-[55px] h-[55px] object-cover ml-5"
                loading="lazy"
              />
              <div className="ml-5">
                {song.title ? (
                  <>
                    <p className="text-sm font-bold">
                      {song.title.slice(0, 30)}
                    </p>
                    <p className="text-sm text-gray-400">
                      {song.artist || song.author}
                    </p>
                  </>
                ) : (
                  <p>{song.original_title.slice(0, 30)}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-10">
              <button
                type="button"
                onClick={() => {
                  if (state.playNow?.song_id === song.song_id) {
                    if (state.audioRef?.paused) {
                      state.audioRef?.play();
                    } else {
                      state.audioRef?.pause();
                    }
                  } else {
                    setPlayerState('playNow', song);
                  }
                }}
              >
                <Image
                  src={
                    state.playNow?.song_id === song.song_id &&
                    !state.audioRef?.paused
                      ? PauseIcon
                      : PlayIcon
                  }
                  alt="play"
                />
              </button>

              <button type="button" onClick={() => likeSong(song.song_id)}>
                <Image src={LikeIcon} alt="like" />
              </button>
              <span className="text-sm">{formatTime(song.duration)}</span>
              <button type="button">
                <Image src={OptionIcon} alt="option" />
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
export default SongShowCard;
