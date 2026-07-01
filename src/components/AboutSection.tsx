/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Info, Target, Compass, Milestone, ShieldCheck, Ship, Landmark } from "lucide-react";
import { ABOUT_INFO } from "../data";

export default function AboutSection() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
          About Okpoama Kingdom & OYM
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Explore the rich historical heritage, coastal geography, and foundational mission of the Okpoama Youth Movement.
        </p>
      </div>

      {/* Main split: Narrative & Geography */}
      <div className="grid md:grid-cols-5 gap-6 md:gap-8 items-start">
        {/* Editorial Text */}
        <div className="md:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Landmark className="w-5 h-5 text-indigo-500" />
              <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-slate-800 dark:text-slate-200">
                The Coastal Majesty of Okpoama
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              {ABOUT_INFO.aboutText}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Okpoama Kingdom sits majestically on the fringe of the Atlantic Ocean, commanding key maritime trade roots and fishing networks in the Niger Delta. The kingdom plays an extremely vital role in the national economy, hosting major energy pipelines while preserving ancient cultural festivals, coastal boat building craftsmanship, and community-led fishery trades.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Ship className="w-5 h-5 text-indigo-500" />
              <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-slate-800 dark:text-slate-200">
                Our Movement's Genesis
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              {ABOUT_INFO.movementHistory}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
              Founded on the pillars of transparency, advocacy, and direct vocational training, OYM has grown from a local assembly of passionate volunteers into a structured organization with dedicated skill acquisition hubs, maritime surveillance units, and technology academies.
            </p>
          </div>
        </div>

        {/* Vision & Mission sidebar cards */}
        <div className="md:col-span-2 space-y-6">
          {/* Vision Panel */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-950 to-black text-white p-6 rounded-2xl border border-indigo-500/15 shadow-xl space-y-3 relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-300">
              <Compass className="w-32 h-32 text-indigo-400" />
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-black text-xs tracking-widest uppercase text-indigo-400">
                Our Vision
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {ABOUT_INFO.vision}
            </p>
          </div>

          {/* Mission Panel */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-950 to-black text-white p-6 rounded-2xl border border-indigo-500/15 shadow-xl space-y-3 relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-32 h-32 text-emerald-400" />
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="font-sans font-black text-xs tracking-widest uppercase text-emerald-400">
                Our Mission
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {ABOUT_INFO.mission}
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <ShieldCheck className="w-5 h-5 text-indigo-500" />
          <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-slate-900 dark:text-white">
            Core Governance Values
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_INFO.coreValues.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:border-indigo-500/30 dark:hover:border-indigo-400/30 transition-all space-y-2"
            >
              <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider block">
                0{idx + 1}. {val.title}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline Milestones */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <Milestone className="w-5 h-5 text-indigo-500" />
          <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-slate-900 dark:text-white">
            Movement Historical Timeline
          </h3>
        </div>
        <div className="relative pl-6 border-l border-slate-200 dark:border-slate-800 ml-4 space-y-8 py-2">
          {ABOUT_INFO.milestones.map((m, index) => (
            <div key={index} className="relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-100 dark:bg-slate-950 border-2 border-indigo-500 group-hover:bg-indigo-500 transition-colors shrink-0"></div>
              <div className="space-y-1">
                <span className="text-xs font-black font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block">
                  {m.year}
                </span>
                <p className="text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200 max-w-xl">
                  {m.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
