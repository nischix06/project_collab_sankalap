'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, ExternalLink } from 'lucide-react';

const members = [
  { name: "Alex Rivers", role: "Lead Architect", bio: "Former core dev at major protocols. Building the spine of our network." },
  { name: "Sita Sharma", role: "Interface Visionary", bio: "Designing experiences that feel like living breathing organisms." },
  { name: "Marcus Chen", role: "Security Guardian", bio: "Ensuring the integrity of every byte moved within our systems." }
];

export const MemberSpotlight = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/30 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Architects</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden bg-white dark:bg-slate-950 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800"
            >
              <div className="mb-6 relative w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm font-mono mb-4">{member.role}</p>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {member.bio}
              </p>

              <div className="flex gap-4">
                <Github size={20} className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors" />
                <Twitter size={20} className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors" />
                <ExternalLink size={20} className="text-slate-400 hover:text-indigo-500 cursor-pointer transition-colors" />
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
