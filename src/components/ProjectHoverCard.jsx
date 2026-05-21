import { AnimatePresence, motion } from 'framer-motion';

export default function ProjectHoverCard({ p, mouseX, mouseY, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 10 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            left: mouseX + 22,
            top: mouseY - 20,
            zIndex: 500,
            width: 300,
            background: '#1a1a1a',
            borderRadius: '6px',
            padding: '1.4rem 1.6rem',
            pointerEvents: 'none',
            boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '1.4rem' }}>{p.emoji}</span>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1rem', margin: 0, color: '#ebe4d7' }}>{p.title}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: '#777', margin: '2px 0 0', letterSpacing: '0.04em' }}>{p.year}</p>
            </div>
          </div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', lineHeight: 1.65, color: '#aaa', margin: '0 0 1rem' }}>{p.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {p.stack.map(tag => (
              <span key={tag} style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', padding: '3px 8px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '2px', color: '#888', letterSpacing: '0.05em' }}>
                {tag}
              </span>
            ))}
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#666' }}>
              Click to open →
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
