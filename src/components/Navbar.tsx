import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Sprout, Menu, X, ArrowRight, LayoutDashboard, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navHome, path: '/' },
    { name: t.navHowItWorks, path: '/#how-it-works' },
    { name: t.navImpact, path: '/#impact' },
    { name: t.navSimulator, path: '/simulator' },
    { name: t.navAbout, path: '/about' }
  ];

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/farmer';

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-xs py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5 fill-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Irri<span className="text-emerald-600">Go</span>
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase">
                AI
              </span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 block -mt-1 tracking-wider">
              AgriPulse Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-100/60 shadow-xs">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.path}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                location.pathname === link.path
                  ? 'text-emerald-800 bg-emerald-100/80 font-bold'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Nav Utilities */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to={dashboardPath}
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-md shadow-emerald-700/20 cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to Portal</span>
              </Link>
              <button
                onClick={logout}
                className="p-2 rounded-full text-slate-400 hover:text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/auth/signin"
                className="text-xs font-bold text-slate-700 hover:text-emerald-700 px-3.5 py-2 rounded-full border border-slate-200/80 hover:bg-slate-50 transition-colors"
              >
                {t.navSignIn}
              </Link>
              <Link
                to="/auth/signup"
                className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-md shadow-emerald-700/20 hover:scale-105 active:scale-95"
              >
                <span>{t.navGetStarted}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-emerald-700 rounded-xl bg-white/80 border border-emerald-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-emerald-100 p-5 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <Link
                to={dashboardPath}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-bold shadow-sm"
              >
                Go to Portal
              </Link>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center border border-emerald-200 text-slate-800 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-50"
                >
                  {t.navSignIn}
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-bold shadow-sm"
                >
                  {t.navGetStarted}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
