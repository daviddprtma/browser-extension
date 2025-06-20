import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FriendsProvider } from '../context/FriendsContext';
import { WelcomeScreen } from '../components/welcome';
import { DashboardHeader, FriendsList, StatusPanel } from '../components/dashboard';
import FriendsTabs from '../components/dashboard/FriendsTabs';

const HomePage: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const [privacyLevel, setPrivacyLevel] = useState<'public' | 'friends-only' | 'anonymous' | 'off'>('friends-only');

  const handleLogout = () => {
    logout();
    window.location.href = '#/';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handlePrivacyChange = (level: 'public' | 'friends-only' | 'anonymous' | 'off') => {
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
    <FriendsProvider>
      <div className="min-h-[600px] w-[400px] bg-white p-6 flex flex-col h-full">
        <DashboardHeader
          username={user.username}
          displayName={user.displayName}
          onRefresh={handleRefresh}
          onLogout={handleLogout}
        />
        
        <FriendsTabs />
        
      </div>
    </FriendsProvider>
  );
};

export default HomePage;