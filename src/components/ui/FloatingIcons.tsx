
import React from 'react';
import { Fingerprint, ShieldCheck, Zap, Cpu, Key, Lock } from 'lucide-react';

const FloatingIcons: React.FC = () => {
  const icons = [
    { 
      icon: <Fingerprint className="text-cyan-400/70" />, 
      size: 24, 
      position: { top: '15%', left: '5%' },
      animation: 'animate-float',
      delay: '0s'
    },
    { 
      icon: <ShieldCheck className="text-green-400/70" />, 
      size: 32, 
      position: { top: '60%', left: '8%' },
      animation: 'animate-float',
      delay: '1.5s'
    },
    { 
      icon: <Lock className="text-purple-400/70" />, 
      size: 20, 
      position: { top: '30%', right: '8%' },
      animation: 'animate-float',
      delay: '0.8s'
    },
    { 
      icon: <Zap className="text-yellow-400/70" />, 
      size: 28, 
      position: { top: '70%', right: '12%' },
      animation: 'animate-float',
      delay: '2.2s'
    },
    { 
      icon: <Cpu className="text-blue-400/70" />, 
      size: 22, 
      position: { top: '40%', left: '25%' },
      animation: 'animate-float',
      delay: '3s'
    },
    { 
      icon: <Key className="text-orange-400/70" />, 
      size: 26, 
      position: { top: '20%', right: '25%' },
      animation: 'animate-float',
      delay: '1.2s'
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {icons.map((item, index) => (
        <div 
          key={index}
          className={`absolute ${item.animation}`}
          style={{
            ...item.position,
            animationDelay: item.delay,
            animationDuration: '6s'
          }}
        >
          <div 
            style={{ width: item.size, height: item.size }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full blur-md bg-white/10"></div>
            {/* Icon */}
            <div className="relative">{item.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
