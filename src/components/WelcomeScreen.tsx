/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Anchor, Sparkles, Award, Shield } from "lucide-react";
import { APP_LOGO } from "../data";

interface WelcomeScreenProps {
  onComplete: () => void;
}

const INSIGHTS = [
  { icon: Anchor, text: "Proud Heritage of Okpoama Kingdom along the Atlantic" },
  { icon: Shield, text: "Securing Our Coastal Boundaries, Safeguarding Our Future" },
  { icon: Award, text: "Youth Skill Development, Maritime Certifications, and Digital Careers" },
  { icon: Sparkles, text: "Fostering absolute Peace, Progress, and Community Solidarity" }
];

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [progress, setProgress] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    // Increment progress to 100 over exactly 4 seconds (4000ms)
    const intervalTime = 40; // 40ms * 100 steps = 4000ms
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    // Rotate insights every 1.2 seconds to keep it dynamic and engaging
    const insightTimer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % INSIGHTS.length);
    }, 1200);

    // Call onComplete after 4 seconds with a tiny buffer for transition exit
    const completionTimer = setTimeout(() => {
      onComplete();
    }, 4100);

    return () => {
      clearInterval(progressTimer);
      clearInterval(insightTimer);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  const CurrentIcon = INSIGHTS[insightIndex].icon;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-radial from-slate-900 via-slate-950 to-black text-white p-6 overflow-hidden">
      {/* Background glowing ocean effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Top Header of Welcome Screen */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-8 z-10"
      >
        <span className="text-xs tracking-[0.3em] text-indigo-400 font-mono uppercase bg-indigo-950/40 px-3 py-1.5 rounded-full border border-indigo-800/30">
          Nembe LGA • Bayelsa State
        </span>
      </motion.div>

      {/* Center Logo and Title */}
      <div className="flex flex-col items-center justify-center max-w-lg text-center z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="relative mb-6"
        >
          {/* Circular glow outline */}
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full blur opacity-30 animate-spin-slow"></div>
          
          <img
            src={APP_LOGO}
            alt="Okpoama Youth Movement Logo"
            className="w-32 h-32 rounded-full border-2 border-indigo-500/50 object-cover relative bg-slate-900"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-emerald-200 bg-clip-text text-transparent uppercase"
        >
          Okpoama Youth Movement
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-slate-400 font-mono text-sm tracking-widest uppercase mt-2"
        >
          Progress • Unity • Empowerment
        </motion.p>

        {/* Dynamic community facts rotating */}
        <div className="h-16 mt-8 flex items-center justify-center">
          <motion.div
            key={insightIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-sm border border-slate-800 px-4 py-2.5 rounded-xl max-w-md shadow-lg"
          >
            <CurrentIcon className="w-5 h-5 text-indigo-400 shrink-0" />
            <p className="text-xs text-slate-300 font-sans leading-relaxed text-left">
              {INSIGHTS[insightIndex].text}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Loading Bar */}
      <div className="w-full max-w-sm mb-12 flex flex-col items-center z-10 gap-3">
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
            style={{ width: `${progress}%` }}
            layoutId="progress-bar"
          />
        </div>
        
        <div className="flex justify-between w-full text-[11px] font-mono text-slate-500 uppercase tracking-widest">
          <span>Launching Portal</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
