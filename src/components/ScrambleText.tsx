import React, { useEffect, useRef, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
  triggerOnHover?: boolean;
}

const CHARS = '!<>-_\\/[]{}=+*^?#01';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  scrambleOnMount = true,
  triggerOnHover = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const startScramble = () => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    const duration = 600; // ms
    const startTime = performance.now();
    const length = text.length;

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const resolveIndex = Math.floor(progress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        if (text[i] === ' ') {
          result += ' ';
        } else if (i < resolveIndex) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      startScramble();
    }
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [text, scrambleOnMount]);

  return (
    <span
      className={`inline-block select-none ${className}`}
      onMouseEnter={() => triggerOnHover && startScramble()}
      aria-label={text}
    >
      {displayText}
    </span>
  );
};
