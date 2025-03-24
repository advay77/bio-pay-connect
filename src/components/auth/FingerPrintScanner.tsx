
import React, { useState, useEffect } from 'react';
import { Fingerprint } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FingerPrintScannerProps {
  onScanComplete: (success: boolean) => void;
  className?: string;
}

const FingerPrintScanner: React.FC<FingerPrintScannerProps> = ({ 
  onScanComplete,
  className 
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [pulseEffects, setPulseEffects] = useState<number[]>([]);

  const handleScan = () => {
    if (scanning) return;
    
    setScanning(true);
    setScanProgress(0);
    setPulseEffects([]);
    
    // Simulate scanning process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 2;
        
        // Add pulse effect at certain progress points
        if (newProgress % 20 === 0) {
          setPulseEffects(prev => [...prev, newProgress]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScanning(false);
            onScanComplete(true); // Assuming success for demo
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, 60);
  };

  // Cleanup pulse effects after animation
  useEffect(() => {
    if (pulseEffects.length > 0) {
      const timer = setTimeout(() => {
        setPulseEffects(prev => prev.slice(1));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [pulseEffects]);

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center",
        className
      )}
    >
      <div 
        onClick={handleScan}
        className={cn(
          "relative w-40 h-40 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out shadow-lg overflow-hidden",
          scanning ? "bg-cyan-900/20" : "bg-black/50 hover:bg-black/40 backdrop-blur-md",
          scanning && "scan-animation"
        )}
      >
        {/* Background glow effect */}
        <div className={cn(
          "absolute inset-0 bg-cyan-500/5 rounded-full blur-xl transform scale-90",
          scanning && "pulse-circle"
        )} />
        
        {/* Fingerprint icon */}
        <Fingerprint 
          size={80} 
          className={cn(
            "transition-all duration-300 z-10",
            scanning ? "text-cyan-400 animate-pulse-subtle" : "text-white/60"
          )} 
        />
        
        {/* Circular scan progress */}
        {scanning && (
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              className="text-white/5"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="46"
              cx="50"
              cy="50"
            />
            <circle
              className="text-cyan-400 transition-all duration-300 ease-in-out"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 46}
              strokeDashoffset={2 * Math.PI * 46 * (1 - scanProgress / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="46"
              cx="50"
              cy="50"
            />
          </svg>
        )}
        
        {/* Pulse effects */}
        {pulseEffects.map((_, index) => (
          <div 
            key={`pulse-${index}`}
            className="absolute inset-0 border border-cyan-400 rounded-full animate-ping"
            style={{ 
              animationDuration: '1s',
              animationIterationCount: 1,
              opacity: 0.2,
            }}
          />
        ))}
        
        {/* Holographic effect lines */}
        {scanning && (
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {[...Array(5)].map((_, i) => (
              <div 
                key={`line-${i}`}
                className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                style={{ 
                  top: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.2}s`,
                  transform: `translateX(${Math.sin(Date.now() / 1000 + i) * 10}%)`,
                  opacity: 0.3 + (i * 0.1),
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <p className="mt-6 font-medium text-center text-white">
        {scanning 
          ? "Processing fingerprint..." 
          : "Tap to scan your fingerprint"
        }
      </p>
      
      <p className="mt-2 text-xs text-white/60 max-w-xs text-center">
        {scanning 
          ? "Please keep your finger on the sensor" 
          : "Place your finger on the scanner to authenticate"
        }
      </p>
      
      {/* Display percentage during scan */}
      {scanning && (
        <div className="mt-4 text-sm font-mono text-cyan-400">
          {scanProgress}%
        </div>
      )}
    </div>
  );
};

export default FingerPrintScanner;
