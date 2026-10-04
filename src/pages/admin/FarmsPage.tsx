import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { GlassCard } from '../../components/GlassCard';
import { Building2, Search, Filter, Plus } from 'lucide-react';

export const FarmsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="FPO Farm Registry"
        subtitle="Manage registered smallholder plots, acreage boundaries, and irrigation equipment."
        action={
          <button className="flex items-center gap-1.5 bg-emerald-700 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-emerald-800 transition-colors shadow-xs">
            <Plus className="w-4 h-4" /> Add New Farm Plot
          </button>
        }
      />

      <GlassCard className="p-6">
        <p className="text-xs text-slate-600">
          Showing 38 smallholder farm plots in Cauvery Federation Basin. Filter by soil type, crop variety, or solar inverter connection.
        </p>
      </GlassCard>
    </div>
  );
};
