import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchFriendsWithStatus, fetchPendingReceivedRequestsCount } from '../../services/api';

interface Friend {
  id: string;
  username: string;
  displayName?: string;
  isOnline?: boolean;
  lastSeen?: string;
  activeTab?: { title: string; url: string };
  allTabs?: { id: number; title: string; url: string }[];
}

interface ActiveTab {
  title: string;
  url: string;
}

interface Tab {
  id: number;
  title: string;
  url: string;
}

interface FriendsContextType {
  friends: Friend[];
  loading: boolean;
  refresh: () => void;
  activeTabs: Record<string, ActiveTab | undefined>;
  allTabs: Record<string, Tab[] | undefined>;
  pendingRequestsCount: number;
}

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

export const FriendsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTabs, setActiveTabs] = useState<Record<string, ActiveTab>>({});
  const [allTabs, setAllTabs] = useState<Record<string, Tab[]>>({});
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  const loadFriends = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetchFriendsWithStatus(user.token);
      setFriends(res.data || []);
      // Set initial tab data for online friends
      const initialActiveTabs: Record<string, ActiveTab> = {};
      const initialAllTabs: Record<string, Tab[]> = {};
      (res.data || []).forEach((f: Friend) => {
        if (f.isOnline && f.activeTab) {
          initialActiveTabs[f.id] = f.activeTab;
        }
        if (f.isOnline && Array.isArray(f.allTabs)) {
          initialAllTabs[f.id] = f.allTabs;
        }
      });
      setActiveTabs(initialActiveTabs);
      setAllTabs(initialAllTabs);

      const countRes = await fetchPendingReceivedRequestsCount(user.token);
      if (countRes.success) {
        setPendingRequestsCount(countRes.count);
      }
    } catch {
      setFriends([]);
      setActiveTabs({});
      setAllTabs({});
      setPendingRequestsCount(0);
    }
    setLoading(false);
  };

  function handleFriendMessage(message: any) {
    if (message.type === 'FRIEND_ACTIVE_TAB_UPDATE') {
      const { friendId, data } = message.payload;
      if (friendId && data?.tab) {
        setActiveTabs(prev => ({
          ...prev,
          [friendId]: {
            title: data.tab.title,
            url: data.tab.url,
          }
        }));
      }
    }

    if (message.type === 'FRIEND_TAB_UPDATE') {
      const { friendId, data } = message.payload;
      if (friendId && Array.isArray(data?.tabs)) {
        setAllTabs(prev => ({
          ...prev,
          [friendId]: data.tabs.map((tab: any) => ({
            id: tab.id,
            title: tab.title,
            url: tab.url,
          })),
        }));
      }
    }
  }

  useEffect(() => {
    loadFriends();
  }, [user]);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleFriendMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleFriendMessage);
    };
  }, []);

  return (
    <FriendsContext.Provider value={{ friends, loading, refresh: loadFriends, activeTabs, allTabs, pendingRequestsCount }}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => {
  const ctx = useContext(FriendsContext);
  if (!ctx) throw new Error('useFriends must be used within FriendsProvider');
  return ctx;
};