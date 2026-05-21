import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 220, damping: 24 });
  const sy = useSpring(my, { stiffness: 220, damping: 24 });
  const [state, setState] = useState('default');

  useEffect(() => {
    const handleMove = e => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };

    const handleOver = e => {
      if (e.target.closest("[data-cursor='project']")) setState('project');
      else if (e.target.closest('a,button')) setState('hover');
      else setState('default');
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [mx, my]);

  const size = state === 'project' ? 60 : state === 'hover' ? 44 : 10;
  const bg = state === 'project' ? 'rgba(26,26,26,0.85)' : state === 'hover' ? 'transparent' : '#1a1a1a';
  const border = state !== 'default' ? '1.5px solid #1a1a1a' : 'none';

  return (
    <>
      <motion.div
        style={{
          left: sx,
          top: sy,
          x: '-50%',
          y: '-50%',
          position: 'fixed',
          zIndex: 9999,
          pointerEvents: 'none',
          width: size,
          height: size,
          borderRadius: '50%',
          background: bg,
          border,
          transition: 'width 0.22s ease, height 0.22s ease, background 0.22s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'multiply',
        }}
      >
        {state === 'project' && (
          <span
            style={{
              color: '#f8f5ee',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            View →
          </span>
        )}
      </motion.div>
      <motion.div
        style={{
          left: mx,
          top: my,
          x: '-50%',
          y: '-50%',
          position: 'fixed',
          zIndex: 9998,
          pointerEvents: 'none',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#1a1a1a',
        }}
      />
    </>
  );
}
