import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const links = ['About', 'Projects', 'Skills', 'Experience', 'Contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = id => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 300,
        background: scrolled ? 'rgba(235,228,215,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.07)' : 'none',
        transition: 'all 0.4s ease',
        padding: '1.1rem 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <motion.span
        whileHover={{ scale: 1.05 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: '1.3rem',
          letterSpacing: '0.04em',
          cursor: 'pointer',
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        YA.
      </motion.span>
      <div style={{ display: 'flex', gap: '2.5rem' }}>
        {links.map(link => (
          <motion.button
            key={link}
            onClick={() => go(link)}
            whileHover={{ y: -2 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.78rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#1a1a1a',
              padding: 0,
            }}
          >
            {link}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
}
