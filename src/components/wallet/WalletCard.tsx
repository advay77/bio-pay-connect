
import React from 'react';
import { ArrowUpRight, ArrowDownLeft, PlusCircle, EyeOff, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface WalletCardProps {
  title?: string;
  balance?: number;
  value?: number;
  currency?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    text: string;
  };
  lastTransaction?: {
    amount: number;
    type: 'incoming' | 'outgoing';
    date: string;
  };
  onAddFunds?: () => void;
  className?: string;
}

const WalletCard: React.FC<WalletCardProps> = ({
  title,
  balance,
  value,
  currency = "₹",
  icon,
  trend,
  lastTransaction,
  onAddFunds,
  className,
}) => {
  const [hideBalance, setHideBalance] = React.useState(false);
  const displayValue = value !== undefined ? value : balance;

  return (
    <div 
      className={cn(
        "relative overflow-hidden p-6 rounded-xl bg-gradient-to-br from-primary/90 to-primary",
        "shadow-lg border border-primary/20",
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="text-white">
          <defs>
            <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          {icon && <div className="mb-4">{icon}</div>}
          <h3 className="text-sm font-medium text-white/80">
            {title || "Available Balance"}
          </h3>
          <button
            onClick={() => setHideBalance(!hideBalance)}
            className="text-white/70 hover:text-white transition-colors"
            aria-label={hideBalance ? "Show balance" : "Hide balance"}
          >
            {hideBalance ? (
              <Eye size={18} />
            ) : (
              <EyeOff size={18} />
            )}
          </button>
        </div>

        <div className="flex items-baseline space-x-1">
          <span className="text-white/90 text-lg">{currency}</span>
          {hideBalance ? (
            <span className="text-white text-3xl font-semibold tracking-tight">
              •••••
            </span>
          ) : (
            <span className="text-white text-3xl font-semibold tracking-tight">
              {displayValue?.toLocaleString()}
            </span>
          )}
        </div>
        
        {trend && (
          <div className="mt-2 flex items-center">
            <span className={cn(
              "text-sm",
              trend.direction === 'up' ? "text-green-400" : "text-red-400"
            )}>
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
            </span>
            <span className="text-white/60 text-xs ml-1">{trend.text}</span>
          </div>
        )}
        
        {lastTransaction && (
          <div className="mt-5 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "p-2 rounded-full",
                  lastTransaction.type === 'incoming' 
                    ? "bg-green-500/20 text-green-200" 
                    : "bg-amber-500/20 text-amber-200"
                )}>
                  {lastTransaction.type === 'incoming' ? (
                    <ArrowDownLeft size={16} />
                  ) : (
                    <ArrowUpRight size={16} />
                  )}
                </div>
                <div>
                  <p className="text-xs text-white/80">Last Transaction</p>
                  <p className="text-sm text-white font-medium">
                    {lastTransaction.type === 'incoming' ? 'Received' : 'Paid'} {currency}{lastTransaction.amount}
                  </p>
                </div>
              </div>
              <span className="text-xs text-white/70">{lastTransaction.date}</span>
            </div>
          </div>
        )}
        
        {onAddFunds && (
          <Button 
            onClick={onAddFunds}
            className="mt-5 w-full bg-white/20 hover:bg-white/30 text-white border-none"
            variant="outline"
          >
            <PlusCircle size={16} className="mr-2" />
            Add Funds
          </Button>
        )}
      </div>
    </div>
  );
};

export default WalletCard;
