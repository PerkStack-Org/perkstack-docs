"use client";

import { useState, createContext, useContext } from "react";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue>({ activeTab: "", setActiveTab: () => {} });

interface TabItem {
  id: string;
  label: string;
}

export function Tabs({
  tabs,
  defaultTab,
  children,
}: {
  tabs: TabItem[];
  defaultTab?: string;
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? "");

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="mb-6">
        <div className="flex gap-1 p-1 bg-lp-bg-alt rounded-lg w-fit mb-4 border border-lp-border-muted">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-[13px] font-medium rounded-md transition-all ${
                activeTab === tab.id
                  ? "bg-lp-surface text-ps-accent shadow-sm border border-lp-border-muted"
                  : "text-lp-text-secondary hover:text-lp-text border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== id) return null;
  return <div className="animate-in">{children}</div>;
}
