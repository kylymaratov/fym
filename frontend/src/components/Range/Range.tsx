'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Range.module.scss';
import classNames from 'classnames';

interface Props {
  max: number;
  current: number;
  disabled?: boolean;
  progress?: number;
  onChange: (value: number) => void;
  className?: string;
}

export const Range: React.FC<Props> = ({
  current,
  disabled,
  max,
  className,
  onChange,
  progress,
}) => {
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
      onChange(Math.floor(newValue));
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
      className={`${classNames(styles.rangeSlider, className)} ${
        disabled ? styles.disabled : ''
      }`}
    >
      <div
        ref={thumbRef}
        onMouseDown={handleMouseDown}
        className={styles.thumb}
        style={{ transition: 'all .3s' }}
      ></div>
      <div
        className={styles.filledTrack}
        style={{
          transition: showTooltip ? 'none' : 'all .3s',
          width: `${showTooltip ? tempValue : current}%`,
        }}
      ></div>
      <div
        className={styles.progressTrack}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
