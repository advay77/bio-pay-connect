
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

interface HolographicButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const HolographicButton: React.FC<HolographicButtonProps> = ({ 
  children, 
  onClick, 
  className 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - button.left) / button.width;
    const y = (e.clientY - button.top) / button.height;
    setMousePosition({ x, y });
  };

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div 
        className={cn(
          "absolute -inset-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 opacity-70 blur-lg transition-all duration-300",
          isHovering ? "opacity-100 scale-105" : "opacity-50 scale-100"
        )}
      ></div>
      
      <Button
        className={cn(
          "relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg overflow-hidden",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={onClick}
      >
        {/* Holographic shine effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          style={{ 
            transform: `translateX(${(mousePosition.x * 200) - 100}%)`,
            opacity: isHovering ? 1 : 0,
            transition: 'opacity 0.2s ease'
          }}
        ></div>
        
        {/* Particles */}
        {isHovering && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                  transform: `scale(${Math.random() * 0.5 + 0.5})`,
                  animation: `floatParticle ${Math.random() * 2 + 1}s ease-in-out infinite`
                }}
              />
            ))}
          </div>
        )}
        
        {children}
      </Button>
    </div>
  );
};

export default HolographicButton;
