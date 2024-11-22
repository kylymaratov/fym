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

import { useState } from 'react';
import UsePlayer from '@/hooks/use-player';
import RangeLine from './range-line';

function MusicPlayer() {
  const [showVolume, setShowVolume] = useState<boolean>(false);
  const [expandRange, setExpandRange] = useState<boolean>(false);
  const {
    currentTime,
    duration,
    loading_progress,
    paused,
    quality,
    setCurrentTimeOnClick,
    setPlayOrPause,
    setRepeat,
    setShuffle,
    times,
    setVolumeOnClick,
    volume,
    setLastVolume,
    last_volume,
    playNow,
  } = UsePlayer();

  const volumeHandler = () => {
    if (volume === 0) {
      setVolumeOnClick(last_volume);
    } else {
      setVolumeOnClick(0);
      setLastVolume(volume);
    }
  };

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
            current={(currentTime / duration) * 100}
            max={duration}
            onChange={setCurrentTimeOnClick}
            progress={loading_progress}
            times={times}
            expandRange={expandRange}
          />
        </div>
      )}

      <div className="flex h-[50px] pl-3 pr-3  items-center justify-between mt-2 mb-2">
        <div className="flex items-center justify-start gap-4 w-[30%]">
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
            </>
          )}
        </div>

        <div
          className={`flex items-center justify-center gap-4 w-[30%] ${!playNow ? 'opacity-50' : 'opacity-100'}`}
        >
          <button type="button" onClick={setShuffle}>
            <MdShuffle size={22} />
          </button>
          <button type="button" disabled={!playNow}>
            <MdOutlineSkipPrevious size={22} />
          </button>
          <button type="button" onClick={setPlayOrPause} disabled={!playNow}>
            {paused ? <FaPlayCircle size={28} /> : <FaPauseCircle size={28} />}
          </button>
          <button type="button" disabled={!playNow}>
            <MdOutlineSkipNext size={22} />
          </button>
          <button type="button" onClick={setRepeat}>
            <MdRepeat size={22} />
          </button>
        </div>

        <div className="flex items-center justify-end gap-4 w-[30%]">
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
              onClick={volumeHandler}
            >
              {volume === 0 ? (
                <MdVolumeOff size={22} />
              ) : volume >= 70 ? (
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
                current={volume}
                onChange={setVolumeOnClick}
              />
            </div>
          </div>
          <button type="button" className="text-white">
            <MdFullscreen size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
