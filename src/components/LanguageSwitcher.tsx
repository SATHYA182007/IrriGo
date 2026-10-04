import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';
import { Globe, ChevronDown, Check } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; nativeName: string }[] = [
    { code: 'en', label: 'English', nativeName: 'English' },
    { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Select Language"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50/80 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100/80 transition-all cursor-pointer shadow-xs"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-600" />
        <span>{currentLang.nativeName}</span>
        <ChevronDown className="w-3 h-3 text-emerald-600 opacity-70" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-emerald-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            Language / மொழி / भाषा
          </div>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-emerald-50 transition-colors cursor-pointer ${
                language === lang.code ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
              }`}
            >
              <span>{lang.nativeName} ({lang.label})</span>
              {language === lang.code && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
