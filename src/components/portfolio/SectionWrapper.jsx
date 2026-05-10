import React from 'react';
import { motion } from 'framer-motion';

export default function SectionWrapper({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative py-12 md:py-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  );
}