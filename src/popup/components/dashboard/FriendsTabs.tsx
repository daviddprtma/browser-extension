import React, { useState } from 'react';
import FriendsList from './friends/FriendsList';
import PendingRequests from './friends/PendingRequests';
import SearchFriends from './friends/SearchFriends';

const TABS = [
  { key: 'all', label: 'All Friends' },
  { key: 'pending', label: 'Pending Requests' },
  { key: 'search', label: 'Search/Add' },
];

const FriendsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="flex flex-col h-full">
      <div className="flex space-x-2 mb-4">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`px-4 py-2 rounded-t-lg font-medium transition ${
              activeTab === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto max-h-[435px] bg-white rounded-b-lg shadow-inner p-2">
        {activeTab === 'all' && <FriendsList />}
        {activeTab === 'pending' && <PendingRequests />}
        {activeTab === 'search' && <SearchFriends />}
      </div>
    </div>
  );
};

export default FriendsTabs;