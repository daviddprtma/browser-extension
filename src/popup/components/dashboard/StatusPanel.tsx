import React from 'react';

type PrivacyLevel = 'public' | 'friends-only' | 'anonymous' | 'off';

interface StatusPanelProps {
  isOnline: boolean;
  privacyLevel: PrivacyLevel;
  onPrivacyChange: (level: PrivacyLevel) => void;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ 
  isOnline = true, 
  privacyLevel = 'friends-only',
  onPrivacyChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPrivacyChange(e.target.value as PrivacyLevel);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Status</h2>
      
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <p className="text-sm text-blue-800">
          Your friends will see you're online. Set your privacy level below.
        </p>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className={`w-3 h-3 ${isOnline ? 'bg-green-500' : 'bg-gray-400'} rounded-full mr-2`}></div>
          <span className="text-gray-700">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
          Current Privacy: {privacyLevel === 'public' ? 'Public' : 
                           privacyLevel === 'friends-only' ? 'Friends Only' : 
                           privacyLevel === 'anonymous' ? 'Anonymous' : 'Off'}
        </div>
        
        <div className="mt-4">
          <label htmlFor="privacy" className="block text-xs font-medium text-gray-500 mb-1">
            Privacy Setting
          </label>
          <select 
            id="privacy"
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={privacyLevel}
            onChange={handleChange}
          >
            <option value="public">Public - Everyone can see my activity</option>
            <option value="friends-only">Friends Only - Only friends can see my activity</option>
            <option value="anonymous">Anonymous - Show I'm online but hide activity</option>
            <option value="off">Off - Appear offline to everyone</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StatusPanel;