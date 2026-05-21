import { motion } from 'framer-motion';

export default function SkillTag({ skill }) {
  return (
    <motion.span
      variants={fadeUp}
      whileHover={{ scale: 1.07, background: '#1a1a1a', color: '#ebe4d7', borderColor: '#1a1a1a' }}
      style={{
        display: 'inline-block',
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.74rem',
        padding: '6px 14px',
        border: '1px solid rgba(0,0,0,0.14)',
        borderRadius: '2px',
        color: '#444',
        cursor: 'default',
        transition: 'all 0.22s ease',
      }}
    >
      {skill}
    </motion.span>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
