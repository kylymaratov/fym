import { useEffect, useRef, useState } from 'react';

interface Props {
  max: number;
  current: number;
  disabled?: boolean;
  progress?: number;
  onChange: (value: number) => void;
  times?: { start: string; end: string };
  expandRange?: boolean;
}

function RangeLine({
  current,
  disabled,
  max,
  onChange,
  progress,
  expandRange,
  times,
}: Props) {
  const [tempValue, setTempValue] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const rangeRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (rangeRef.current) {
      setShowTooltip(true);
      const rangeRect = rangeRef.current.getBoundingClientRect();
      const newLeft = Math.min(
        Math.max(event.clientX - rangeRect.left, 0),
        rangeRect.width,
      );
      const newValue = (newLeft / rangeRect.width) * max;
      setTempValue((Math.floor(newValue) / max) * 100);
    }
  };

  const handleMouseUp = () => {
    setShowTooltip(false);
    onChange(Math.floor(tempValue));
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTrackClick = (event: React.MouseEvent) => {
    if (rangeRef.current) {
      const rangeRect = rangeRef.current.getBoundingClientRect();
      const newLeft = Math.min(
        Math.max(event.clientX - rangeRect.left, 0),
        rangeRect.width,
      );
      const newValue = (newLeft / rangeRect.width) * max;
      onChange(newValue);
    }
  };

  useEffect(() => {
    if (thumbRef.current) {
      thumbRef.current.style.left = `${showTooltip ? tempValue : current}%`;
    }
  }, [showTooltip, tempValue, current]);

  return (
    <div
      ref={rangeRef}
      onClick={handleTrackClick}
      className={`relative w-full cursor-pointer overflow-hidden h-full 
        ${disabled && 'pointer-events-none'}`}
    >
      {times && expandRange && (
        <div
          className={`absolute z-50 -top-0.5 pr-3 pl-3 flex justify-between items-center w-full`}
        >
          <span className="text-sm text-gray-300">{times.start}</span>
          <span className="text-sm text-gray-300">{times.end}</span>
        </div>
      )}
      <div
        ref={thumbRef}
        onMouseDown={handleMouseDown}
        className="absolute h-full w-[10px] bg-gradient-to-br from-cyan-500 to-blue-500   z-30"
      ></div>
      <div
        className="absolute top-0 left-0 h-full bg-gradient-to-br from-cyan-500 to-blue-500   z-30"
        style={{ width: `${showTooltip ? tempValue : current}%` }}
      ></div>
      <div
        className="absolute top-0 left-0 h-full bg-gray-500   z-10"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default RangeLine;
