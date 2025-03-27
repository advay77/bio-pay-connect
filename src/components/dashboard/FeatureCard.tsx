
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  glowColor?: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  glowColor = "from-blue-400/20 to-cyan-500/10",
  className 
}) => {
  return (
    <div 
      className={cn(
        "bg-[#070b29]/60 backdrop-blur-md border border-white/10 rounded-xl p-6 hover-lift hover:border-white/20 transition-all duration-300 relative group overflow-hidden",
        className
      )}
    >
      {/* Holographic corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/30 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/30 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/30 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/30 rounded-br-lg"></div>
      
      {/* Glow effect */}
      <div className={cn(
        "absolute -inset-1 bg-gradient-to-br opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500",
        glowColor
      )}></div>
      
      <div className="relative z-10">
        <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">{title}</h3>
        
        <p className="text-white/60 text-sm group-hover:text-white/70 transition-colors">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
