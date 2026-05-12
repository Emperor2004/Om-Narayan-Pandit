"use client";

import { memo, useCallback } from "react";
import { FolderCode, BookOpen, FileText } from "lucide-react";
import type { AdminSection } from "@/types";

interface Tab {
  id: AdminSection;
  label: string;
  icon: any;
  count: number;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: AdminSection;
  onTabClick: (tabId: AdminSection) => void;
}

// Memoized individual tab button to prevent unnecessary re-renders
const TabButton = memo(({ 
  tab, 
  isActive, 
  onClick 
}: { 
  tab: Tab; 
  isActive: boolean; 
  onClick: () => void; 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 font-mono text-[0.75rem] px-4 py-2 rounded-lg transition-all cursor-none ${
        isActive
          ? "bg-accent/15 text-accent border border-accent/30"
          : "text-[var(--muted)] hover:text-[var(--text)] border border-transparent"
      }`}
    >
      <tab.icon size={13} />
      {tab.label}
      <span className="font-mono text-[0.65rem] opacity-60">({tab.count})</span>
    </button>
  );
});

TabButton.displayName = "TabButton";

// Tab bar component
export const TabBar = memo(({ tabs, activeTab, onTabClick }: TabBarProps) => {
  const handleTabClick = useCallback((tabId: AdminSection) => {
    onTabClick(tabId);
  }, [onTabClick]);

  return (
    <div className="flex gap-2 mb-8 border-b border-[var(--border)] pb-4">
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
        />
      ))}
    </div>
  );
});

TabBar.displayName = "TabBar";
