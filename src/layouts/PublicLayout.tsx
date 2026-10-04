import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DemoBanner } from '../components/DemoBanner';
import { OfflineBanner } from '../components/OfflineBanner';

export const PublicLayout: React.FC = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFFFC]">
      <DemoBanner />
      <OfflineBanner />
      {!isAuthPage && <Navbar />}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};
