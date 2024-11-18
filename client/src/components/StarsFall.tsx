import { useEffect, useState, useRef } from 'react';

interface Star {
  id: number;
  left: string;
  delay: string;
  duration: string;
}

export default function Starfall() {
  const [stars, setStars] = useState<Star[]>([]);
  const [animationStarted, setAnimationStarted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const generateStars = () => {
      const starArray: Star[] = [];
      for (let i = 0; i < 50; i++) {
        starArray.push({
          id: i,
          left: `${Math.random() * 100}vw`,
          delay: `${Math.random() * 10}s`,
          duration: `${10 + Math.random() * 10}s`,
        });
      }
      setStars(starArray);
    };

    generateStars();

    timerRef.current = setTimeout(() => {
      setAnimationStarted(true);
    }, 5000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute w-[2px] h-[2px] bg-white rounded-full ${animationStarted ? 'animate-starfall' : ''}`}
          style={{
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        ></div>
      ))}
    </div>
  );
}
