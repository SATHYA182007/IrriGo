import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'subtle' | 'emerald' | 'amber' | 'blue';
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'subtle',
  hoverEffect = true,
  ...props
}) => {
  const baseStyle = "rounded-2xl p-5 md:p-6 transition-all duration-300 relative overflow-hidden backdrop-blur-md";

  const variants = {
    subtle: "bg-white/80 border border-emerald-100/80 shadow-xs hover:border-emerald-200/90",
    emerald: "bg-gradient-to-br from-emerald-50/90 to-white/90 border border-emerald-200/90 shadow-sm",
    amber: "bg-gradient-to-br from-emerald-50/80 via-teal-50/30 to-white/90 border border-emerald-200/90 shadow-sm",
    blue: "bg-gradient-to-br from-teal-50/90 to-white/90 border border-teal-200/90 shadow-sm"
  };

  const hoverStyle = hoverEffect ? "hover:-translate-y-0.5 hover:shadow-md" : "";

  return (
    <motion.div
      className={`${baseStyle} ${variants[variant]} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
