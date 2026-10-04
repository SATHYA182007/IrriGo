import React, { useState } from 'react';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { SimulatedCropModal } from '../../components/SimulatedCropModal';
import { Sprout, Camera, CheckCircle2, AlertTriangle, Info, Sparkles, MapPin } from 'lucide-react';

export const CropHealthPage: React.FC = () => {
  const { cropFields } = useFarm();
  const { t } = useLanguage();
  const [selectedField, setSelectedField] = useState(cropFields[0]);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <PageHeader
        title={t.navCropHealth}
        subtitle="Visual field health matrix and computer vision leaf scan diagnostics."
        action={
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>{t.scanCropButton}</span>
          </button>
        }
      />

      {/* Visual Farm Map Grid */}
      <GlassCard className="p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>Farm Field Grid Map Overview</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Click any field to inspect details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
          {cropFields.map(field => {
            const isSelected = selectedField.id === field.id;
            return (
              <div
                key={field.id}
                onClick={() => setSelectedField(field)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-600 shadow-md scale-[1.02]'
                    : 'bg-white/80 border-slate-200/80 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold uppercase text-slate-500">{field.name}</span>
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                      field.healthStatus === 'healthy'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {field.healthStatus === 'healthy' ? 'Healthy' : 'Monitor'}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{field.cropName}</h4>
                <p className="text-xs text-slate-500 mt-1">Moisture: {field.soilMoisturePercent}%</p>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Selected Field Deep Details */}
      <GlassCard variant="emerald" className="p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Selected Field Inspector
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              {selectedField.name} — {selectedField.cropName}
            </h2>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-white rounded-full text-slate-700 border border-slate-200">
            Area: {selectedField.areaAcres} Acres
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80">
            <span className="text-xs text-slate-500 font-medium">Soil Moisture</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">{selectedField.soilMoisturePercent}%</div>
          </div>
          <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80">
            <span className="text-xs text-slate-500 font-medium">Last Irrigation</span>
            <div className="text-lg font-bold text-slate-800 mt-1">{selectedField.lastIrrigationDate}</div>
          </div>
          <div className="p-4 bg-white/90 rounded-2xl border border-slate-200/80">
            <span className="text-xs text-slate-500 font-medium">Rec. Water Volume</span>
            <div className="text-lg font-bold text-slate-800 mt-1">{selectedField.recommendedWaterLiters} L</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 border border-emerald-200 space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-emerald-800">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI Agronomic Field Recommendation:</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {selectedField.aiNotes}
          </p>
        </div>
      </GlassCard>

      <SimulatedCropModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};
