import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount — rehydrate user from stored token
  useEffect(() => {
    const token = localStorage.getItem('spark_token');
    if (token) {
      axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setUser(res.data.user))
        .catch(() => localStorage.removeItem('spark_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
    localStorage.setItem('spark_token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const register = async (formData) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
    localStorage.setItem('spark_token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem('spark_token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isTrainee:       user?.role === 'trainee',
    isOrganization:  user?.role === 'organization',
    isAdmin:         user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;