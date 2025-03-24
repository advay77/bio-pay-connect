
import React, { useState } from 'react';
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

  const handleScan = () => {
    if (scanning) return;
    
    setScanning(true);
    setScanProgress(0);
    
    // Simulate scanning process
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 5;
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
    }, 100);
  };

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
          "relative w-36 h-36 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out shadow-lg",
          scanning ? "bg-primary/20" : "bg-secondary hover:bg-secondary/80",
          scanning && "scan-animation"
        )}
      >
        <Fingerprint 
          size={80} 
          className={cn(
            "transition-all duration-300",
            scanning ? "text-primary animate-pulse-subtle" : "text-muted-foreground"
          )} 
        />
        
        {scanning && (
          <svg 
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              className="text-primary/10"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="46"
              cx="50"
              cy="50"
            />
            <circle
              className="text-primary transition-all duration-300 ease-in-out"
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
      </div>
      
      <p className="mt-6 text-sm font-medium text-center">
        {scanning 
          ? "Processing fingerprint..." 
          : "Tap to scan your fingerprint"
        }
      </p>
      
      <p className="mt-2 text-xs text-muted-foreground max-w-xs text-center">
        {scanning 
          ? "Please keep your finger on the sensor" 
          : "Place your finger on the scanner to authenticate"
        }
      </p>
    </div>
  );
};

export default FingerPrintScanner;
