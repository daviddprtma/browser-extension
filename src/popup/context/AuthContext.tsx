import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, updateUserInLocalStorage, getUserFromLocalStorage, clearUserFromLocalStorage } from '../utils/localStorage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedFields: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userData = await getUserFromLocalStorage();
        if (userData) {
          setUser(userData);
          chrome.runtime.sendMessage({ type: 'POPUP_OPENED' });
        }
      } catch (error) {
        console.error('Failed to load user session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    chrome.storage.local.set({ user: JSON.stringify(userData) });
    chrome.runtime.sendMessage({ type: 'LOGIN_SUCCESS'});
  };

  const updateUser = async (updatedFields: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = await updateUserInLocalStorage(updatedFields);
      if (updatedUser) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const logout = async () => {
    setUser(null);
    await clearUserFromLocalStorage();
    chrome.runtime.sendMessage({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
