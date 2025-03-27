
import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ 
  value, 
  label,
  className,
  icon
}) => {
  return (
    <div 
      className={cn(
        "bg-[#070b29]/60 backdrop-blur-md border border-white/10 rounded-xl p-6 relative group hover:shadow-lg transition-all duration-300 overflow-hidden",
        className
      )}
    >
      {/* Holographic corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/30 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/30 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/30 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/30 rounded-br-lg"></div>
      
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white/10 transition-opacity duration-300"></div>
      
      {/* Stat content */}
      <div className={cn("text-center relative z-10", icon && "flex items-center gap-3")}>
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className={icon ? "text-left" : "text-center"}>
          <h3 className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent truncate">
            {value}
          </h3>
          <p className="text-white/60 text-sm">{label}</p>
        </div>
      </div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 w-1/12 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
    </div>
  );
};

export default StatCard;
