'use client';

import { base_url } from '@/api/base-url';
import { PlayerContext } from '@/context/player-context';
import { SongTypes } from '@/types/song-types';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const UsePlayer = () => {
  const { state, setPlayerState } = useContext(PlayerContext);
  const playNow = state.playNow;
  const pathname = usePathname();
  const audioRef = state.audioRef;

  const setCurrentTimeOnClick = (incomingTime: number): void => {
    if (audioRef) {
      audioRef.currentTime = incomingTime;
      setPlayerState('currentTime', incomingTime);
    }
  };

  const setVolumeOnClick = (incomingVolume: number): void => {
    if (audioRef) {
      audioRef.volume = incomingVolume / 100;
      setPlayerState('volume', incomingVolume);
    }
  };

  const startPlayer = (song: SongTypes): void => {
    if (audioRef) {
      try {
        let audioSource =
          base_url +
          `/song/listen?songId=${song.song_id}&quality=${state.quality}`;

        setPlayerState('loading_progress', 0);

        audioRef.src = audioSource;
      } catch (e) {
        alert((e as Error).message);
      }
    }
  };

  const setPlayOrPause = () => {
    if (audioRef) {
      if (audioRef.paused) {
        setPlayerState('paused', false);
        return audioRef.play();
      }
      audioRef.pause();
      setPlayerState('paused', true);
    }
  };

  const setNext = () => {};
  const setPrev = () => {};

  const handleTimeUpdate = (): void => {
    if (audioRef) {
      const progress: number =
        audioRef.buffered.length > 0
          ? (audioRef.buffered.end(0) / audioRef.duration) * 100
          : 0;
      setPlayerState('loading_progress', Math.floor(progress));

      const newCurrentTime: number = parseInt(
        Number(audioRef.currentTime).toFixed(0),
      );
      setPlayerState('currentTime', newCurrentTime);
    }
  };

  const handleFormatDuration = (incomingTime: number): string => {
    const minute = Math.floor(incomingTime / 60);
    const secondLeft = incomingTime - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };

  const handleLoadedMetadata = (incomingDuration: number): void => {
    setPlayerState('duration', incomingDuration);
    setPlayOrPause();
  };

  const handleOnError = (error: string | ErrorEvent) => {
    if (audioRef) {
      if (typeof error === 'string') return;
      const errorCode = audioRef.error?.code;

      console.log(errorCode);
    }
  };

  const handleEnded = () => {
    setPlayerState('paused', true);
  };

  const setRepeat = () => setPlayerState('repeat', !state.repeat);
  const setShuffle = () => setPlayerState('shuffle', !state.shuffle);
  const setLastVolume = (volume: number) =>
    setPlayerState('last_volume', volume);
  const setVolume = (volume: number) => setPlayerState('volume', volume);

  useEffect(() => {
    if (playNow && audioRef) {
      startPlayer(playNow);
      audioRef.onloadedmetadata = () => handleLoadedMetadata(playNow.duration);
    }
  }, [playNow]);

  useEffect(() => {
    if (audioRef) {
      audioRef.autoplay = false;
      audioRef.onerror = handleOnError as OnErrorEventHandler;
      audioRef.ontimeupdate = handleTimeUpdate;
      audioRef.onended = handleEnded;
      setVolumeOnClick(state.volume);
    }
  }, [audioRef]);

  useEffect(() => {
    setPlayerState('times', {
      start: handleFormatDuration(state.currentTime),
      end: handleFormatDuration(state.duration - state.currentTime),
    });
  }, [state.currentTime, state.duration]);

  useEffect(() => {
    if (!location.pathname.startsWith('/app')) {
      setPlayerState('audioRef', null);
    }
  }, [pathname]);

  return {
    ...state,
    setNext,
    setPrev,
    startPlayer,
    setVolumeOnClick,
    setPlayOrPause,
    setCurrentTimeOnClick,
    setShuffle,
    setRepeat,
    setLastVolume,
    setVolume,
    playNow,
  };
};

export default UsePlayer;
