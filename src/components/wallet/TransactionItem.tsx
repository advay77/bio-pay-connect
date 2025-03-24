
import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  currency?: string;
  recipient?: string;
  sender?: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionItemProps {
  transaction: Transaction;
  className?: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  className
}) => {
  const { type, amount, currency = "₹", recipient, sender, date, time, status } = transaction;
  
  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-lg hover:bg-accent transition-colors",
      className
    )}>
      <div className="flex items-center space-x-3">
        <div className={cn(
          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
          type === 'incoming' 
            ? "bg-green-100 text-green-600" 
            : "bg-amber-100 text-amber-600"
        )}>
          {type === 'incoming' ? (
            <ArrowDownLeft size={20} />
          ) : (
            <ArrowUpRight size={20} />
          )}
        </div>
        
        <div>
          <p className="font-medium text-foreground">
            {type === 'incoming' 
              ? `Received from ${sender}` 
              : `Paid to ${recipient}`
            }
          </p>
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            <span>{date}</span>
            <span className="mx-1">•</span>
            <span>{time}</span>
            <span className="mx-1">•</span>
            <span className={cn(
              "capitalize",
              status === 'completed' ? "text-green-600" : 
              status === 'pending' ? "text-amber-600" : 
              "text-red-600"
            )}>
              {status}
            </span>
          </div>
        </div>
      </div>
      
      <div className={cn(
        "text-right",
        type === 'incoming' ? "text-green-600" : "text-foreground"
      )}>
        <p className="font-semibold">
          {type === 'incoming' ? '+' : '-'} {currency}{amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
