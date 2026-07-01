/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  Award, 
  Sparkles, 
  Users, 
  Calendar, 
  TrendingUp, 
  FileText, 
  ThumbsUp, 
  Send,
  PlusCircle,
  X
} from "lucide-react";
import { EMPOWERMENTS_LIST } from "../data";
import { Empowerment } from "../types";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  submittedBy: string;
  votes: number;
  date: string;
}

interface EmpowermentsSectionProps {
  userName: string;
}

export default function EmpowermentsSection({ userName }: EmpowermentsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestForm, setShowSuggestForm] = useState(false);
  
  // Form fields
  const [sugTitle, setSugTitle] = useState("");
  const [sugDesc, setSugDesc] = useState("");
  const [sugBy, setSugBy] = useState(userName || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const categories = ["All", "Skills", "Education", "Business", "Community"];

  // Fetch Suggestions on Mount
  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const res = await fetch("/api/suggestions");
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data);
      }
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
    }
  };

  const handleSuggestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sugTitle.trim() || !sugDesc.trim()) {
      setError("Please fill in both the title and the detailed description.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: sugTitle,
          description: sugDesc,
          submittedBy: sugBy.trim() || "Anonymous Youth"
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSuggestions(data.suggestions);
          setSugTitle("");
          setSugDesc("");
          setSuccess("Thank you! Your empowerment suggestion has been posted to the board successfully!");
          setTimeout(() => {
            setShowSuggestForm(false);
            setSuccess("");
          }, 2500);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please make sure the server is active.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpvoteSuggestion = async (id: string) => {
    try {
      const res = await fetch("/api/suggestions/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ suggestionId: id })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSuggestions(data.suggestions);
        }
      }
    } catch (err) {
      console.error("Failed to vote:", err);
    }
  };

  const filteredEmpowerments = activeCategory === "All"
    ? EMPOWERMENTS_LIST
    : EMPOWERMENTS_LIST.filter(emp => emp.category === activeCategory);

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
          Empowerment Programs
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Explore the impact-led vocational workshops, grants, and environmental preservation events orchestrated by OYM.
        </p>
      </div>

      {/* Category Pills Filters */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
              activeCategory === cat
                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Active Achievements Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredEmpowerments.map((emp) => {
          const isCompleted = emp.status === "Completed";
          const isOngoing = emp.status === "Ongoing";

          return (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header status */}
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    Category: {emp.category}
                  </span>
                  <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    isCompleted
                      ? "bg-emerald-50 text-emerald-700 border-emerald-500/20 dark:bg-emerald-950/20 dark:text-emerald-400"
                      : isOngoing
                        ? "bg-amber-50 text-amber-700 border-amber-500/20 dark:bg-amber-950/20 dark:text-amber-400 animate-pulse"
                        : "bg-blue-50 text-blue-700 border-blue-500/20 dark:bg-blue-950/20 dark:text-blue-400"
                  }`}>
                    {emp.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans font-extrabold text-base text-slate-900 dark:text-white uppercase leading-tight">
                    {emp.title}
                  </h3>
                  <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 pt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{emp.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{emp.beneficiaries} Beneficiaries</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                  {emp.description}
                </p>

                {/* Progress bar info */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 uppercase">
                    <span>Program Progress</span>
                    <span>{emp.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${
                        isCompleted 
                          ? "from-emerald-500 to-indigo-500" 
                          : isOngoing 
                            ? "from-amber-500 to-orange-500" 
                            : "from-blue-500 to-indigo-500"
                      }`}
                      style={{ width: `${emp.progress}%` }}
                    />
                  </div>
                </div>

                {/* Highlights List if Completed/Active */}
                {emp.highlights && emp.highlights.length > 0 && (
                  <div className="bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 space-y-1.5 mt-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold block">
                      Core Program Accomplishments
                    </span>
                    <ul className="space-y-1">
                      {emp.highlights.map((h, i) => (
                        <li key={i} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1.5 leading-snug">
                          <span className="text-indigo-500 mt-0.5 shrink-0">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Participatory Section: Suggestion box */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-950 to-black text-white p-6 md:p-8 rounded-3xl border border-indigo-500/15 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest uppercase text-indigo-400 bg-indigo-950/30 px-2 py-0.5 border border-indigo-500/10 rounded w-fit block">
              Co-Creation Board
            </span>
            <h2 className="text-lg font-black font-sans uppercase tracking-wider text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Empowerment Suggestion Box
            </h2>
            <p className="text-xs text-slate-400 max-w-xl font-light">
              Submit a training proposal or request a grant field. All youth suggestions can be upvoted by the community, guiding the leadership's next budget draft!
            </p>
          </div>

          <button
            onClick={() => setShowSuggestForm(!showSuggestForm)}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all shrink-0"
          >
            {showSuggestForm ? (
              <>
                <X className="w-4 h-4" />
                <span>Cancel Submission</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                <span>Suggest Program</span>
              </>
            )}
          </button>
        </div>

        {/* Suggestion Form */}
        {showSuggestForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            onSubmit={handleSuggestSubmit}
            className="bg-slate-950/80 p-5 rounded-2xl border border-slate-850 space-y-4 max-w-xl"
          >
            <h3 className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Submit Your Proposal
            </h3>

            {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}
            {success && <p className="text-xs text-emerald-400 font-mono">{success}</p>}

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                  Program Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Solar Panel Inverter Training or Tailoring Academy"
                  value={sugTitle}
                  onChange={(e) => setSugTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                  Description & Impact
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what skills will be learned, the targeted youth category, and the community benefits..."
                  value={sugDesc}
                  onChange={(e) => setSugDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                    Your Name / Office
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Tarilah Oki"
                    value={sugBy}
                    onChange={(e) => setSugBy(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-wider py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-lg shadow-indigo-500/20 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? "Posting..." : "Post Suggestion"}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.form>
        )}

        {/* Existing suggestions list */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-2">
            Submitted Community Proposals ({suggestions.length})
          </h3>

          {suggestions.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {suggestions.map((s) => (
                <div 
                  key={s.id} 
                  className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl flex flex-col justify-between hover:border-slate-800 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-slate-100 leading-snug">
                        {s.title}
                      </h4>
                      <button
                        onClick={() => handleUpvoteSuggestion(s.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-[10px] font-mono font-bold uppercase transition-colors shrink-0"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{s.votes}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-900 flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>By: {s.submittedBy}</span>
                    <span>{new Date(s.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 font-mono">
              No suggestions posted yet. Be the first to suggest a program!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
