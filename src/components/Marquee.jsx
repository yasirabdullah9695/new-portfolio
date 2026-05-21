import { motion } from 'framer-motion';

export default function Marquee() {
  const items = ['MERN Stack', 'React.js', 'Node.js', 'Python', 'Data Analytics', 'WebRTC', 'MongoDB', 'Power BI', 'Full-Stack Dev', 'REST APIs', 'CI/CD'];

  return (
    <div style={{ overflow: 'hidden', padding: '1.8rem 0', background: '#d9d0c0', borderTop: '1px solid rgba(0,0,0,0.08)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap' }}>
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontStyle: 'italic', color: '#888', flexShrink: 0 }}>
            {item}
            <span style={{ color: '#bbb', marginLeft: '1.5rem' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
