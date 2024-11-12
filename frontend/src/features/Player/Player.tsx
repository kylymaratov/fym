'use client';
import styles from './Player.module.scss';
import { song_mock } from '@/mock/song.mock';
import { FaPlayCircle } from 'react-icons/fa';
import {
  MdOutlineSkipPrevious,
  MdOutlineSkipNext,
  MdOutlineFavoriteBorder,
  MdVolumeUp,
  MdVolumeDown,
  MdVolumeOff,
} from 'react-icons/md';
import { MdShuffle } from 'react-icons/md';
import { MdRepeat } from 'react-icons/md';
import { MdOutlineHighQuality } from 'react-icons/md';
import { FaPauseCircle } from 'react-icons/fa';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { MdFullscreen } from 'react-icons/md';
import { LiaDownloadSolid } from 'react-icons/lia';
import { MdHighQuality } from 'react-icons/md';
import { Range } from '@/components/Range/Range';
import UsePlayer from './hooks/UsePlayer';
import classNames from 'classnames';

function MusicPlayer() {
  const {
    currentTime,
    duration,
    loadProgress,
    paused,
    quality,
    repeat,
    setCurrentTimeOnClick,
    setPlayOrPause,
    setQuality,
    setRepeat,
    setShuffle,
    shuffle,
    times,
    setVolumeOnClick,
    volume,
    setLastVolume,
    lastVolume,
    playNow,
  } = UsePlayer();
  const volumeHandler = () => {
    if (volume === 0) {
      setVolumeOnClick(lastVolume);
    } else {
      setVolumeOnClick(0);
      setLastVolume(volume);
    }
  };
  return (
    <div className={classNames(styles.player)}>
      <Range
        current={(currentTime / duration) * 100}
        max={duration}
        onChange={setCurrentTimeOnClick}
        progress={loadProgress}
        className={styles.range}
      />
      <div className={styles.wrapper}>
        <div className={styles.info}>
          {playNow && (
            <>
              <img
                src={`https://i.ytimg.com/vi/${playNow?.source_id}/mqdefault.jpg`}
                alt={playNow?.source_id}
                loading="lazy"
                width={50}
                height={50}
              />
              <div>
                <p className={styles.title}>
                  {song_mock.title || song_mock.original_title}
                </p>
                <p className={styles.author}>
                  {song_mock.artist || song_mock.author}
                </p>
              </div>
              <button type="button">
                <MdOutlineFavoriteBorder />
              </button>
            </>
          )}
        </div>
        <div
          className={classNames(styles.controls, !playNow && styles.disabled)}
        >
          <button type="button" onClick={() => setShuffle(!shuffle)}>
            <MdShuffle />
          </button>
          <button type="button">
            <MdOutlineSkipPrevious />
          </button>
          <button type="button" onClick={setPlayOrPause}>
            {paused ? <FaPlayCircle /> : <FaPauseCircle />}
          </button>
          <button type="button">
            <MdOutlineSkipNext />
          </button>
          <button type="button" onClick={() => setRepeat(!repeat)}>
            <MdRepeat />
          </button>
        </div>
        <div className={styles.nav}>
          <button type="button">
            {quality == 'high' ? <MdOutlineHighQuality /> : <MdHighQuality />}
          </button>
          <button type="button">
            <MdOutlineQueueMusic />
          </button>
          <button type="button">
            <LiaDownloadSolid />
          </button>
          <div className={styles.volume}>
            <button
              type="button"
              className={styles.volumeBtn}
              onClick={volumeHandler}
            >
              {volume === 0 ? (
                <MdVolumeOff size={20} />
              ) : volume > 70 ? (
                <MdVolumeUp size={20} />
              ) : (
                <MdVolumeDown size={20} />
              )}
            </button>
            <Range
              max={100}
              current={volume}
              onChange={setVolumeOnClick}
              className={styles.volumeRange}
            />
          </div>
          <button type="button">
            <MdFullscreen />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
