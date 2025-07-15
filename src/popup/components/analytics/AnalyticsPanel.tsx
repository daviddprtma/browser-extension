import React, { useState } from "react";
import PresenceAnalytics from "./PresenceAnalytics";
import HourlyPresenceAnalytics from "./HourlyPresenceAnalytics";

const TABS = [
  { key: "weekly", label: "Weekly" },
  { key: "hourly", label: "Hourly" },
];

const AnalyticsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState("weekly");

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner min-h-[200px] text-center">
      <div className="flex space-x-2 mb-4 justify-center">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded font-medium transition ${
              activeTab === tab.key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "weekly" && <PresenceAnalytics />}
      {activeTab === "hourly" && <HourlyPresenceAnalytics />}
    </div>
  );
};

export default AnalyticsPanel;