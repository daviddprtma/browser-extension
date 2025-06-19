import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { WelcomeScreen } from '../components/welcome';
import { DashboardHeader, FriendsList, StatusPanel } from '../components/dashboard';

interface Friend {
  id: string;
  username: string;
  displayName?: string;
  status: 'online' | 'offline' | 'away';
  currentActivity?: string;
}

type PrivacyLevel = 'public' | 'friends-only' | 'anonymous' | 'off';

const HomePage: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const [privacyLevel, setPrivacyLevel] = useState<PrivacyLevel>('friends-only');
  
  const friends: Friend[] = [];
  
  const handleLogout = () => {
    logout();
    window.location.href = '#/';
  };
  
  const handleRefresh = () => {
    window.location.reload();
  };
  
  const handlePrivacyChange = (level: PrivacyLevel) => {
    setPrivacyLevel(level);
    console.log('Privacy level changed to:', level);
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <WelcomeScreen />;
  }

  return (
    <div className="min-h-[600px] w-[400px] bg-white p-6">
      <DashboardHeader 
        username={user.username}
        displayName={user.displayName}
        onRefresh={handleRefresh}
        onLogout={handleLogout}
      />
      
      <FriendsList 
        friends={friends}
      />
      
      <StatusPanel 
        isOnline={true}
        privacyLevel={privacyLevel}
        onPrivacyChange={handlePrivacyChange}
      />
      
      {/* Logout button at bottom */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-white hover:bg-gray-50 text-red-600 font-medium rounded-lg border border-gray-300 transition duration-200 flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;