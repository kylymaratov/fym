'use client';

import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import {
  MdOutlineSkipPrevious,
  MdOutlineSkipNext,
  MdOutlineFavoriteBorder,
  MdVolumeUp,
  MdVolumeDown,
  MdVolumeOff,
  MdShuffle,
  MdRepeat,
  MdOutlineHighQuality,
  MdOutlineQueueMusic,
  MdFullscreen,
  MdHighQuality,
} from 'react-icons/md';
import { LiaDownloadSolid } from 'react-icons/lia';

import { useContext, useEffect, useState } from 'react';
import RangeLine from './range-line';
import { PlayerContext } from '@/context/player-context';
import { SongTypes } from '@/types/song-types';
import { base_url } from '@/api/base-url';
import LoadingSpinner from './loading-spinner';
import LoadingText from './loading-text';

function MusicPlayer() {
  const [showVolume, setShowVolume] = useState<boolean>(false);
  const [expandRange, setExpandRange] = useState<boolean>(false);

  const {
    state: {
      music_player,
      playNow,
      last_volume,
      error_message,
      loading,
      loading_progress,
      quality,
      repeat,
      shuffle,
    },
    setPlayerState,
  } = useContext(PlayerContext);

  const setVolumeOnClick = (incomingVolume: number): void => {
    if (music_player) {
      music_player.volume = incomingVolume / 100;
    }
  };

  const setCurrentTimeOnClick = (incomingTime: number): void => {
    if (music_player) {
      music_player.currentTime = incomingTime;
    }
  };

  const setPlayOrPause = () => {
    music_player?.paused ? music_player.play() : music_player?.pause();
  };

  const startPlayer = (song: SongTypes): void => {
    if (music_player) {
      try {
        let audioSource =
          base_url + `/song/listen?songId=${song.song_id}&quality=${quality}`;

        setPlayerState('loading_progress', 0);
        setPlayerState('loading', true);
        music_player.src = audioSource;
        setPlayOrPause();
      } catch (e) {
        alert((e as Error).message);
      }
    }
  };

  const formatMilliseconds = (incomingTime: number): string => {
    const seconds = Math.floor(incomingTime / 1000);

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const handleOnError = (error: string | ErrorEvent) => {
    if (music_player) {
      if (typeof error === 'string') return;
      const errorCode = music_player.error?.code;

      console.log(errorCode);
    }
  };

  const handleTimeUpdate = (): void => {
    if (music_player) {
      const progress: number =
        music_player.buffered.length > 0
          ? (music_player.buffered.end(0) / music_player.duration) * 100
          : 0;
      setPlayerState('loading_progress', Math.floor(progress));
    }
  };

  const handleEnded = () => {
    if (music_player) {
      if (repeat) {
        music_player.play();
      }
    }
  };

  const handleVolumeMuted = () => {
    if (music_player) {
      if (music_player.volume === 0) {
        music_player.volume = last_volume;
      } else {
        setPlayerState('last_volume', music_player.volume);
        music_player.volume = 0;
      }
    }
  };

  useEffect(() => {
    if (music_player) {
      music_player.autoplay = false;
      music_player.onerror = handleOnError as OnErrorEventHandler;
      music_player.ontimeupdate = handleTimeUpdate;
      music_player.onended = handleEnded;
      music_player.onloadedmetadata = () => {
        setPlayerState('loading', false);
      };
    }
  }, [music_player]);

  useEffect(() => {
    if (playNow) {
      startPlayer(playNow);
    }
  }, [playNow]);

  if (!music_player) return null;

  return (
    <div
      className="w-full bg-secondary"
      onMouseEnter={() => setExpandRange(true)}
      onMouseLeave={() => setExpandRange(false)}
    >
      {playNow && (
        <div
          className={`duration-200 relative ${expandRange ? 'h-3.5' : 'h-1'}`}
        >
          <RangeLine
            current={(music_player.currentTime / music_player.duration) * 100}
            max={music_player.duration}
            onChange={setCurrentTimeOnClick}
            progress={loading_progress}
            times={{
              start: formatMilliseconds(music_player.currentTime * 1000),
              end: formatMilliseconds(music_player.duration * 1000),
            }}
            expandRange={expandRange}
          />
        </div>
      )}

      <div className="flex lg:justify-between h-[50px] pl-3 pr-3  items-center justify-center mt-2 mb-2">
        <div className="items-center justify-start gap-4 w-[30%] lg:flex hidden">
          {playNow && (
            <>
              <img
                src={`https://i.ytimg.com/vi/${playNow?.song_id}/mqdefault.jpg`}
                alt={playNow?.song_id}
                loading="lazy"
                width={55}
                height={55}
                className="rounded-lg bg-cover h-[55px]"
              />

              <div>
                <p className="text-sm font-bold">
                  {playNow.title || playNow.original_title}
                </p>
                <p className="text-sm text-gray-400">
                  {playNow.artist || playNow.author}
                </p>
              </div>
              <button type="button" className="text-gray-300">
                <MdOutlineFavoriteBorder size={22} />
              </button>
              {loading && (
                <div className="ml-2">
                  <LoadingText />
                </div>
              )}
            </>
          )}
        </div>

        <div
          className={`flex items-center justify-center gap-4 w-[30%] ${!playNow ? 'opacity-50' : 'opacity-100'}`}
        >
          <button
            type="button"
            onClick={() => setPlayerState('shuffle', !shuffle)}
          >
            <MdShuffle size={22} />
          </button>
          <button type="button" disabled={!playNow}>
            <MdOutlineSkipPrevious size={22} />
          </button>
          <button type="button" onClick={setPlayOrPause} disabled={!playNow}>
            {music_player.paused ? (
              <FaPlayCircle size={28} />
            ) : (
              <FaPauseCircle size={28} />
            )}
          </button>
          <button type="button" disabled={!playNow}>
            <MdOutlineSkipNext size={22} />
          </button>
          <button
            type="button"
            onClick={() => setPlayerState('repeat', !repeat)}
          >
            <MdRepeat size={22} />
          </button>
        </div>

        <div className="items-center justify-end gap-4 w-[30%] lg:flex hidden">
          <button type="button" className="text-white">
            {quality === 'high' ? (
              <MdHighQuality size={22} />
            ) : (
              <MdOutlineHighQuality size={22} />
            )}
          </button>
          <button type="button" className="text-white">
            <MdOutlineQueueMusic size={22} />
          </button>
          <button type="button" className="text-white">
            <LiaDownloadSolid size={22} />
          </button>

          <div
            className="flex items-center gap-2"
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => {
              setShowVolume(false);
            }}
          >
            <button
              type="button"
              className="text-white"
              onClick={handleVolumeMuted}
            >
              {music_player.volume === 0 ? (
                <MdVolumeOff size={22} />
              ) : music_player.volume >= 70 ? (
                <MdVolumeUp size={22} />
              ) : (
                <MdVolumeDown size={22} />
              )}
            </button>
            <div
              className={`duration-200 ${showVolume ? 'h-2 w-[70px]' : 'h-0 w-0'}`}
            >
              <RangeLine
                max={100}
                current={music_player.volume * 100}
                onChange={setVolumeOnClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
