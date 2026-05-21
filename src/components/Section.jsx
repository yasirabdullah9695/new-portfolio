import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = delay => ({ hidden: {}, visible: { transition: { staggerChildren: delay } } });

export default function Section({ id, label, children, bg = '#ebe4d7' }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id={id} ref={ref} style={{ padding: '7rem 3rem', background: bg, position: 'relative' }}>
      <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger(0.1)}>
        <motion.div variants={fadeLeft} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', letterSpacing: '0.2em', color: '#bbb' }}>0{String(['about', 'projects', 'skills', 'experience', 'contact'].indexOf(id) + 1).padStart(2, '0')}</span>
          <div style={{ width: 36, height: 1, background: '#ccc' }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>{label}</h2>
        </motion.div>
        {children}
      </motion.div>
    </section>
  );
}
