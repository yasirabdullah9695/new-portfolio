import { motion } from 'framer-motion';

const contactItems = [
  { label: 'Email', val: 'yasirsabdullah02@gmail.com', href: 'mailto:yasirsabdullah02@gmail.com' },
  { label: 'Phone', val: '+91 9669397762', href: 'tel:+919669397762' },
  { label: 'LinkedIn', val: 'linkedin.com/in/yasir', href: 'https://www.linkedin.com/in/yasir-abdullah-655314313/'},

  { label: 'GitHub', val: 'github.com/yasir', href: 'https://github.com/yasirabdullah9695' },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '8rem 3rem', background: '#111', color: '#ebe4d7', position: 'relative', overflow: 'hidden' }}>
      {[55, 38].map((size, index) => (
        <motion.div
          key={size}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            right: '-12%',
            bottom: '-25%',
            width: `${size}vw`,
            height: `${size}vw`,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
            pointerEvents: 'none',
          }}
        />
      ))}

      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#555', marginBottom: '1rem' }}>
          — Let's build something
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.03em', margin: '0 0 3.5rem', maxWidth: '680px' }}>
          Let's Work
          <br />
          <em style={{ fontStyle: 'italic', color: '#555' }}>Together.</em>
        </h2>

        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginBottom: '5rem' }}>
          {contactItems.map(item => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.25)' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                textDecoration: 'none',
                padding: '1.2rem 1.8rem',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '4px',
                minWidth: '160px',
                transition: 'border-color 0.3s ease',
              }}
            >
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555' }}>{item.label}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: '#ebe4d7' }}>{item.val}</span>
            </motion.a>
          ))}
        </div>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: '#444', letterSpacing: '0.08em' }}>
          © 2025 Yasir Abdullah · Bhopal, Madhya Pradesh
        </p>
      </motion.div>
    </section>
  );
}
