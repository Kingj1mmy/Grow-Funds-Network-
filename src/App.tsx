/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Portfolio from './pages/Portfolio';
import Market from './pages/Market';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import TwoFactor from './pages/TwoFactor';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { UserRole } from './types';

export default function App() {
  const [prices, setPrices] = useState({
    BTC: 54201.07,
    ETH: 31350.22,
    SOL: 57299.42,
  });

  // Simulated Real-Time Price Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        BTC: prev.BTC + (Math.random() - 0.5) * 50,
        ETH: prev.ETH + (Math.random() - 0.5) * 20,
        SOL: prev.SOL + (Math.random() - 0.5) * 10,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/2fa" element={<TwoFactor />} />
          
          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Investor Routes */}
          <Route element={<ProtectedRoute allowedRoles={[UserRole.USER, UserRole.ADMIN, UserRole.SUPER_ADMIN]} />}>
            <Route element={<Layout />}>
              <Route 
                path="/portfolio" 
                element={<Portfolio prices={prices} />} 
              />
              <Route 
                path="/market" 
                element={<Market prices={prices} />} 
              />
              <Route 
                path="/settings" 
                element={<Settings />} 
              />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
