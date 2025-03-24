
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionItem, { Transaction } from '@/components/wallet/TransactionItem';
import { Search, Filter } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'outgoing',
    amount: 500,
    recipient: 'Sharma Kirana Store',
    date: 'Today',
    time: '2:30 PM',
    status: 'completed',
  },
  {
    id: '2',
    type: 'incoming',
    amount: 1000,
    sender: 'Rajiv Kumar',
    date: 'Yesterday',
    time: '5:15 PM',
    status: 'completed',
  },
  {
    id: '3',
    type: 'outgoing',
    amount: 120,
    recipient: 'Coffee House',
    date: '20 Jun 2023',
    time: '10:45 AM',
    status: 'completed',
  },
  {
    id: '4',
    type: 'incoming',
    amount: 2500,
    sender: 'Wallet Refill',
    date: '18 Jun 2023',
    time: '3:00 PM',
    status: 'completed',
  },
  {
    id: '5',
    type: 'outgoing',
    amount: 850,
    recipient: 'Electronic Store',
    date: '15 Jun 2023',
    time: '1:20 PM',
    status: 'completed',
  },
  {
    id: '6',
    type: 'outgoing',
    amount: 75,
    recipient: 'Food Delivery',
    date: '12 Jun 2023',
    time: '7:45 PM',
    status: 'completed',
  },
  {
    id: '7',
    type: 'incoming',
    amount: 3000,
    sender: 'Salary Advance',
    date: '10 Jun 2023',
    time: '9:00 AM',
    status: 'completed',
  },
  {
    id: '8',
    type: 'outgoing',
    amount: 200,
    recipient: 'Mobile Recharge',
    date: '5 Jun 2023',
    time: '11:30 AM',
    status: 'completed',
  },
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Filter by type based on active tab
    if (activeTab === 'incoming' && transaction.type !== 'incoming') return false;
    if (activeTab === 'outgoing' && transaction.type !== 'outgoing') return false;
    
    // Filter by search term
    if (searchTerm) {
      const recipient = transaction.recipient?.toLowerCase() || '';
      const sender = transaction.sender?.toLowerCase() || '';
      const searchLower = searchTerm.toLowerCase();
      
      return recipient.includes(searchLower) || sender.includes(searchLower);
    }
    
    return true;
  });
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            View your complete transaction history
          </p>
        </div>
        
        <Card className="overflow-hidden">
          <CardHeader className="px-6 pt-6 pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View all your past payments and receipts</CardDescription>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative w-full md:w-60">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <div className="border-b border-border">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
              <TabsList className="w-full justify-start h-11 rounded-none bg-transparent border-b-0">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="incoming" 
                  className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent"
                >
                  Received
                </TabsTrigger>
                <TabsTrigger 
                  value="outgoing" 
                  className="data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none border-b-2 border-transparent"
                >
                  Sent
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <CardContent className="p-0">
            <ScrollArea className="h-[60vh]">
              {filteredTransactions.length > 0 ? (
                <div className="space-y-1">
                  {filteredTransactions.map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      className="rounded-none border-b border-border last:border-b-0 hover:bg-accent/50"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-60 text-center p-6">
                  <div className="rounded-full bg-secondary p-4 mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No transactions found</h3>
                  <p className="text-muted-foreground mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Transactions;
