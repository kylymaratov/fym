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
  MdOutlineQueueMusic,
} from 'react-icons/md';
import { LiaDownloadSolid } from 'react-icons/lia';
import { useContext, useEffect, useState } from 'react';
import RangeLine from '@/components/RangeLine';
import { toast } from 'react-toastify';
import { PlayerContext } from '@/context/PlayerContext';
import { SongTypes } from '@/types/song.types';
import { baseUrl } from '@/api/base.url';
import LoadingText from '@/components/LoadingText';
import UseVisible from '@/hooks/UseVisible';

function MusicPlayer() {
  const [showVolume, setShowVolume] = useState<boolean>(false);
  const [expandRange, setExpandRange] = useState<boolean>(false);
  const queueComp = UseVisible(false);
  const {
    state: {
      musicPlayer,
      playNow,
      lastVolume,
      loading,
      loadingProgress,
      quality,
      repeat,
      shuffle,
      playNext,
    },
    setPlayerState,
  } = useContext(PlayerContext);

  const setVolumeOnClick = (incomingVolume: number): void => {
    musicPlayer.volume = incomingVolume / 100;
  };

  const setCurrentTimeOnClick = (incomingTime: number): void => {
    musicPlayer.currentTime = incomingTime;
  };

  const setPlayOrPause = () => {
    return musicPlayer?.paused ? musicPlayer.play() : musicPlayer?.pause();
  };

  const startPlayer = (song: SongTypes): void => {
    try {
      const audioSource =
        baseUrl + `/song/listen?songId=${song.song_id}&quality=${quality}`;

      setPlayerState('loadingProgress', 0);
      setPlayerState('loading', true);
      musicPlayer.src = audioSource;
      setPlayOrPause();
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const formatMilliseconds = (incomingTime: number): string => {
    const seconds = Math.floor(incomingTime / 1000);

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  };

  const handleOnError = (error: string | ErrorEvent) => {
    if (typeof error === 'string') {
      toast(error, { type: 'error' });
    }
  };

  const handleTimeUpdate = (): void => {
    const progress: number =
      musicPlayer.buffered.length > 0
        ? (musicPlayer.buffered.end(0) / musicPlayer.duration) * 100
        : 0;
    setPlayerState('loadingProgress', Math.floor(progress));
  };

  const handleEnded = () => {
    if (repeat) {
      return musicPlayer.play();
    }

    nextSong();
  };

  const nextSong = () => {
    const currentSong = playNext.findIndex(
      (item) => item.song_id === playNow?.song_id,
    );

    if (typeof currentSong !== 'undefined' && playNext[currentSong + 1]) {
      setPlayerState('playNow', playNext[currentSong + 1]);
    }
  };

  const prevSong = () => {
    const currentSong = playNext.findIndex(
      (item) => item.song_id === playNow?.song_id,
    );
    if (typeof currentSong !== 'undefined' && playNext[currentSong - 1]) {
      setPlayerState('playNow', playNext[currentSong - 1]);
    }
  };

  const handleVolumeMuted = () => {
    if (musicPlayer.volume === 0) {
      musicPlayer.volume = lastVolume;
    } else {
      setPlayerState('lastVolume', musicPlayer.volume);
      musicPlayer.volume = 0;
    }
  };

  useEffect(() => {
    musicPlayer.autoplay = false;
    musicPlayer.onerror = handleOnError as OnErrorEventHandler;
    musicPlayer.ontimeupdate = handleTimeUpdate;
    musicPlayer.onended = handleEnded;
    musicPlayer.onloadedmetadata = () => {
      setPlayerState('loading', false);
    };
  }, [musicPlayer, playNow]);

  useEffect(() => {
    if (playNow) {
      startPlayer(playNow);
    }
  }, [playNow]);

  useEffect(() => {
    return () => {
      musicPlayer.pause();
      musicPlayer.src = '';
      setPlayerState('playNow', null);
    };
  }, []);

  if (!musicPlayer) return;

  return (
    <div
      className="w-full bg-black"
      onMouseEnter={() => setExpandRange(true)}
      onMouseLeave={() => setExpandRange(false)}
    >
      {playNow && (
        <div
          className={`duration-200 relative ${expandRange ? 'h-3.5' : 'h-1'}`}
        >
          <RangeLine
            current={(musicPlayer.currentTime / musicPlayer.duration) * 100}
            max={musicPlayer.duration}
            onChange={setCurrentTimeOnClick}
            progress={loadingProgress}
            times={{
              start: formatMilliseconds(musicPlayer.currentTime * 1000),
              end: formatMilliseconds(musicPlayer.duration * 1000),
            }}
            expandRange={expandRange}
          />
        </div>
      )}

      <div className="flex justify-center md:justify-between h-[50px] pl-3 pr-3 items-center mt-2 mb-2">
        <div className="items-center justify-start gap-4 w-[30%] md:flex hidden">
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
                <p className="text-sm">
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
          className={`flex items-center justify-center gap-4 w-[30%] ${
            !playNow ? 'opacity-50' : 'opacity-100'
          }`}
        >
          <button
            type="button"
            onClick={() => setPlayerState('shuffle', !shuffle)}
          >
            <MdShuffle size={22} />
          </button>
          <button type="button" disabled={!playNow} onClick={prevSong}>
            <MdOutlineSkipPrevious size={22} />
          </button>
          <button type="button" onClick={setPlayOrPause} disabled={!playNow}>
            {musicPlayer.paused ? (
              <FaPlayCircle size={28} />
            ) : (
              <FaPauseCircle size={28} />
            )}
          </button>
          <button type="button" disabled={!playNow} onClick={nextSong}>
            <MdOutlineSkipNext size={22} />
          </button>
          <button
            type="button"
            onClick={() => setPlayerState('repeat', !repeat)}
          >
            <MdRepeat size={22} />
          </button>
        </div>

        <div className="items-center justify-end gap-4 w-[30%] md:flex hidden">
          <button
            type="button"
            className="text-white"
            onClick={() =>
              queueComp.setIsComponentVisible(!queueComp.isComponentVisible)
            }
          >
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
              {musicPlayer.volume === 0 ? (
                <MdVolumeOff size={22} />
              ) : musicPlayer.volume >= 70 ? (
                <MdVolumeUp size={22} />
              ) : (
                <MdVolumeDown size={22} />
              )}
            </button>
            <div
              className={`duration-200 ${
                showVolume ? 'h-2 w-[70px]' : 'h-0 w-0'
              }`}
            >
              <RangeLine
                max={100}
                current={musicPlayer.volume * 100}
                onChange={setVolumeOnClick}
              />
            </div>
          </div>
        </div>
        {playNext.length && queueComp.isComponentVisible ? (
          <div
            ref={queueComp.ref}
            id="queue"
            className="fixed right-8 bottom-20 bg-secondary p-4 w-[400px] z-50 rounded-lg shadow-sm shadow-secondary"
          >
            <p className="text-md font-bold">Play next</p>
            {playNext.map((song) => (
              <div
                key={song.song_id}
                className="my-2 flex justify-between items-center"
              >
                <div className="flex justify-start items-center">
                  <img
                    src={`https://i.ytimg.com/vi/${song.song_id}/mqdefault.jpg`}
                    loading="lazy"
                    alt="cover"
                    className="w-[50px] h-[50px] object-cover"
                  />
                  <div className="ml-3 md:ml-5">
                    {song.title ? (
                      <>
                        <p className="text-sm">{song.title.slice(0, 30)}</p>
                        <p className="text-sm text-gray-400">
                          {song.artist?.slice(0, 30) ||
                            song.author?.slice(0, 30)}
                        </p>
                      </>
                    ) : (
                      <p>{song.original_title.slice(0, 30)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {playNow && (
        <div className="md:hidden block">
          <p className="text-sm text-center my-4">
            Playing : {playNow.original_title}
          </p>
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;