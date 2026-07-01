/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Users, 
  Award, 
  ShieldAlert, 
  Calendar, 
  ArrowRight, 
  BookmarkCheck, 
  TrendingUp, 
  Anchor 
} from "lucide-react";
import { HERO_BANNER, ABOUT_INFO } from "../data";

interface DashboardProps {
  setActiveTab: (tab: string) => void;
  userName: string;
}

export default function Dashboard({ setActiveTab, userName }: DashboardProps) {
  
  // Dynamic Greeting based on current time
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Good Morning";
    if (hr < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const statItems = [
    { label: "Active Youth Members", value: "2,200+", icon: Users, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400" },
    { label: "Empowerments Done", value: "4 Cycles", icon: Award, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400" },
    { label: "Governing Leaders", value: "6 Officials", icon: Anchor, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400" },
    { label: "Employability Rate", value: "71%", icon: TrendingUp, color: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 dark:text-purple-400" }
  ];

  const upcomingEvents = [
    {
      title: "OYM Q3 Stakeholders General Assembly",
      date: "July 15, 2026",
      desc: "An open town hall gathering with the Okpoama Council of Chiefs to review youth employment partnerships.",
      location: "Town Hall, Okpoama"
    },
    {
      title: "Solar Installation Training Orientation",
      date: "August 01, 2026",
      desc: "Orientation session for the 80 selected candidates for the Advanced Solar installation workshop.",
      location: "Skill Acquisition Center"
    }
  ];

  const communityAlerts = [
    {
      title: "Maritime Security Co-Operation",
      desc: "Youth coast watch team is collaborating with maritime authorities. Report any strange coastal movements near Brass beachfront.",
      type: "warning"
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Welcome to the official Okpoama Youth Movement management and community portal.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/10 dark:bg-indigo-950/30 px-4 py-2 rounded-xl border border-indigo-500/10 shrink-0 shadow-lg shadow-indigo-500/5">
          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping"></span>
          <span className="font-mono text-xs text-indigo-800 dark:text-indigo-400 uppercase tracking-widest font-semibold">
            Portal Live
          </span>
        </div>
      </div>

      {/* Hero Banner Banner Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden shadow-xl border border-indigo-500/20 bg-slate-900 text-white min-h-[300px] flex flex-col justify-end p-6 md:p-8"
      >
        <img 
          src={HERO_BANNER} 
          alt="Brass Beach Coast of Okpoama" 
          className="absolute inset-0 w-full h-full object-cover opacity-45 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        {/* Coastal overlay shader */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-[10px] tracking-[0.3em] font-mono text-indigo-400 uppercase bg-indigo-950/40 px-2.5 py-1 rounded border border-indigo-500/20 w-fit">
            Okpoama Kingdom Apex Youth Body
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight font-sans uppercase">
            Unity, Progress, and Sustainable Empowerment
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans font-light">
            {ABOUT_INFO.movementHistory.slice(0, 180)}... Learn more about our ocean heritage, historical community background, and our vision to empower the next generation.
          </p>
          <div className="pt-2">
            <button 
              onClick={() => setActiveTab("about")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
            >
              <span>Explore Kingdom History</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statItems.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 md:p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </span>
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <Icon className="w-4 h-4 md:w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {stat.value}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom split: Announcements & Quick Access */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Events Schedule */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Calendar className="w-5 h-5 text-indigo-500" />
            <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-slate-800 dark:text-slate-200">
              Upcoming Events & Assemblies
            </h3>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((ev, index) => (
              <div key={index} className="flex gap-4 p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                <div className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-lg text-center font-mono h-fit shrink-0 border border-indigo-500/10">
                  <span className="block text-xs uppercase font-extrabold">{ev.date.split(" ")[0]}</span>
                  <span className="block text-lg font-black leading-none">{ev.date.split(" ")[1].replace(",", "")}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                    {ev.desc}
                  </p>
                  <span className="inline-block text-[10px] font-mono uppercase bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-400">
                    {ev.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Action/Alerts Panel */}
        <div className="flex flex-col gap-6">
          {/* Quick Hub Panel */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-950 to-black text-white p-5 rounded-2xl border border-indigo-500/15 shadow-lg space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-400 bg-indigo-950/30 px-2 py-0.5 border border-indigo-500/10 rounded w-fit block">
                Interact
              </span>
              <h3 className="text-sm font-extrabold font-sans uppercase tracking-wider text-slate-100">
                Live Community Hub
              </h3>
              <p className="text-[11px] leading-relaxed text-slate-400 font-light">
                Exchange comments with other leaders, ask the AI Youth Advisor regarding careers, and vote on our upcoming empowerment program topics in real-time.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab("grouphub")}
              className="flex items-center justify-between bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all w-full"
            >
              <span>Join Group Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Alert Security */}
          {communityAlerts.map((alert, index) => (
            <div key={index} className="bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/20 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-amber-800 dark:text-amber-400">
                  Security vigil
                </h4>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                {alert.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
