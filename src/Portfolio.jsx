import { useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Section from './components/Section';
import ProjectRow from './components/ProjectRow';
import ExpCard from './components/ExpCard';
import Marquee from './components/Marquee';
import Contact from './components/Contact';
import { PROJECTS, SKILLS, EXPERIENCE, CERTS } from './data/portfolioData';

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div style={{ background: '#ebe4d7', color: '#1a1a1a', minHeight: '100vh', cursor: 'none' }}>
      <Cursor />
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#1a1a1a',
          transformOrigin: '0%',
          zIndex: 400,
        }}
      />

      <Nav />
      <Hero />
      <Marquee />

      <Section id="projects" label="Selected Work" bg="#ebe4d7">
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          {PROJECTS.map((project, index) => (
            <ProjectRow key={project.id} p={project} i={index} />
          ))}
        </motion.div>
      </Section>

      <Section id="skills" label="Technical Skills" bg="#e0d8c8">
        <motion.div variants={stagger(0.08)} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
          <SkillsSection />
        </motion.div>
      </Section>

      <Section id="experience" label="Experience" bg="#ebe4d7">
        <div>
          {EXPERIENCE.map((experience, index) => (
            <ExpCard key={experience.index} e={experience} i={index} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: '4rem' }}
          >
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#aaa',
                marginBottom: '1.5rem',
              }}
            >
              Certifications
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '0.75rem' }}>
              {CERTS.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6, background: '#fff' }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '0.9rem 1.2rem',
                    border: '1px solid rgba(0,0,0,0.08)',
                    borderRadius: '4px',
                    background: 'rgba(255,255,255,0.5)',
                    transition: 'background 0.25s ease',
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1a1a1a', flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', color: '#444', lineHeight: 1.4 }}>{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      <Contact />
    </div>
  );
}

const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const stagger = (delay = 0.1) => ({ hidden: {}, visible: { transition: { staggerChildren: delay } } });

const CAT_META = {
  Languages: { icon: '⚡', color: '#4a8c5c', bg: '#edf5ef', stroke: '#4a8c5c', glow: '#4a8c5c', desc: 'Core programming languages' },
  'Web / MERN': { icon: '⚛', color: '#3d5a99', bg: '#eceef8', stroke: '#3d5a99', glow: '#3d5a99', desc: 'Full-stack web ecosystem' },
  'Data & AI': { icon: '◈', color: '#9c5d3a', bg: '#f8eeea', stroke: '#9c5d3a', glow: '#9c5d3a', desc: 'Analytics & machine learning' },
  Tools: { icon: '⚙', color: '#7a3d99', bg: '#f3eef8', stroke: '#7a3d99', glow: '#7a3d99', desc: 'Dev tools & platforms' },
};

const SKILL_RADIUS = 28;
const SKILL_CIRCUMFERENCE = 2 * Math.PI * SKILL_RADIUS;

function SkillOrb({ skill, delay = 0 }) {
  const categoryColor = skill.catColor || {};
  const strokeDash = (skill.level / 100) * SKILL_CIRCUMFERENCE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'default' }}
    >
      <div style={{ position: 'relative', width: 72, height: 72 }}>
        <svg width="72" height="72" viewBox="0 0 72 72" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="36" cy="36" r={SKILL_RADIUS} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="4" />
          <motion.circle
            cx="36"
            cy="36"
            r={SKILL_RADIUS}
            fill="none"
            stroke={categoryColor.stroke || '#1a1a1a'}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={SKILL_CIRCUMFERENCE}
            initial={{ strokeDashoffset: SKILL_CIRCUMFERENCE }}
            whileInView={{ strokeDashoffset: SKILL_CIRCUMFERENCE - strokeDash }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 0 6px ${categoryColor.glow || '#1a1a1a'}66)` }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.1rem' }}>{skill.icon}</span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.8, duration: 0.4 }}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: '#888', marginTop: 1 }}
          >
            {skill.level}%
          </motion.span>
        </div>
      </div>

      <span style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.65rem',
        color: '#555',
        textAlign: 'center',
        maxWidth: '80px',
        lineHeight: 1.3,
        letterSpacing: '0.02em',
      }}>
        {skill.name}
      </span>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{ width: '40px', height: '1.5px', background: categoryColor.stroke || '#1a1a1a', borderRadius: '2px', transformOrigin: 'center' }}
      />
    </motion.div>
  );
}

function SkillsSection() {
  const [activeTab, setActiveTab] = useState('Languages');
  const cats = Object.keys(SKILLS);

  return (
    <div>
      <div style={{ display: 'flex', gap: '0', marginBottom: '3.5rem', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
        {cats.map(cat => {
          const meta = CAT_META[cat];
          const active = cat === activeTab;
          return (
            <motion.button
              key={cat}
              onClick={() => setActiveTab(cat)}
              whileHover={{ background: active ? 'transparent' : 'rgba(255,255,255,0.5)' }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.9rem 1.6rem',
                position: 'relative',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                letterSpacing: '0.08em',
                color: active ? meta.color : '#888',
                fontWeight: active ? 600 : 400,
                transition: 'color 0.25s ease',
              }}
            >
              <span style={{ marginRight: '6px', fontSize: '0.9rem' }}>{meta.icon}</span>
              {cat}
              {active && (
                <motion.div
                  layoutId="activeTab"
                  style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: meta.color, borderRadius: '2px 2px 0 0' }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{
              width: 44, height: 44, borderRadius: '10px',
              background: CAT_META[activeTab].bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', color: CAT_META[activeTab].color, fontWeight: 700,
            }}>
              {CAT_META[activeTab].icon}
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.4rem', margin: '0 0 2px', letterSpacing: '-0.01em' }}>{activeTab}</h3>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#aaa', margin: 0, letterSpacing: '0.12em' }}>{CAT_META[activeTab].desc}</p>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, margin: 0, color: CAT_META[activeTab].color }}>
                {Math.round(SKILLS[activeTab].reduce((sum, item) => sum + item.level, 0) / SKILLS[activeTab].length)}%
              </p>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: '#bbb', margin: 0, letterSpacing: '0.12em' }}>AVG PROFICIENCY</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1.8rem 1.2rem' }}>
            {SKILLS[activeTab].map((skill, index) => (
              <SkillOrb key={skill.name} skill={{ ...skill, catColor: CAT_META[activeTab] }} delay={index * 0.06} />
            ))}
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SKILLS[activeTab].map((skill, index) => (
              <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#888', width: '130px', flexShrink: 0, letterSpacing: '0.04em' }}>{skill.name}</span>
                <div style={{ flex: 1, height: 4, background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: index * 0.07 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: '100%', background: CAT_META[activeTab].color, borderRadius: '4px' }}
                  />
                </div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: CAT_META[activeTab].color, width: '32px', textAlign: 'right' }}>{skill.level}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
