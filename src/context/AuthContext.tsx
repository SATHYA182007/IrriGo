import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, role?: UserRole) => void;
  signup: (userData: Partial<User>) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

export const defaultFarmerUser: User = {
  id: 'usr-ravi-1',
  name: 'Ravi Kumar',
  phone: '+91 98765 43210',
  email: 'ravi.kumar@irrigo.farm',
  role: 'farmer',
  location: 'Salem, Tamil Nadu',
  farmSize: '2.4 Acres',
  primaryCrop: 'Tomato & Chilli',
  language: 'en'
};

export const defaultAdminUser: User = {
  id: 'usr-admin-1',
  name: 'Anand Sharma (FPO Lead)',
  phone: '+91 98123 45678',
  email: 'admin@kaveri-fpo.org',
  role: 'admin',
  location: 'Cauvery River Basin, TN',
  farmSize: '450 Acres (38 Farmers)',
  primaryCrop: 'Multi-Crop Federation',
  language: 'en'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('irrigo_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null; // Start unauthenticated so Landing Page -> Auth -> Dashboard workflow is strictly enforced!
  });

  const saveUser = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem('irrigo_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('irrigo_user');
    }
  };

  const login = (emailOrPhone: string, role: UserRole = 'farmer') => {
    const newUser = role === 'admin' ? defaultAdminUser : { ...defaultFarmerUser, email: emailOrPhone || defaultFarmerUser.email };
    saveUser(newUser);
  };

  const signup = (userData: Partial<User>) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name || 'New Farmer',
      phone: userData.phone || '+91 90000 00000',
      email: userData.email || 'farmer@irrigo.farm',
      role: userData.role || 'farmer',
      location: userData.location || 'Tamil Nadu, India',
      farmSize: userData.farmSize || '2.0 Acres',
      primaryCrop: userData.primaryCrop || 'Tomato',
      language: userData.language || 'en'
    };
    saveUser(newUser);
  };

  const logout = () => {
    saveUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (role === 'admin') {
      saveUser(defaultAdminUser);
    } else {
      saveUser(defaultFarmerUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
