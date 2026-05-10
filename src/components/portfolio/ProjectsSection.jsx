import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Radio, X, ExternalLink, Github, Sparkles } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeading from './SectionHeading';

const projects = [
  {
    id: 'legal-decoder',
    title: 'Legal Decoder',
    emoji: '🤖',
    subtitle: 'AI-Powered Contract Analyzer',
    badge: 'AI / NLP',
    badgeColor: 'primary',
    icon: Brain,
    shortDesc: 'An intelligent tool that leverages NLP and LLMs to analyze legal contracts, extract clauses, identify risks, and highlight obligations.',
    details: [
      'AI-powered contract analysis using NLP & LLM integration',
      'Automatically extracts clauses, risks, and obligations',
      'Backend logic optimization with debugging improvements',
      'Streamlined legal document review process',
      'Reduced manual analysis time significantly',
    ],
    tags: ['Python', 'NLP', 'LLM', 'AI', 'Backend'],
    liveUrl: 'https://legal-decoder-ten.vercel.app',
    githubUrl: null,
  },
  {
    id: 'morse-master',
    title: 'Morse Master',
    emoji: '📡',
    subtitle: 'Interactive Morse Code Translator',
    badge: 'Interactive',
    badgeColor: 'accent',
    icon: Radio,
    shortDesc: 'A real-time Morse code translator and learning assistant with adaptive learning, encoding/decoding capabilities, and responsive UI.',
    details: [
      'Real-time Morse code encoding and decoding',
      'Adaptive learning system that adjusts difficulty',
      'Interactive visual blink-signal effect for Morse code',
      'Fully responsive and accessible UI design',
      'Gamified learning experience for beginners',
    ],
    tags: ['JavaScript', 'UI/UX', 'Education', 'Interactive'],
    liveUrl: 'https://j-pravalika.github.io/MORSE-MASTER/',
    githubUrl: 'https://j-pravalika.github.io/MORSE-MASTER/',
  },
];

function MorseDemo() {
  const [signal, setSignal] = useState(false);

  const blinkMorse = (code) => {
    let i = 0;
    const play = () => {
      if (i >= code.length) { setSignal(false); return; }
      const ch = code[i];
      if (ch === '.') {
        setSignal(true);
        setTimeout(() => { setSignal(false); i++; setTimeout(play, 150); }, 200);
      } else if (ch === '-') {
        setSignal(true);
        setTimeout(() => { setSignal(false); i++; setTimeout(play, 150); }, 500);
      } else {
        i++;
        setTimeout(play, 400);
      }
    };
    play();
  };

  return (
    <div className="flex items-center gap-4 mt-3">
      <button
        onClick={() => blinkMorse('.... ..')}
        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all min-h-[44px]"
      >
        Blink "HI"
      </button>
      <div className={`w-4 h-4 rounded-full transition-all duration-100 ${
        signal ? 'bg-primary shadow-lg shadow-primary/50' : 'bg-muted'
      }`} />
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="glass-strong rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{project.emoji}</span>
            <div>
              <h3 className="font-heading text-2xl font-bold text-foreground">{project.title}</h3>
              <p className="text-muted-foreground text-sm">{project.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-muted-foreground mb-6">{project.shortDesc}</p>

        <h4 className="font-heading font-semibold text-foreground mb-3">Key Features</h4>
        <ul className="space-y-2 mb-6">
          {project.details.map((detail, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 text-muted-foreground text-sm"
            >
              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              {detail}
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
              {tag}
            </span>
          ))}
        </div>

        {project.id === 'morse-master' && <MorseDemo />}

        <div className="flex gap-3 mt-6 pt-4 border-t border-border/50">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg glass text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm min-h-[44px]"
            >
              <Github className="w-4 h-4" /> Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-2 text-sm min-h-[44px]"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        label="// 05. Projects"
        title="Featured Work"
        subtitle="A showcase of impactful projects demonstrating AI integration, problem-solving, and clean engineering."
      />

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            onClick={() => setSelectedProject(project)}
            className="glass rounded-2xl p-6 cursor-pointer group hover:glow-cyan transition-all duration-500 relative overflow-hidden"
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <span className="text-4xl">{project.emoji}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-mono border ${
                  project.badgeColor === 'primary'
                    ? 'bg-primary/10 text-primary border-primary/20'
                    : 'bg-accent/10 text-accent border-accent/20'
                }`}>
                  {project.badge}
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{project.subtitle}</p>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.shortDesc}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono text-muted-foreground bg-muted/50">
                    {tag}
                  </span>
                ))}
              </div>

              {project.id === 'morse-master' && <MorseDemo />}

              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors font-mono min-h-[44px]"
                  >
                    <ExternalLink className="w-3 h-3" /> Live
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}