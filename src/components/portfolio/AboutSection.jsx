import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Code2, Brain, Users, Zap, MapPin, GraduationCap, Cpu } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeading from './SectionHeading';

const highlights = [
  {
    icon: Code2,
    label: 'Strong Coder',
    desc: 'Proficient in Java, Python, SQL, and modern frameworks',
    color: 'primary',
    delay: 0,
  },
  {
    icon: Brain,
    label: 'AI Passionate',
    desc: 'Building intelligent applications with NLP & LLMs',
    color: 'accent',
    delay: 0.1,
  },
  {
    icon: Users,
    label: 'Team Player',
    desc: 'Mentored 200+ students in coding & problem-solving',
    color: 'primary',
    delay: 0.2,
  },
  {
    icon: Zap,
    label: 'Fast Learner',
    desc: 'Hackathon winner with rapid prototyping skills',
    color: 'accent',
    delay: 0.3,
  },
];

const stats = [
  { value: '9.12', label: 'CGPA', color: 'primary' },
  { value: '200+', label: 'Mentored', color: 'accent' },
  { value: '2', label: 'Hackathons Won', color: 'primary' },
];

const tags = ['Java', 'Python', 'DSA', 'AI/ML', 'NLP', 'React', 'SQL', 'OOP'];

// Animated counter
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target);
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num < 10 ? (eased * num).toFixed(2) : Math.floor(eased * num);
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-heading text-2xl md:text-3xl font-bold">
      {count}{suffix}
    </span>
  );
}

// Magnetic card effect
function MagneticCard({ children, className }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 8);
    rotateY.set(dx * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated terminal/profile card
function ProfileVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const lines = [
    { text: '> whoami', color: 'text-primary', delay: 0.2 },
    { text: 'Jaupula Pravalika', color: 'text-foreground font-semibold', delay: 0.5 },
    { text: '> cat role.txt', color: 'text-primary', delay: 0.9 },
    { text: 'CSE Student @ MLRIT', color: 'text-muted-foreground', delay: 1.2 },
    { text: '> skills --top', color: 'text-primary', delay: 1.6 },
    { text: 'Java  Python  AI/ML  React', color: 'text-accent', delay: 1.9 },
    { text: '> status', color: 'text-primary', delay: 2.4 },
    { text: '● Open to Opportunities', color: 'text-green-400', delay: 2.7 },
  ];

  return (
    <div ref={ref} className="relative w-full">
      {/* Glow blobs */}
      <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* Terminal window */}
      <MagneticCard className="relative glass rounded-2xl overflow-hidden border border-border/40 shadow-2xl shadow-primary/5">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-muted/20">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">pravalika@portfolio ~ </span>
        </div>

        {/* Terminal body */}
        <div className="p-5 font-mono text-sm space-y-1.5 min-h-[240px]">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: line.delay, ease: 'easeOut' }}
              className={line.color}
            >
              {line.text}
              {i === lines.length - 1 && inView && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1 inline-block w-2 h-4 bg-primary align-middle"
                />
              )}
            </motion.div>
          ))}
        </div>
      </MagneticCard>

      {/* Floating badges */}
      {[
        { icon: MapPin, text: 'Hyderabad, IN', top: '-top-4', left: 'left-4', delay: 1.5 },
        { icon: GraduationCap, text: 'B.Tech CSE', bottom: '-bottom-4', right: 'right-4', delay: 2.0 },
        { icon: Cpu, text: 'AI Builder', top: 'top-1/2', right: '-right-2', delay: 2.5 },
      ].map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: badge.delay, type: 'spring', stiffness: 200 }}
          className={`absolute ${badge.top || ''} ${badge.bottom || ''} ${badge.left || ''} ${badge.right || ''} flex items-center gap-1.5 px-3 py-1.5 glass rounded-full border border-primary/20 shadow-lg`}
          style={{ zIndex: 10 }}
        >
          <badge.icon className="w-3 h-3 text-primary" />
          <span className="text-xs font-mono text-foreground whitespace-nowrap">{badge.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <SectionWrapper id="about">
      <SectionHeading
        label="// 01. About"
        title="Who I Am"
        subtitle="A passionate developer driven by curiosity and the desire to build meaningful technology."
      />

      <div ref={sectionRef} className="grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT — Text + Stats + Tags */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-8"
        >
          {/* Paragraphs */}
          <motion.div variants={itemVariants} className="space-y-5">
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm{' '}
              <span className="text-foreground font-semibold">Jaupula Pravalika</span>, a final-year
              B.Tech Computer Science Engineering student at MLRIT, Hyderabad. With a strong foundation in{' '}
              <span className="text-primary font-medium">Java, Python, DSA, and OOP</span>, I'm passionate about
              creating technology that solves real-world problems.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              My journey spans competitive coding to{' '}
              <span className="text-accent font-medium">AI-powered applications</span>, winning hackathons, and
              mentoring fellow students. I thrive where analytical thinking meets creative problem-solving.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex-1 min-w-[90px] text-center px-5 py-4 glass rounded-2xl border border-border/40 hover:border-primary/30 transition-all duration-300 hover:glow-cyan group"
              >
                <div className={stat.color === 'primary' ? 'text-primary' : 'text-accent'}>
                  <Counter
                    target={parseFloat(stat.value)}
                    suffix={stat.value.includes('+') ? '+' : ''}
                  />
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-mono">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Skill tags */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Core Stack</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.6 + i * 0.07, type: 'spring', stiffness: 220 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-primary/8 text-primary border border-primary/20 cursor-default hover:bg-primary/15 hover:border-primary/40 transition-all duration-200"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Highlight cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass rounded-xl p-4 group border border-border/30 hover:border-primary/30 hover:glow-cyan transition-all duration-300 cursor-default"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors duration-300 ${
                    item.color === 'primary'
                      ? 'bg-primary/10 group-hover:bg-primary/20'
                      : 'bg-accent/10 group-hover:bg-accent/20'
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 ${item.color === 'primary' ? 'text-primary' : 'text-accent'}`}
                  />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-sm mb-1">{item.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Animated Terminal + Floating badges */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center"
        >
          <ProfileVisual />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}