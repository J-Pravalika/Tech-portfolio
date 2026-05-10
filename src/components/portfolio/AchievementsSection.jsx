import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeading from './SectionHeading';

const achievements = [
  {
    icon: Trophy,
    title: '1st Runner Up',
    event: 'Coursevita Hackathon',
    description: 'AI Skill Exchange Platform — Built a full-stack AI-powered skill matching system in a competitive hackathon environment.',
    color: 'primary',
  },
  {
    icon: Award,
    title: 'Best Prototype',
    event: 'AI Innovation Challenge',
    description: 'AI Chatbot System — Developed a cutting-edge conversational AI prototype that won the best prototype award.',
    color: 'accent',
  },
];

export default function AchievementsSection() {
  return (
    <SectionWrapper id="achievements">
      <SectionHeading
        label="// 06. Achievements"
        title="Competitive Wins"
        subtitle="Recognition from hackathons and innovation challenges that validate technical excellence."
      />

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            whileHover={{ scale: 1.03, y: -6 }}
            className={`glass rounded-2xl p-6 md:p-8 relative overflow-hidden group cursor-default transition-all duration-500 ${
              item.color === 'primary' ? 'hover:glow-cyan' : 'hover:glow-violet'
            }`}
          >
            {/* Spotlight effect */}
            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl ${
              item.color === 'primary' ? 'bg-primary/20' : 'bg-accent/20'
            }`} />

            <div className="relative">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
                  item.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                }`}
              >
                <item.icon className={`w-7 h-7 ${
                  item.color === 'primary' ? 'text-primary' : 'text-accent'
                }`} />
              </motion.div>

              <div className={`inline-block px-3 py-1 rounded-full text-xs font-mono mb-3 ${
                item.color === 'primary'
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'bg-accent/10 text-accent border border-accent/20'
              }`}>
                🏆 {item.title}
              </div>

              <h3 className="font-heading text-xl font-bold text-foreground mb-2">{item.event}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}