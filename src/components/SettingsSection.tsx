/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Settings, 
  User, 
  Sun, 
  Moon, 
  Bell, 
  Database, 
  Check, 
  AlertCircle,
  HelpCircle
} from "lucide-react";

interface SettingsSectionProps {
  userName: string;
  setUserName: (name: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
}

const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face", // Blue shirt guy
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", // Yellow shirt girl
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", // Glasses guy
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"  // Pink shirt girl
];

export default function SettingsSection({
  userName,
  setUserName,
  darkMode,
  setDarkMode
}: SettingsSectionProps) {
  const [inputName, setInputName] = useState(userName);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    setUserName(inputName.trim());
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 2500);
  };

  const handleResetChatDb = async () => {
    setResetting(true);
    try {
      const res = await fetch("/api/reset-chat", { method: "POST" });
      if (res.ok) {
        setResetDone(true);
        setTimeout(() => setResetDone(false), 2500);
      }
    } catch (err) {
      console.error("Failed to reset database:", err);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans uppercase">
          Portal Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Customize your profile, configure push notifications, alter graphic dark modes, and reset chat parameters.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile personalization card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <User className="w-5 h-5 text-indigo-500" />
            <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-slate-800 dark:text-slate-200">
              Personalize Profile
            </h3>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            {profileSuccess && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                <Check className="w-4 h-4" />
                <span>Screen name updated successfully!</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                Your Screen Name
              </label>
              <input
                type="text"
                placeholder="e.g., Tarilah"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full px-3 py-2 text-xs md:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!inputName.trim() || inputName === userName}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-wider py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-500/20 disabled:opacity-40 transition-all focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Display Appearance & Dark mode */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Settings className="w-5 h-5 text-indigo-500" />
            <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-slate-800 dark:text-slate-200">
              Appearance & Theme
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              Toggle the portal layout theme. Selecting Dark mode is optimized for night reading and protects your eyes while chatting.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setDarkMode(false)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                  !darkMode
                    ? "border-indigo-500 bg-indigo-50/25 dark:bg-indigo-950/10 text-indigo-700 dark:text-indigo-400"
                    : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <Sun className="w-6 h-6 mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider">Light Theme</span>
              </button>

              <button
                onClick={() => setDarkMode(true)}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                  darkMode
                    ? "border-indigo-500 bg-indigo-50/25 dark:bg-indigo-950/10 text-indigo-700 dark:text-indigo-400"
                    : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <Moon className="w-6 h-6 mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider">Dark Theme</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications & Sound Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Bell className="w-5 h-5 text-indigo-500" />
            <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-slate-800 dark:text-slate-200">
              Notification Rules
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 max-w-[80%]">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Enable Group Notifications
                </span>
                <span className="text-[10px] text-slate-400 leading-relaxed block font-light">
                  Receive a visual notice bar whenever a leader post or community meeting is scheduled.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-4 h-4 text-indigo-600 accent-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer shrink-0"
              />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
              <div className="space-y-0.5 max-w-[80%]">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Enable Advisory Chimes
                </span>
                <span className="text-[10px] text-slate-400 leading-relaxed block font-light">
                  Play an audio chime whenever the AI Advisor responds to a group query.
                </span>
              </div>
              <input
                type="checkbox"
                checked={sounds}
                onChange={(e) => setSounds(e.target.checked)}
                className="w-4 h-4 text-indigo-600 accent-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer shrink-0"
              />
            </div>
          </div>
        </div>

        {/* Administrative Database management */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Database className="w-5 h-5 text-indigo-500" />
            <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-slate-800 dark:text-slate-200">
              Portal Administration
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              For testing and presentation purposes, you can wipe all user-submitted messages and reset the main in-memory database to defaults.
            </p>

            {resetDone && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                <Check className="w-4 h-4" />
                <span>Chat and poll database reset successfully!</span>
              </div>
            )}

            <button
              onClick={handleResetChatDb}
              disabled={resetting}
              className="w-full flex items-center justify-center gap-2 border border-rose-500/30 hover:bg-rose-500/10 dark:hover:bg-rose-500/5 text-rose-500 font-bold uppercase tracking-wider py-2.5 rounded-xl text-xs transition-colors focus:outline-none disabled:opacity-40"
            >
              <AlertCircle className="w-4 h-4" />
              <span>{resetting ? "Resetting database..." : "Reset Portal Database"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
