import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';
import { DemoProvider } from './context/DemoContext';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { FarmerLayout } from './layouts/FarmerLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { AboutPage } from './pages/AboutPage';

// Farmer Pages
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { WaterPage } from './pages/farmer/WaterPage';
import { EnergyPage } from './pages/farmer/EnergyPage';
import { CropHealthPage } from './pages/farmer/CropHealthPage';
import { ClimatePage } from './pages/farmer/ClimatePage';
import { PostHarvestPage } from './pages/farmer/PostHarvestPage';
import { AssistantPage } from './pages/farmer/AssistantPage';
import { NotificationsPage } from './pages/farmer/NotificationsPage';
import { ProfilePage } from './pages/farmer/ProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { FarmsPage } from './pages/admin/FarmsPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { DevicesPage } from './pages/admin/DevicesPage';
import { AlertsPage } from './pages/admin/AlertsPage';

// Simple Prototype Auth Guard
const ProtectedFarmerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }
  return <>{children}</>;
};

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <LanguageProvider>
        <FarmProvider>
          <DemoProvider>
            <Router>
              <Routes>
                {/* Public Website Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<LandingPage />} />
                  <Route path="auth" element={<AuthPage />} />
                  <Route path="auth/signin" element={<AuthPage />} />
                  <Route path="auth/signup" element={<AuthPage />} />
                  <Route path="auth/forgot-password" element={<AuthPage />} />
                  <Route path="simulator" element={<SimulatorPage />} />
                  <Route path="about" element={<AboutPage />} />
                </Route>

                {/* Farmer Dashboard Experience */}
                <Route
                  path="/farmer"
                  element={
                    <ProtectedFarmerRoute>
                      <FarmerLayout />
                    </ProtectedFarmerRoute>
                  }
                >
                  <Route index element={<FarmerDashboard />} />
                  <Route path="water" element={<WaterPage />} />
                  <Route path="energy" element={<EnergyPage />} />
                  <Route path="crop-health" element={<CropHealthPage />} />
                  <Route path="climate" element={<ClimatePage />} />
                  <Route path="post-harvest" element={<PostHarvestPage />} />
                  <Route path="assistant" element={<AssistantPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                </Route>

                {/* FPO / Admin Dashboard Experience */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdminRoute>
                      <AdminLayout />
                    </ProtectedAdminRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="farms" element={<FarmsPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="devices" element={<DevicesPage />} />
                  <Route path="alerts" element={<AlertsPage />} />
                </Route>

                {/* Fallback Catch-all Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </DemoProvider>
        </FarmProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default App;
