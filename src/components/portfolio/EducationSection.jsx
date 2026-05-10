import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, School } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeading from './SectionHeading';

const education = [
  {
    icon: GraduationCap,
    degree: 'B.Tech in Computer Science Engineering',
    institution: 'Marri Laxman Reddy Institute of Technology',
    period: '2023 – 2027',
    grade: 'CGPA: 9.12',
    color: 'primary',
  },
  {
    icon: BookOpen,
    degree: 'Intermediate (MPC)',
    institution: 'Narayana Junior College',
    period: '2021 – 2023',
    grade: 'GPA: 9.55',
    color: 'accent',
  },
  {
    icon: School,
    degree: 'CBSE (Class X)',
    institution: 'Gateway International High School',
    period: '2020 – 2021',
    grade: 'GPA: 9.8',
    color: 'primary',
  },
];

export default function EducationSection() {
  return (
    <SectionWrapper id="education">
      <SectionHeading
        label="// 02. Education"
        title="Academic Journey"
        subtitle="A consistent track record of academic excellence and intellectual growth."
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-accent/40 to-primary/40 md:-translate-x-[1px]" />

        {education.map((item, i) => (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className={`relative mb-12 last:mb-0 pl-16 md:pl-0 ${
              i % 2 === 0 ? 'md:pr-[calc(50%+2rem)] md:text-right' : 'md:pl-[calc(50%+2rem)]'
            }`}
          >
            {/* Timeline Dot */}
            <motion.div
              whileInView={{ scale: [0, 1.3, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
              className={`absolute left-4 md:left-1/2 top-2 w-4 h-4 rounded-full border-2 -translate-x-1/2 ${
                item.color === 'primary'
                  ? 'border-primary bg-primary/30'
                  : 'border-accent bg-accent/30'
              }`}
            >
              <div
                className={`absolute inset-1 rounded-full animate-pulse-glow ${
                  item.color === 'primary' ? 'bg-primary' : 'bg-accent'
                }`}
              />
            </motion.div>

            {/* Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-xl p-6 hover:glow-cyan transition-all duration-300 group"
            >
              <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  item.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                }`}>
                  <item.icon className={`w-5 h-5 ${
                    item.color === 'primary' ? 'text-primary' : 'text-accent'
                  }`} />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{item.period}</span>
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                {item.degree}
              </h3>
              <p className="text-muted-foreground text-sm mb-2">{item.institution}</p>
              <span className={`inline-block font-mono text-sm font-semibold ${
                item.color === 'primary' ? 'text-primary' : 'text-accent'
              }`}>
                {item.grade}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}