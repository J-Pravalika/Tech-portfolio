import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Bug, Rocket, CheckCircle } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeading from './SectionHeading';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-heading text-3xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
}

const responsibilities = [
  { icon: Rocket, text: 'Built technical solutions for student projects' },
  { icon: Bug, text: 'Debugging, testing & performance improvement' },
  { icon: Users, text: 'Mentored 200+ students in coding & problem-solving' },
  { icon: CheckCircle, text: 'Managed multiple tasks in fast-paced environment' },
];

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        label="// 04. Experience"
        title="Professional Journey"
        subtitle="Hands-on experience building, debugging, and mentoring in a collaborative tech environment."
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 md:p-8 hover:glow-cyan transition-all duration-500"
        >
          {/* Header */}
          <div className="flex flex-wrap gap-4 items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground">Technical Member</h3>
                  <p className="text-muted-foreground">SCOPE Club — MLRIT</p>
                </div>
              </div>
            </div>
            <span className="font-mono text-sm text-accent px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              Nov 2024 – Apr 2025
            </span>
          </div>

          {/* Responsibilities */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {responsibilities.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <item.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Impact Counters */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-muted/20">
              <AnimatedCounter target={200} suffix="+" />
              <p className="text-xs text-muted-foreground mt-1">Students Mentored</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/20">
              <AnimatedCounter target={15} suffix="+" />
              <p className="text-xs text-muted-foreground mt-1">Projects Supported</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-muted/20">
              <AnimatedCounter target={6} />
              <p className="text-xs text-muted-foreground mt-1">Months Active</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}