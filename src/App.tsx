/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AboutSection from "./components/AboutSection";
import LeadersSection from "./components/LeadersSection";
import EmpowermentsSection from "./components/EmpowermentsSection";
import GroupHubSection from "./components/GroupHubSection";
import SettingsSection from "./components/SettingsSection";

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("oym_dark_mode");
    return saved ? saved === "true" : true; // Default to dark mode for rich visual contrast
  });
  const [userName, setUserName] = useState(() => {
    const saved = localStorage.getItem("oym_user_name");
    return saved || "Okpoama Youth";
  });

  // Track and apply Dark Mode class on Document element
  useEffect(() => {
    localStorage.setItem("oym_dark_mode", String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Track User Name
  useEffect(() => {
    localStorage.setItem("oym_user_name", userName);
  }, [userName]);

  const renderActiveSection = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard setActiveTab={setActiveTab} userName={userName} />;
      case "about":
        return <AboutSection />;
      case "leaders":
        return <LeadersSection />;
      case "empowerments":
        return <EmpowermentsSection userName={userName} />;
      case "grouphub":
        return <GroupHubSection userName={userName} />;
      case "settings":
        return (
          <SettingsSection
            userName={userName}
            setUserName={setUserName}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        );
      default:
        return <Dashboard setActiveTab={setActiveTab} userName={userName} />;
    }
  };

  if (showWelcome) {
    return <WelcomeScreen onComplete={() => setShowWelcome(false)} />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        userName={userName}
      />

      {/* Main Content Pane */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
}
