import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import SectionHeading from './SectionHeading';

const categories = {
  All: null,
  Programming: 'programming',
  Databases: 'databases',
  'Core CS': 'core',
  Tools: 'tools',
  'Soft Skills': 'soft',
};

const skills = [
  { name: 'Java', level: 90, category: 'programming' },
  { name: 'Python', level: 85, category: 'programming' },
  { name: 'C', level: 75, category: 'programming' },
  { name: 'JavaScript', level: 70, category: 'programming' },

  { name: 'MySQL', level: 80, category: 'databases' },
  { name: 'MongoDB', level: 65, category: 'databases' },

  { name: 'DSA', level: 85, category: 'core' },
  { name: 'OOP', level: 90, category: 'core' },
  { name: 'DBMS', level: 80, category: 'core' },
  { name: 'SDLC', level: 75, category: 'core' },

  { name: 'GitHub', level: 85, category: 'tools' },
  { name: 'VS Code', level: 90, category: 'tools' },

  // ✅ UPDATED + ENHANCED SOFT SKILLS
  { name: 'Communication', level: 90, category: 'soft' },
  { name: 'Leadership', level: 85, category: 'soft' },
  { name: 'Problem Solving', level: 95, category: 'soft' },

  { name: 'Persuasive Storytelling', level: 88, category: 'soft' },
  { name: 'Stakeholder Management', level: 86, category: 'soft' },
  { name: 'Negotiation & Conflict Resolution', level: 84, category: 'soft' },
  { name: 'Public Speaking & Oratory', level: 90, category: 'soft' },
  { name: 'Active Listening', level: 92, category: 'soft' },
];

function SkillCard({ skill, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="glass rounded-xl p-4 group hover:glow-cyan transition-all duration-300 cursor-default flex items-center justify-center min-h-[56px]"
    >
      <span className="font-mono text-sm font-medium text-foreground group-hover:text-primary transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All'
      ? skills
      : skills.filter((s) => s.category === categories[active]);

  return (
    <SectionWrapper id="skills">
      <SectionHeading
        label="// 03. Skills"
        title="Tech Arsenal"
        subtitle="A diverse toolkit spanning programming languages, databases, core CS fundamentals, and professional soft skills."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-lg font-mono text-xs font-medium transition-all duration-300 min-h-[44px] ${
              active === cat
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'glass text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}