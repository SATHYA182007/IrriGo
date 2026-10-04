import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Phone, Lock, User as UserIcon, ShieldCheck, ArrowLeft, Building2, UserCheck } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { language, setLanguage } = useLanguage();

  const isSignUp = location.pathname.includes('signup');
  const isForgotPassword = location.pathname.includes('forgot-password');

  // Form states
  const [emailOrPhone, setEmailOrPhone] = useState('ravi.kumar@irrigo.farm');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Ravi Kumar');
  const [userRole, setUserRole] = useState<'farmer' | 'admin'>('farmer');
  const [locationState, setLocationState] = useState('Salem, Tamil Nadu');
  const [farmSize, setFarmSize] = useState('2.4 Acres');
  const [primaryCrop, setPrimaryCrop] = useState('Tomato');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      signup({
        name: fullName,
        email: emailOrPhone,
        role: userRole,
        location: locationState,
        farmSize,
        primaryCrop,
        language
      });
      navigate(userRole === 'admin' ? '/admin' : '/farmer');
    } else {
      login(emailOrPhone, userRole);
      navigate(userRole === 'admin' ? '/admin' : '/farmer');
    }
  };

  const handleDemoSignIn = (role: 'farmer' | 'admin') => {
    login(role === 'admin' ? 'admin@kaveri-fpo.org' : 'ravi.kumar@irrigo.farm', role);
    navigate(role === 'admin' ? '/admin' : '/farmer');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8 bg-[#FAFFFC]">
      {/* Back to Home Header Link */}
      <div className="max-w-4xl w-full mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors bg-white/80 px-3.5 py-1.5 rounded-full border border-emerald-100 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing Page</span>
        </Link>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
        {/* Left Side Green Panel */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl" />

          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center font-extrabold">
                <Sprout className="w-5 h-5 fill-slate-950" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">IrriGo AI</span>
            </Link>

            <h2 className="text-2xl font-extrabold text-white mb-3">
              {isSignUp ? "Join the Smart Agriculture Network" : "Sign In to Access Farm Intelligence"}
            </h2>

            <p className="text-xs text-emerald-100 leading-relaxed mb-6">
              “Smarter Farming. Less Water. Cleaner Energy.”
            </p>

            <div className="space-y-3 pt-4 border-t border-emerald-700/60">
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Solar-pump smart scheduling</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Vernacular support (EN, TA, HI)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Farmer & FPO Admin Portals</span>
              </div>
            </div>
          </div>

          <div className="pt-8 text-[11px] text-emerald-200/70">
            Designed for Indian smallholders & FPO leaders.
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:col-span-7 p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold text-slate-900">
              {isForgotPassword
                ? "Reset Your Password"
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select user portal type and enter your account credentials
            </p>
          </div>

          {/* Quick Demo Sign In Options for Hackathon Judges right inside the login screen */}
          {!isForgotPassword && (
            <div className="mb-6 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Instant Hackathon Login Options:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => handleDemoSignIn('farmer')}
                  type="button"
                  className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>Sign In as Farmer</span>
                </button>
                <button
                  onClick={() => handleDemoSignIn('admin')}
                  type="button"
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>Sign In as FPO Admin</span>
                </button>
              </div>
            </div>
          )}

          <div className="relative flex py-2 items-center mb-4">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-slate-400 text-[11px] font-bold uppercase">Or enter credentials</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Ravi Kumar"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>
            )}

            {!isForgotPassword && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number or Email</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={e => setEmailOrPhone(e.target.value)}
                    placeholder="+91 98765 43210 or email"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>
            )}

            {!isForgotPassword && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Portal</label>
                  <select
                    value={userRole}
                    onChange={e => setUserRole(e.target.value as 'farmer' | 'admin')}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white font-semibold"
                  >
                    <option value="farmer">Farmer Dashboard</option>
                    <option value="admin">FPO Admin Portal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Language</label>
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
                  >
                    <option value="en">English</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                  </select>
                </div>
              </div>
            )}

            {isSignUp && (
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={locationState}
                    onChange={e => setLocationState(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Farm Size</label>
                  <input
                    type="text"
                    value={farmSize}
                    onChange={e => setFarmSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Primary Crop</label>
                  <input
                    type="text"
                    value={primaryCrop}
                    onChange={e => setPrimaryCrop(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
                  />
                </div>
              </div>
            )}

            {!isForgotPassword && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  {!isSignUp && (
                    <Link to="/auth/forgot-password" className="text-[11px] font-bold text-emerald-700 hover:underline">
                      Forgot Password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>
            )}

            {isForgotPassword && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Registered Mobile Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer mt-2"
            >
              {isForgotPassword
                ? "Send Reset OTP"
                : isSignUp
                ? "Create Account & Enter Portal"
                : "Sign In to Portal"}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            {isSignUp ? (
              <p>
                Already have an account?{" "}
                <Link to="/auth/signin" className="font-bold text-emerald-700 hover:underline">
                  Sign In
                </Link>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <Link to="/auth/signup" className="font-bold text-emerald-700 hover:underline">
                  Create Account
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
