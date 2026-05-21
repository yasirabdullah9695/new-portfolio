import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectHoverCard from './ProjectHoverCard';

export default function ProjectRow({ p, i }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <>
      <motion.div
        data-cursor="project"
        variants={fadeUp}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onMouseMove={e => setMouse({ x: e.clientX, y: e.clientY })}
        onClick={() => p.link && window.open(p.link, '_blank', 'noopener,noreferrer')}
        style={{ cursor: 'pointer' }}
        whileHover={{ x: 8 }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr auto',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '1.6rem 0',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            background: hovered ? 'rgba(255,255,255,0.4)' : 'transparent',
            transition: 'background 0.3s ease, padding 0.3s ease',
            borderRadius: '4px',
            paddingLeft: hovered ? '1rem' : '0',
          }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#bbb', letterSpacing: '0.1em' }}>0{i + 1}</span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
              <span style={{ fontSize: '1.1rem' }}>{p.emoji}</span>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 'clamp(1rem, 2vw, 1.4rem)', margin: 0, letterSpacing: '-0.01em' }}>{p.title}</p>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#aaa' }}>{p.sub}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {p.stack.slice(0, 4).map(skill => (
                <span key={skill} style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', padding: '2px 8px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '2px', color: '#888' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#bbb' }}>{p.year}</span>
            <motion.div
              animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.3 }}
              transition={{ duration: 0.25 }}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: '1px solid #1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
              }}
            >
              →
            </motion.div>
          </div>
        </div>
      </motion.div>
      <ProjectHoverCard p={p} mouseX={mouse.x} mouseY={mouse.y} visible={hovered} />
    </>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
