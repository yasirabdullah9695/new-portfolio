import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';

export default function ExpCard({ e, i }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '1.5rem' }}
    >
      <motion.div
        whileHover={{ background: 'rgba(255,255,255,0.55)' }}
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr auto',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '1.8rem 2rem',
          background: open ? '#fff' : 'rgba(255,255,255,0.35)',
          borderRadius: open ? '6px 6px 0 0' : '6px',
          border: '1px solid rgba(0,0,0,0.08)',
          cursor: 'pointer',
          transition: 'background 0.3s ease, border-radius 0.3s ease',
        }}
      >
        <div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: '#bbb', margin: '0 0 4px' }}>EXP — {e.index}</p>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', padding: '2px 8px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '2px', color: '#aaa' }}>{e.type}</span>
        </div>
        <div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.25rem', margin: '0 0 3px', letterSpacing: '-0.01em' }}>{e.co}</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', color: '#888', margin: 0, letterSpacing: '0.06em' }}>{e.role} · {e.date}</p>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.14)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            flexShrink: 0,
          }}
        >
          +
        </motion.div>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '1.5rem 2rem 2rem', background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderTop: 'none', borderRadius: '0 0 6px 6px' }}>
              <ul style={{ paddingLeft: '1.2rem', margin: '0 0 1.4rem' }}>
                {e.points.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.88rem', lineHeight: 1.75, color: '#444', marginBottom: '0.5rem' }}
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {e.tech.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 + index * 0.06, duration: 0.35 }}
                    whileHover={{ background: '#1a1a1a', color: '#ebe4d7', borderColor: '#1a1a1a' }}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.68rem',
                      padding: '3px 10px',
                      border: '1px solid rgba(0,0,0,0.12)',
                      borderRadius: '2px',
                      color: '#666',
                      transition: 'all 0.2s ease',
                      cursor: 'default',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
