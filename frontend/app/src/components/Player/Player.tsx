import { useAppSelector } from '../../app/hooks';
import { Range } from '../Range/Range';
import { UsePlayer } from './UsePlayer';
import { FaPlayCircle } from 'react-icons/fa';
import {
  MdOutlineSkipPrevious,
  MdOutlineSkipNext,
  MdOutlineFavoriteBorder,
} from 'react-icons/md';
import { MdShuffle } from 'react-icons/md';
import { MdRepeat } from 'react-icons/md';
import { MdOutlineHighQuality } from 'react-icons/md';
import { FaPauseCircle } from 'react-icons/fa';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { MdFullscreen } from 'react-icons/md';
import { LiaDownloadSolid } from 'react-icons/lia';
import { MdHighQuality } from 'react-icons/md';
import { Tooltip } from '../Tooltip/Tooltip';
import { FaVolumeMute, FaVolumeUp, FaVolumeDown } from 'react-icons/fa';

export const MusicPlayer: React.FC = () => {
  const { playNow } = useAppSelector((state) => state.player);
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
  } = UsePlayer();

  const valumeHandler = () => {
    if (volume === 0) {
      setVolumeOnClick(lastVolume);
    } else {
      setVolumeOnClick(0);
      setLastVolume(volume);
    }
  };

  return (
    <div className="h-[80px] p-2 pl-4 pr-4 pl- flex justify-between items-center shadow-lg border-t-2 border-secondary shadow-secondary w-full">
      <div className="flex w-1/4 justify-start items-center">
        {playNow && (
          <img
            src={`https://i3.ytimg.com/vi/${playNow?.sourceId}/hqdefault.jpg`}
            alt="cover"
            width={60}
            height={60}
            className="rounded-md"
          />
        )}
        <div className="ml-4">
          <p className="text-slate-100"> {playNow?.title}</p>
          <p className="text-sm  dark:text-slate-300">{playNow?.author}</p>
        </div>
        {playNow && (
          <div className="ml-10">
            <Tooltip title="Add to favorite">
              <button className="mr-6 text-red-400">
                <MdOutlineFavoriteBorder size={22} />
              </button>
            </Tooltip>
          </div>
        )}
      </div>
      <div className="w-1/3">
        <div className="m-auto w-full flex items-center justify-center">
          <button
            type="button"
            className={`mr-4 ${repeat && 'text-blue-400'}`}
            onClick={() => setRepeat(!repeat)}
          >
            <MdRepeat size={22} />
          </button>
          <button
            type="button"
            disabled={!playNow}
            className="disabled:text-gray-400"
          >
            <MdOutlineSkipPrevious size={26} />
          </button>
          <button
            type="button"
            className="ml-3 mr-3 hover:scale-95 disabled:text-gray-400"
            onClick={setPlayOrPause}
            disabled={!playNow}
          >
            {paused ? <FaPlayCircle size={28} /> : <FaPauseCircle size={28} />}
          </button>
          <button
            type="button"
            disabled={!playNow}
            className="disabled:text-gray-400"
          >
            <MdOutlineSkipNext size={26} />
          </button>
          <button type="button" onClick={() => setShuffle(!shuffle)}>
            <MdShuffle
              size={22}
              className={`ml-4 ${shuffle && 'text-blue-400'}`}
            />
          </button>
        </div>
        <div className="flex justify-center items-center mt-1.5">
          <span className="text-sm font-normal text-slate-300 mr-3">
            {times.start}
          </span>
          <Range
            width={550}
            progress={loadProgress}
            current={(currentTime / duration) * 100}
            max={duration}
            onChange={setCurrentTimeOnClick}
          />
          <span className="text-sm font-normal text-slate-300 ml-3">
            -{times.end}
          </span>
        </div>
      </div>
      <div className="flex w-1/4 justify-end items-center">
        <Tooltip title="Quality">
          <button
            type="button"
            className="mr-5"
            onClick={() => setQuality(quality === 'low' ? 'high' : 'low')}
          >
            {quality === 'high' ? (
              <MdHighQuality size={26} />
            ) : (
              <MdOutlineHighQuality size={26} />
            )}
          </button>
        </Tooltip>
        <Tooltip title="Save">
          <button
            type="button"
            className="mr-5 disabled:text-gray-400"
            disabled={!playNow}
          >
            <LiaDownloadSolid size={22} />
          </button>
        </Tooltip>
        <Tooltip title="Queue">
          <button
            type="button"
            className="mr-5 disabled:text-gray-400"
            disabled={!playNow}
          >
            <MdOutlineQueueMusic size={22} />
          </button>
        </Tooltip>
        <div className="flex items-center">
          <button type="button" className="mr-2" onClick={valumeHandler}>
            {volume === 0 ? (
              <FaVolumeMute size={20} />
            ) : volume > 70 ? (
              <FaVolumeUp size={20} />
            ) : (
              <FaVolumeDown size={20} />
            )}
          </button>
          <Range
            width={90}
            max={100}
            current={volume}
            onChange={setVolumeOnClick}
          />
        </div>

        <div className="mr-5 flex items-center"></div>
        <button
          type="button"
          disabled={!playNow}
          className="disabled:text-gray-400"
        >
          <MdFullscreen size={20} />
        </button>
      </div>
    </div>
  );
};
