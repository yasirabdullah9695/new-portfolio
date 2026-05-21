import { motion, useScroll, useSpring } from 'framer-motion';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Section from './components/Section';
import ProjectRow from './components/ProjectRow';
import SkillTag from './components/SkillTag';
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
          {Object.entries(SKILLS).map(([category, skills]) => (
            <motion.div key={category} variants={fadeUp} style={{ marginBottom: '2.5rem' }}>
              <p
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.68rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#aaa',
                  marginBottom: '1rem',
                }}
              >
                {category}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {skills.map(skill => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
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
