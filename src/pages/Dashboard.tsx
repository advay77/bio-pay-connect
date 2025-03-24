
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import WalletCard from '@/components/wallet/WalletCard';
import TransactionItem, { Transaction } from '@/components/wallet/TransactionItem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, Plus, ArrowUpRight, Shield, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

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
];

const chartData = [
  { name: 'Mon', spent: 150, received: 0 },
  { name: 'Tue', spent: 230, received: 400 },
  { name: 'Wed', spent: 180, received: 0 },
  { name: 'Thu', spent: 340, received: 200 },
  { name: 'Fri', spent: 280, received: 0 },
  { name: 'Sat', spent: 560, received: 0 },
  { name: 'Sun', spent: 210, received: 1200 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [walletBalance, setWalletBalance] = useState(3000);
  const [showAddFundsDialog, setShowAddFundsDialog] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  
  const handleAddFunds = () => {
    const amount = parseInt(fundAmount);
    if (!isNaN(amount) && amount > 0) {
      setWalletBalance(walletBalance + amount);
      setShowAddFundsDialog(false);
      setFundAmount('');
      toast.success(`₹${amount} added to your wallet successfully!`);
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your account.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <WalletCard 
              balance={walletBalance}
              lastTransaction={mockTransactions[0]}
              onAddFunds={() => setShowAddFundsDialog(true)}
            />
          </div>
          
          <Card className="h-full flex flex-col justify-center">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => navigate('/payments')}
                  className="flex flex-col items-center justify-center h-24 text-center neo-morphism"
                  variant="outline"
                >
                  <ArrowUpRight className="h-6 w-6 mb-2" />
                  <span>Make Payment</span>
                </Button>
                
                <Button 
                  onClick={() => navigate('/payments?request=true')}
                  className="flex flex-col items-center justify-center h-24 text-center neo-morphism"
                  variant="outline"
                >
                  <Plus className="h-6 w-6 mb-2" />
                  <span>Request Money</span>
                </Button>
                
                <Button 
                  className="flex flex-col items-center justify-center h-24 text-center neo-morphism"
                  variant="outline"
                  onClick={() => setShowAddFundsDialog(true)}
                >
                  <Wallet className="h-6 w-6 mb-2" />
                  <span>Add Funds</span>
                </Button>
                
                <Button 
                  onClick={() => navigate('/settings')}
                  className="flex flex-col items-center justify-center h-24 text-center neo-morphism"
                  variant="outline"
                >
                  <Shield className="h-6 w-6 mb-2" />
                  <span>Security</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Activity Overview</CardTitle>
                <CardDescription>Your spending and income pattern</CardDescription>
              </div>
              <Tabs defaultValue="week" className="w-[200px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                        border: 'none'
                      }} 
                    />
                    <Bar dataKey="spent" fill="#ff9381" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="received" fill="#36b4e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recent Transactions</CardTitle>
              <Button 
                onClick={() => navigate('/transactions')}
                variant="ghost" 
                size="sm" 
                className="text-sm text-muted-foreground"
              >
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-2">
                {mockTransactions.slice(0, 3).map((transaction) => (
                  <TransactionItem 
                    key={transaction.id} 
                    transaction={transaction} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Dialog open={showAddFundsDialog} onOpenChange={setShowAddFundsDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Funds to Wallet</DialogTitle>
              <DialogDescription>
                Enter the amount you want to add to your wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount (₹)
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  min="1"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleAddFunds} className="w-full">
                Add Funds
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
