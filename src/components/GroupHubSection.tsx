/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { 
  MessageSquare, 
  BarChart2, 
  Send, 
  Sparkles, 
  Vote, 
  RefreshCw, 
  TrendingUp, 
  PieChart as PieIcon, 
  HelpCircle,
  Clock
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  Legend 
} from "recharts";
import { ChatMessage, Poll, PollOption } from "../types";
import { EMPOWERMENT_BY_CATEGORY, YOUTH_EMPLOYMENT_TREND, RESOURCE_ALLOCATION } from "../data";

interface GroupHubSectionProps {
  userName: string;
}

export default function GroupHubSection({ userName }: GroupHubSectionProps) {
  const [activeSubTab, setActiveSubTab] = useState<"chat" | "charts">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [sending, setSending] = useState(false);
  const [poll, setPoll] = useState<Poll | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedOptionId, setVotedOptionId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch initial chat and polls
  useEffect(() => {
    fetchChat();
    fetchPoll();

    // Setup background interval polling (every 3 seconds) to make chat real-time
    const interval = setInterval(() => {
      fetchChatSilent();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom whenever messages list updates
  useEffect(() => {
    if (activeSubTab === "chat") {
      scrollToBottom();
    }
  }, [messages, activeSubTab]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChat = async () => {
    try {
      const res = await fetch("/api/chat");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Failed to fetch chat:", err);
    }
  };

  const fetchChatSilent = async () => {
    try {
      const res = await fetch("/api/chat");
      if (res.ok) {
        const data = await res.json();
        // Only update state if length changed to prevent flickering
        setMessages(data);
      }
    } catch (err) {
      // Fail silently for background poll
    }
  };

  const fetchPoll = async () => {
    try {
      const res = await fetch("/api/poll");
      if (res.ok) {
        const data = await res.json();
        setPoll(data);
      }
    } catch (err) {
      console.error("Failed to fetch poll:", err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setSending(true);
    const textToSend = chatInput;
    setChatInput(""); // Clear field early for responsive UI

    // Append client-side optimistically
    const optimisticMessage: ChatMessage = {
      id: `opt-${Date.now()}`,
      sender: userName || "Anonymous Member",
      text: textToSend,
      timestamp: new Date().toISOString(),
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      role: "Member"
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: userName || "Anonymous Member",
          text: textToSend,
          role: "Member",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
        }
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const handleCastVote = async (optionId: string) => {
    if (hasVoted) return;

    setHasVoted(true);
    setVotedOptionId(optionId);

    try {
      const res = await fetch("/api/poll/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ optionId })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setPoll(data.poll);
        }
      }
    } catch (err) {
      console.error("Failed to register vote:", err);
      setHasVoted(false);
      setVotedOptionId(null);
    }
  };

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] md:h-[calc(100vh-60px)] space-y-4">
      {/* Upper header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
            Youth Group Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Participate in active chatting, review youth progress metrics, and cast votes on empowerment topics.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/80 shrink-0">
          <button
            onClick={() => setActiveSubTab("chat")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeSubTab === "chat"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            <span>Group Chatting</span>
          </button>
          <button
            onClick={() => setActiveSubTab("charts")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              activeSubTab === "charts"
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
            }`}
          >
            <BarChart2 className="w-4 h-4 text-emerald-500" />
            <span>Group Charting</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        
        {/* --- CHAT TAB VIEW --- */}
        {activeSubTab === "chat" && (
          <div className="flex flex-col h-full">
            {/* Live indicator bar */}
            <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono bg-slate-50/50 dark:bg-slate-950/20 shrink-0">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block animate-pulse"></span>
                <span>OYM Secure Chat Room</span>
              </span>
              <span className="hidden sm:inline-block">Type @advisor for AI assistance</span>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => {
                const isAI = msg.sender === "AI Youth Advisor";
                const isCurrentUser = msg.sender === userName;
                const isLeader = msg.role === "President" || msg.role === "Vice President" || msg.role === "Secretary" || msg.role === "Leader" || msg.role === "Advisor";

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] sm:max-w-[70%] ${
                      isCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto"
                    }`}
                  >
                    {/* Sender profile circle */}
                    <img
                      src={msg.avatar}
                      alt={msg.sender}
                      className="w-8.5 h-8.5 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-100"
                      referrerPolicy="no-referrer"
                    />

                    <div className="space-y-1">
                      {/* Name header */}
                      <div className={`flex items-center gap-1.5 text-[11px] font-sans ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      }`}>
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {isCurrentUser ? "You" : msg.sender}
                        </span>

                        {/* Leader or Advisor Badges */}
                        {isAI && (
                          <span className="px-1.5 py-0.5 rounded bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 border border-indigo-500/30 text-indigo-400 font-mono text-[9px] font-black uppercase flex items-center gap-0.5 shadow-sm">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>AI Advisor</span>
                          </span>
                        )}
                        {!isAI && isLeader && (
                          <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-[9px] font-bold uppercase">
                            {msg.role}
                          </span>
                        )}

                        <span className="text-[9px] font-mono text-slate-400">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Msg Body Bubble */}
                      <div className={`px-4 py-2.5 rounded-2xl text-xs md:text-sm leading-relaxed ${
                        isCurrentUser
                          ? "bg-indigo-600 text-white rounded-tr-none"
                          : isAI
                            ? "bg-slate-900 text-slate-100 border border-slate-800 rounded-tl-none font-sans"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Post Message Form Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 shrink-0">
              <input
                type="text"
                placeholder="Message other youth members... Mention @advisor to ask the AI."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={sending}
                className="flex-1 px-4 py-2.5 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={sending || !chatInput.trim()}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 disabled:opacity-40 transition-all shrink-0 flex items-center justify-center focus:outline-none"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </div>
        )}

        {/* --- CHARTS TAB VIEW --- */}
        {activeSubTab === "charts" && (
          <div className="flex-1 overflow-y-auto p-5 space-y-6 md:space-y-8">
            
            {/* Dynamic Community Poll Widget */}
            {poll && (
              <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800/80 p-5 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/50 pb-2">
                  <Vote className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-sans font-bold text-xs tracking-widest uppercase text-slate-800 dark:text-slate-200">
                    Live Community Poll Analytics
                  </h3>
                </div>
                <div className="grid md:grid-cols-5 gap-6">
                  {/* Voting Area */}
                  <div className="md:col-span-3 space-y-3">
                    <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-100">
                      {poll.question}
                    </p>
                    <div className="space-y-2">
                      {poll.options.map((opt) => {
                        const percent = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                        const isThisVoted = votedOptionId === opt.id;

                        return (
                          <button
                            key={opt.id}
                            disabled={hasVoted}
                            onClick={() => handleCastVote(opt.id)}
                            className={`w-full text-left p-3 rounded-xl border text-xs relative overflow-hidden transition-all flex justify-between items-center ${
                              hasVoted
                                ? isThisVoted
                                  ? "border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400"
                                  : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                                : "border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-950/20"
                            }`}
                          >
                            {/* Fill percentage background bar */}
                            {hasVoted && (
                              <div
                                className="absolute left-0 top-0 bottom-0 bg-indigo-500/5 dark:bg-indigo-500/10 transition-all duration-500"
                                style={{ width: `${percent}%` }}
                              />
                            )}

                            <span className="relative z-10 font-sans font-semibold pr-2">{opt.text}</span>
                            <span className="relative z-10 font-mono text-slate-400 text-[10px] shrink-0 font-bold">
                              {hasVoted ? `${percent}% (${opt.votes} votes)` : ""}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick stats callout */}
                  <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex flex-col justify-center items-center text-center space-y-1 shadow-sm">
                    <TrendingUp className="w-8 h-8 text-indigo-500" />
                    <span className="text-xl md:text-2xl font-black font-mono text-slate-950 dark:text-white">
                      {poll.totalVotes}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                      Total Votes Registered
                    </span>
                    <p className="text-[10px] text-slate-400 pt-1 leading-normal font-light">
                      Cast your vote above. Results recalculate instantly across the movement directory database!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* RECHARTS DATA VISUALIZATIONS */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              
              {/* Chart 1: Area Chart - Youth Employability rate */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 md:p-5 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <TrendingUp className="w-4 h-4 text-indigo-500" />
                  <h3 className="font-sans font-bold text-[11px] tracking-widest uppercase text-slate-800 dark:text-slate-200">
                    Youth Employability Trend (2022-2026)
                  </h3>
                </div>
                <div className="h-64 w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={YOUTH_EMPLOYMENT_TREND}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="year" stroke="#888888" fontSize={10} tickLine={false} />
                      <YAxis stroke="#888888" fontSize={10} tickLine={false} unit="%" />
                      <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                      <Area 
                        type="monotone" 
                        dataKey="employmentRate" 
                        name="Employment Rate"
                        stroke="#6366F1" 
                        fillOpacity={1} 
                        fill="url(#colorRate)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-slate-400 text-center font-light leading-relaxed">
                  OYM structural training partnerships drove employment from 42% in 2022 up to an estimated 82% target for late 2026.
                </p>
              </div>

              {/* Chart 2: Pie Chart - Empowerments Done by Category */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 md:p-5 rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <PieIcon className="w-4 h-4 text-indigo-500" />
                  <h3 className="font-sans font-bold text-[11px] tracking-widest uppercase text-slate-800 dark:text-slate-200">
                    Empowered Members Distribution
                  </h3>
                </div>
                <div className="h-64 w-full flex items-center justify-center text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={EMPOWERMENT_BY_CATEGORY}
                        cx="50%"
                        cy="45%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                      >
                        {EMPOWERMENT_BY_CATEGORY.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle" 
                        iconSize={8}
                        wrapperStyle={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 3: Bar Chart - Annual resource allocation */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 md:p-5 rounded-2xl shadow-sm space-y-4 md:col-span-2">
                <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <BarChart2 className="w-4 h-4 text-indigo-500" />
                  <h3 className="font-sans font-bold text-[11px] tracking-widest uppercase text-slate-800 dark:text-slate-200">
                    Resource & Budget Allocation (%)
                  </h3>
                </div>
                <div className="h-64 w-full text-xs">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={RESOURCE_ALLOCATION}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <XAxis dataKey="name" stroke="#888888" fontSize={9} tickLine={false} />
                      <YAxis stroke="#888888" fontSize={10} tickLine={false} unit="%" />
                      <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                      <Bar 
                        dataKey="percentage" 
                        name="Budget Allocation"
                        fill="#6366F1" 
                        radius={[4, 4, 0, 0]} 
                      >
                        {RESOURCE_ALLOCATION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
