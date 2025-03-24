
import React from 'react';
import { Check, RefreshCw } from 'lucide-react';

interface Transaction {
  merchant: string;
  amount: number;
  status: 'processing' | 'verified';
  time: string;
}

const LiveTransactionFeed: React.FC = () => {
  const transactions: Transaction[] = [
    {
      merchant: 'NeoFoods',
      amount: 33.97,
      status: 'processing',
      time: 'Just now'
    },
    {
      merchant: 'FutureHealth',
      amount: 9.29,
      status: 'verified',
      time: 'Just now'
    },
    {
      merchant: 'FutureHealth',
      amount: 63.15,
      status: 'verified',
      time: 'Just now'
    }
  ];

  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <div 
          key={index} 
          className="bg-[#080d33] border border-white/5 rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
              {transaction.merchant === 'NeoFoods' ? (
                <span className="text-lg">🍎</span>
              ) : (
                <span className="text-lg">🏥</span>
              )}
            </div>
            <div>
              <p className="font-medium text-white">{transaction.merchant}</p>
              <p className="text-xs text-white/60">{transaction.time}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <p className="font-mono font-bold text-white">${transaction.amount.toFixed(2)}</p>
            <div className={`h-6 px-2 rounded-full flex items-center text-xs gap-1 ${
              transaction.status === 'processing' 
                ? 'bg-yellow-500/20 text-yellow-300' 
                : 'bg-green-500/20 text-green-300'
            }`}>
              {transaction.status === 'processing' ? (
                <>
                  <RefreshCw className="h-3 w-3" />
                  <span>Processing</span>
                </>
              ) : (
                <>
                  <Check className="h-3 w-3" />
                  <span>Verified</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveTransactionFeed;
