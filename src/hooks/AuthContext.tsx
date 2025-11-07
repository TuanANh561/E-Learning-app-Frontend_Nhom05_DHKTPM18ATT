import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { axiosInstance } from './api';
import { User } from '../types';
import { Alert } from 'react-native';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/api/auth/me');
      if (res.status === 200 && res.data.data) {
        setUser(res.data.data);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (err) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      if (!email.trim()) {
        Alert.alert('Lỗi', 'Email không được để trống');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        Alert.alert('Lỗi', 'Email không hợp lệ');
        return false;
      }
      if (!password.trim()) {
        Alert.alert('Lỗi', 'Mật khẩu không được để trống');
        return false;
      }

      const res = await axiosInstance.post('/api/auth/login', { email, password });
      if (res.data.status === 200 && res.data.data) {
        setUser(res.data.data);
        setIsLoggedIn(true);
        return true;
      }
      Alert.alert('Đăng nhập thất bại', 'Email hoặc mật khẩu không đúng');
      return false;
    } catch (err: any) {
      Alert.alert('Đăng nhập thất bại', 'Có lỗi xảy ra, thử lại sau');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);


  const logout = useCallback(async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
    } catch (err) {}
    setUser(null);
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};