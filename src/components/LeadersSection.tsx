/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Mail, Calendar, ShieldCheck, ChevronRight, Check } from "lucide-react";
import { LEADERS_LIST } from "../data";
import { Leader } from "../types";

export default function LeadersSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredLeaders = LEADERS_LIST.filter(
    (leader) =>
      leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyEmail = (email: string, leaderId: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(leaderId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            Roster of Leaders
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Meet the democratically elected executive council members of the Okpoama Youth Movement (2024 - 2026).
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search leaders or offices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Leaders Grid */}
      {filteredLeaders.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLeaders.map((leader, idx) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group overflow-hidden"
            >
              {/* Top card banner */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-emerald-500"></div>

              <div className="space-y-4">
                {/* Avatar and Name details */}
                <div className="flex items-center gap-4">
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="w-14 h-14 rounded-full object-cover border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-white leading-tight">
                      {leader.name}
                    </h3>
                    <span className="inline-block text-[10px] font-mono font-extrabold uppercase bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/20 px-2 py-0.5 rounded text-indigo-700 dark:text-indigo-400 mt-1">
                      {leader.role}
                    </span>
                  </div>
                </div>

                {/* Term Dates & Stats */}
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-y border-slate-100 dark:border-slate-800 py-2.5">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{leader.term}</span>
                  </div>
                  <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span className="uppercase tracking-widest text-[9px] font-bold">Elected Official</span>
                  </div>
                </div>

                {/* Bio text snippet */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {leader.bio}
                </p>
              </div>

              {/* Bottom interactive row */}
              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                {leader.email ? (
                  <button
                    onClick={() => handleCopyEmail(leader.email!, leader.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus:outline-none shrink-0"
                  >
                    {copiedId === leader.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-500">Email Copied!</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div />
                )}
                
                <button
                  onClick={() => setSelectedLeader(leader)}
                  className="flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 focus:outline-none"
                >
                  <span>Full Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            No leaders found matching "{searchTerm}". Please try a different query.
          </p>
        </div>
      )}

      {/* Leader Full Profile Overlay Dialog */}
      <AnimatePresence>
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full relative shadow-2xl space-y-6"
            >
              {/* Outer bar accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-t-3xl"></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>

              <div className="flex flex-col items-center text-center space-y-4">
                <img
                  src={selectedLeader.avatar}
                  alt={selectedLeader.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 shadow-md bg-slate-100"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="font-sans font-black text-lg text-slate-900 dark:text-white uppercase tracking-tight">
                    {selectedLeader.name}
                  </h3>
                  <span className="inline-block text-xs font-mono font-black uppercase bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/20 px-3 py-1 rounded-full text-indigo-700 dark:text-indigo-400 mt-1">
                    {selectedLeader.role}
                  </span>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                    Leadership Bio & Objective
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedLeader.bio}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Active Term</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedLeader.term}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Contact</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                      {selectedLeader.email || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Close footer button */}
              <button
                onClick={() => setSelectedLeader(null)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-wider py-3 rounded-xl text-xs shadow-lg shadow-indigo-500/20 transition-all"
              >
                Close Profile
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
