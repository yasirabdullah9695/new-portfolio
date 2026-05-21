import { useEffect, useState } from 'react';

export default function useTyping(words, speed = 120, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wIdx, setWIdx] = useState(0);
  const [cIdx, setCIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wIdx];
    let timeout;

    if (!deleting && cIdx <= word.length) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, cIdx));
        setCIdx(c => c + 1);
      }, speed);
    } else if (!deleting && cIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && cIdx > 0) {
      timeout = setTimeout(() => {
        setCIdx(c => c - 1);
        setDisplay(word.slice(0, cIdx - 1));
      }, speed / 2);
    } else {
      setDeleting(false);
      setWIdx(w => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [cIdx, deleting, wIdx, words, speed, pause]);

  return display;
}
