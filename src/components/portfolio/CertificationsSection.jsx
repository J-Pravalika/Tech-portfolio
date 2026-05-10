import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeading from './SectionHeading';

const certifications = [
  { issuer: 'Cisco', title: 'Python Essentials 1', color: 'primary' },
  { issuer: 'Oracle', title: 'Data Platform Certified Foundations Associate', color: 'accent' },
  { issuer: 'JPMorgan Chase', title: 'Software Engineering Simulation', color: 'primary' },
  { issuer: 'Accenture UK', title: 'Developer & Technology Simulation', color: 'accent' },
];

export default function CertificationsSection() {
  return (
    <SectionWrapper id="certifications">
      <SectionHeading
        label="// 07. Certifications"
        title="Verified Credentials"
        subtitle="Industry-recognized certifications validating skills across multiple domains."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ scale: 1.04, y: -4 }}
            className="glass rounded-xl p-5 group hover:glow-cyan transition-all duration-300 cursor-default"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
              cert.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
            }`}>
              <BadgeCheck className={`w-5 h-5 ${
                cert.color === 'primary' ? 'text-primary' : 'text-accent'
              }`} />
            </div>
            <p className={`font-mono text-xs font-semibold mb-1 ${
              cert.color === 'primary' ? 'text-primary' : 'text-accent'
            }`}>
              {cert.issuer}
            </p>
            <h3 className="font-heading text-sm font-semibold text-foreground leading-snug">
              {cert.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}