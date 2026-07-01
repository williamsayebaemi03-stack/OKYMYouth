/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LayoutDashboard, 
  Info, 
  Users, 
  Award, 
  MessageSquare, 
  Settings as SettingsIcon, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Anchor
} from "lucide-react";
import { APP_LOGO } from "../data";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  userName: string;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode,
  userName 
}: SidebarProps) {
  
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "about", label: "About Kingdom", icon: Info },
    { id: "leaders", label: "Roster of Leaders", icon: Users },
    { id: "empowerments", label: "Empowerments", icon: Award },
    { id: "grouphub", label: "Group Hub (Chat & Charts)", icon: MessageSquare },
    { id: "settings", label: "Portal Settings", icon: SettingsIcon }
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-colors duration-200">
        <div className="flex items-center gap-2">
          <img 
            src={APP_LOGO} 
            alt="Logo" 
            className="w-8 h-8 rounded-full border border-indigo-500 object-cover bg-slate-900"
            referrerPolicy="no-referrer"
          />
          <span className="font-sans font-extrabold text-sm tracking-tight text-slate-800 dark:text-slate-100 uppercase">
            OYM Portal
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 focus:outline-none"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </div>
      </header>

      {/* Mobile Bottom Bar for Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-30 flex justify-around items-center py-2 px-1 transition-colors duration-200">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-lg transition-all duration-150 ${
                isActive 
                  ? "text-indigo-600 dark:text-indigo-400 font-medium" 
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] tracking-tight truncate max-w-full px-0.5">
                {item.id === "grouphub" ? "Group Hub" : item.id === "about" ? "About" : item.id === "leaders" ? "Leaders" : item.label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 shrink-0 transition-colors duration-200">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full blur opacity-20 animate-pulse"></div>
            <img 
              src={APP_LOGO} 
              alt="Okpoama Youth Movement Logo" 
              className="w-10 h-10 rounded-full border border-indigo-500 object-cover relative bg-slate-900"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-sans font-black text-xs text-slate-800 dark:text-slate-200 tracking-wider uppercase leading-none">
              Okpoama
            </h2>
            <p className="font-sans font-bold text-[10px] text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mt-0.5">
              Youth Movement
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-150 text-left font-sans text-sm ${
                  isActive 
                    ? "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-semibold border-l-4 border-indigo-500 pl-3" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer User & Themes */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
          {/* Active User Card */}
          <div className="flex items-center gap-3 bg-white dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80">
            <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-500/20 shadow-sm shadow-indigo-500/15">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate leading-tight">
                {userName}
              </p>
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block mt-0.5">
                Youth Member
              </span>
            </div>
          </div>

          {/* Quick theme toggles */}
          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-950/80 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
            <button
              onClick={() => setDarkMode(false)}
              className={`flex items-center justify-center gap-2 flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                !darkMode 
                  ? "bg-white text-slate-800 shadow-sm" 
                  : "text-slate-500 dark:text-slate-400 hover:text-indigo-200"
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Light</span>
            </button>
            <button
              onClick={() => setDarkMode(true)}
              className={`flex items-center justify-center gap-2 flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                darkMode 
                  ? "bg-slate-800 text-white shadow-sm" 
                  : "text-slate-500 dark:text-slate-600 hover:text-slate-800"
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Dark</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
