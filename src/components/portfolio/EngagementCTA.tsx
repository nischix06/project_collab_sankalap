'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const EngagementCTA = () => {
  return (
    <section className="py-24 bg-indigo-600 px-6 overflow-hidden relative">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to Shape the Future?</h2>
        <p className="text-xl text-indigo-100 mb-12 opacity-80">Join our community of over 1000 builders and start your journey today.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl flex items-center gap-3 mx-auto shadow-2xl shadow-black/20"
        >
          Become a Member <ArrowRight size={24} />
        </motion.button>
      </div>
      
      {/* Abstract Shapes */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 -left-1/2 w-[100%] aspect-square border-4 border-white/10 rounded-full pointer-events-none" 
      />
    </section>
  );
};
