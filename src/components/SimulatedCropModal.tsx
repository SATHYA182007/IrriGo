import React, { useState } from 'react';
import { X, UploadCloud, Camera, CheckCircle, AlertTriangle, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SimulatedCropModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulatedCropModal: React.FC<SimulatedCropModalProps> = ({ isOpen, onClose }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        runAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setAnalyzed(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  const resetModal = () => {
    setSelectedImage(null);
    setAnalyzed(false);
    setIsAnalyzing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-emerald-100 relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Scan Crop Leaf Photo</h3>
                <p className="text-xs text-slate-500">Computer Vision Crop Health Analysis</p>
              </div>
            </div>
            <button
              onClick={resetModal}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Upload Area */}
          {!selectedImage && !isAnalyzing && !analyzed && (
            <div className="my-6">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-emerald-300 rounded-2xl p-8 bg-emerald-50/50 hover:bg-emerald-50 transition-colors cursor-pointer text-center">
                <UploadCloud className="w-10 h-10 text-emerald-600 mb-2" />
                <span className="text-sm font-bold text-slate-800">Upload Crop Leaf Photo</span>
                <span className="text-xs text-slate-500 mt-1">PNG, JPG or JPEG up to 10MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSimulatedUpload}
                  className="hidden"
                />
              </label>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage("https://images.unsplash.com/photo-1592417817098-8f3d6eb16082?w=600&auto=format&fit=crop&q=80");
                    runAnalysis();
                  }}
                  className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Or click here to test with a sample Tomato leaf image
                </button>
              </div>
            </div>
          )}

          {/* Analyzing State */}
          {isAnalyzing && (
            <div className="my-8 text-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto mb-4"
              />
              <p className="font-bold text-slate-800 text-sm">Analyzing Crop Leaf Features...</p>
              <p className="text-xs text-slate-500 mt-1">Detecting stomatal closure, leaf curling & moisture stress</p>
            </div>
          )}

          {/* Analysis Results */}
          {analyzed && (
            <div className="my-6 space-y-4">
              {selectedImage && (
                <div className="relative rounded-2xl overflow-hidden h-40 border border-slate-200">
                  <img src={selectedImage} alt="Crop sample" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-emerald-900/20 backdrop-blur-xs flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-800 shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Vision AI Scan Complete
                    </span>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-emerald-700" />
                  <span>Early Water Stress Detected</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Leaves display initial signs of moisture deficit in lower canopy stomata. Recommended to check Field A drip irrigation line pressure.
                </p>
              </div>

              {/* Disclaimer Notice */}
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-500 font-medium text-center">
                Prototype AI analysis — not an official agricultural diagnosis.
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              onClick={resetModal}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 cursor-pointer"
            >
              Close
            </button>
            {analyzed && (
              <button
                onClick={resetModal}
                className="px-5 py-2 rounded-full bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer"
              >
                Apply AI Recommendation
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
