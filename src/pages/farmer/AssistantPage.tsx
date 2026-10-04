import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useFarm } from '../../context/FarmContext';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { Bot, Send, Mic, Sparkles, User, Droplets, Sun, CloudRain, Sprout, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const AssistantPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { sensorData, recommendation, weatherData } = useFarm();

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const defaultMessages = [
    {
      sender: 'bot',
      text: language === 'ta'
        ? 'வணக்கம் ரவி! நான் உங்கள் அக்ரிபல்ஸ் உதவியாளன். இன்று உங்கள் பண்ணையைப் பற்றி என்ன தெரிந்து கொள்ள வேண்டும்?'
        : language === 'hi'
        ? 'नमस्ते रवि! मैं आपका एग्रीपल्स सहायक हूं। आज अपने खेत के बारे में क्या जानना चाहते हैं?'
        : 'Good morning Ravi! I am your AgriPulse AI assistant. What would you like to ask about your farm today?'
    }
  ];

  const [chatHistory, setChatHistory] = useState(defaultMessages);

  const sampleQuestions = [
    "Should I water today?",
    "Will it rain tomorrow?",
    "Is my crop healthy?",
    "When should I harvest?",
    "How much water did I use?"
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg = { sender: 'user', text: q };
    let botReply = '';

    const lower = q.toLowerCase();
    if (lower.includes('water') || lower.includes('irrigate')) {
      botReply = `💧 ${recommendation.headline}. Recommended duration: ${recommendation.durationMinutes} mins at ${recommendation.recommendedTime} using ${recommendation.energySource}.`;
    } else if (lower.includes('rain') || lower.includes('weather')) {
      botReply = `🌦️ Current temperature is ${weatherData.temp}°C with ${weatherData.rainProbability}% chance of rain. Rain is expected on Thursday (75%).`;
    } else if (lower.includes('healthy') || lower.includes('crop')) {
      botReply = `🌱 Your Field A (Tomato) and Field B (Chilli) crops are healthy with current soil moisture at ${sensorData.soilMoisture}%.`;
    } else if (lower.includes('harvest')) {
      botReply = `📦 Field A Tomatoes are 85% ready for harvest in 3-5 days. Market dispatch priority is High.`;
    } else {
      botReply = `🤖 AgriPulse status: Soil moisture is ${sensorData.soilMoisture}%, solar irradiance is ${sensorData.solarIrradiance} W/m², and water tank level is ${sensorData.waterTankLevel}%.`;
    }

    setChatHistory(prev => [...prev, userMsg, { sender: 'bot', text: botReply }]);
    setInputQuery('');
  };

  const toggleMicMock = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend("Should I water today?");
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={t.navAssistant}
        subtitle="Voice and text AI assistant for quick farm decision support."
        badge="Multi-Lingual AI"
      />

      {/* Suggested Quick Question Chips */}
      <div className="flex flex-wrap gap-2">
        {sampleQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSend(q)}
            className="px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            💬 {q}
          </button>
        ))}
      </div>

      {/* Chat Window Glass Container */}
      <GlassCard className="p-4 sm:p-6 h-[480px] flex flex-col justify-between">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-white'
                    : 'bg-emerald-700 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl max-w-[80%] text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white font-medium rounded-tr-none'
                    : 'bg-slate-100 text-slate-800 font-medium rounded-tl-none border border-slate-200'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={toggleMicMock}
            className={`p-3 rounded-full text-white transition-all cursor-pointer ${
              isListening ? 'bg-rose-600 animate-pulse' : 'bg-emerald-700 hover:bg-emerald-800'
            }`}
            title="Speak in English, Tamil, or Hindi"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? "Listening to your voice..." : "Ask AgriPulse (e.g. Should I water today?)"}
            className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 text-xs text-slate-800 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600"
          />

          <button
            onClick={() => handleSend()}
            className="p-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white transition-all cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
