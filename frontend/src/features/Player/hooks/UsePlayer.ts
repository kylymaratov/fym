'use client';

import baseUrl from '@/api/base.url';
import { PlayerContext } from '@/context/PlayerContext';
import { SongTypes } from '@/types/song.types';
import { useContext, useEffect, useRef, useState } from 'react';

interface Times {
  start: string;
  end: string;
}

type Quality = 'low' | 'high';

const UsePlayer = () => {
  const [times, setTimes] = useState<Times>({
    start: '00:00',
    end: '00:00',
  });
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(50);
  const [paused, setPaused] = useState<boolean>(true);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [quality, setQuality] = useState<Quality>('high');
  const [loading, setLoading] = useState<boolean>(false);
  const [lastVolume, setLastVolume] = useState<number>(0);
  const [error, setError] = useState('');
  const { state } = useContext(PlayerContext);

  const playNow = state.playNow;

  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const setCurrentTimeOnClick = (incomingTime: number): void => {
    audioRef.current.currentTime = incomingTime;
    setCurrentTime(incomingTime);
  };

  const setVolumeOnClick = (incomingVolume: number): void => {
    audioRef.current.volume = incomingVolume / 100;
    setVolume(incomingVolume);
  };

  const startPlayer = (song: SongTypes): void => {
    try {
      let audioSource =
        baseUrl + `/song/listen?songId=${song.source_id}&quality=${quality}`;

      setLoadProgress(0);

      audioRef.current.src = audioSource;
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const setPlayOrPause = () => {
    if (audioRef.current.paused) {
      setPaused(false);
      return audioRef.current.play();
    }
    audioRef.current.pause();
    setPaused(true);
  };

  const setNext = () => {};
  const setPrev = () => {};

  const handleTimeUpdate = (): void => {
    const progress: number =
      audioRef.current.buffered.length > 0
        ? (audioRef.current.buffered.end(0) / audioRef.current.duration) * 100
        : 0;
    setLoadProgress(Math.floor(progress));

    const newCurrentTime: number = parseInt(
      Number(audioRef.current.currentTime).toFixed(0),
    );
    setCurrentTime(newCurrentTime);
  };

  const handleFormatDuration = (incomingTime: number): string => {
    const minute = Math.floor(incomingTime / 60);
    const secondLeft = incomingTime - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };

  const handleLoadedMetadata = (incomingDuration: number): void => {
    setDuration(incomingDuration);
    setPlayOrPause();
  };

  const handleOnError = (error: string | ErrorEvent) => {
    if (typeof error === 'string') return;
    const errorCode = audioRef.current?.error?.code;

    console.log(errorCode);
  };

  const handleEnded = () => {
    setPaused(true);
  };

  useEffect(() => {
    if (playNow) {
      startPlayer(playNow);
      audioRef.current.onloadedmetadata = () =>
        handleLoadedMetadata(playNow.duration);
    }
  }, [playNow]);

  useEffect(() => {
    audioRef.current.autoplay = false;
    audioRef.current.onerror = handleOnError as OnErrorEventHandler;
    audioRef.current.ontimeupdate = handleTimeUpdate;
    audioRef.current.onended = handleEnded;
  }, []);

  useEffect(() => {
    setTimes({
      start: handleFormatDuration(currentTime),
      end: handleFormatDuration(duration - currentTime),
    });
  }, [currentTime, duration]);

  return {
    currentTime,
    duration,
    paused,
    repeat,
    shuffle,
    volume,
    loadProgress,
    times,
    quality,
    setNext,
    setPaused,
    setPrev,
    setRepeat,
    startPlayer,
    setVolumeOnClick,
    setCurrentTime,
    setShuffle,
    setQuality,
    setPlayOrPause,
    setCurrentTimeOnClick,
    setLastVolume,
    lastVolume,
    playNow,
  };
};

export default UsePlayer;
