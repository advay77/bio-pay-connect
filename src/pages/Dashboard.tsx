
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CreditCard, TrendingUp, Users, ShieldCheck, Fingerprint, Zap } from 'lucide-react';
import WalletCard from '@/components/wallet/WalletCard';
import TransactionItem from '@/components/wallet/TransactionItem';
import NetworkVisualization from '@/components/3d/NetworkVisualization';
import FingerprintModelCanvas from '@/components/3d/FingerprintModel';

// Assuming TransactionItem expects these props based on TypeScript errors
interface CustomTransactionItemProps {
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  type: "incoming" | "outgoing";
}

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <NetworkVisualization className="h-full" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Welcome to BioPay Connect
              </h1>
              <p className="text-muted-foreground">
                Manage your biometric payments and transactions securely
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline" size="sm">
                <Fingerprint className="mr-2 h-4 w-4" />
                Configure Biometrics
              </Button>
              <Button size="sm">
                <CreditCard className="mr-2 h-4 w-4" />
                Quick Pay
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-card to-secondary/30 border-primary/10 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-2">
                    <Fingerprint className="h-4 w-4 text-primary" />
                  </div>
                  Biometric Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="font-medium">Active & Secure</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Last Used</p>
                    <p className="font-medium">Today, 10:23 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-secondary/30 border-primary/10 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  Transaction Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">This Week</p>
                    <p className="font-medium">12 Transactions</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Volume</p>
                    <p className="font-medium">₹4,528.00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-secondary/30 border-primary/10 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>
                  Security Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Your Score</p>
                    <p className="font-medium">98/100</p>
                  </div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-green-500" style={{ width: "98%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <Tabs defaultValue="wallet">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="wallet">Wallet</TabsTrigger>
                    <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <TabsContent value="wallet" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <WalletCard 
                      balance="₹24,500.00"
                      type="Primary"
                      lastTransaction="Today"
                      color="from-blue-700 to-blue-600"
                    />
                    <WalletCard 
                      balance="₹7,250.00"
                      type="Business"
                      lastTransaction="Yesterday"
                      color="from-purple-700 to-purple-600"
                    />
                  </div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Manage your wallet and transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-auto flex-col items-center justify-center py-4 space-y-2 hover-lift">
                          <CreditCard className="h-5 w-5" />
                          <span className="text-xs">Pay</span>
                        </Button>
                        <Button variant="outline" className="h-auto flex-col items-center justify-center py-4 space-y-2 hover-lift">
                          <Users className="h-5 w-5" />
                          <span className="text-xs">Request</span>
                        </Button>
                        <Button variant="outline" className="h-auto flex-col items-center justify-center py-4 space-y-2 hover-lift">
                          <TrendingUp className="h-5 w-5" />
                          <span className="text-xs">Analytics</span>
                        </Button>
                        <Button variant="outline" className="h-auto flex-col items-center justify-center py-4 space-y-2 hover-lift">
                          <ShieldCheck className="h-5 w-5" />
                          <span className="text-xs">Security</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="transactions">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>Your latest payment activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <TransactionItem 
                          description="Grocery Store"
                          amount={-1250}
                          date="Today, 14:32 PM"
                          status="completed"
                          type="outgoing"
                        />
                        <TransactionItem 
                          description="John Smith"
                          amount={850}
                          date="Yesterday, 10:15 AM"
                          status="completed"
                          type="incoming"
                        />
                        <TransactionItem 
                          description="Coffee Shop"
                          amount={-180}
                          date="Mar 24, 2023"
                          status="completed"
                          type="outgoing"
                        />
                        <TransactionItem 
                          description="Mobile Recharge"
                          amount={-499}
                          date="Mar 22, 2023"
                          status="completed"
                          type="outgoing"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Spending Analytics</CardTitle>
                      <CardDescription>Your spending patterns</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <p className="text-muted-foreground">Analytics dashboard will be available soon</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="md:col-span-4">
              <div className="grid grid-cols-1 gap-6">
                <Card className="bg-gradient-to-br from-black to-gray-900 text-white border-none shadow-xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-cyan-400" />
                      BioPay Technology
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Next generation biometric security
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-48 mb-4">
                      <FingerprintModelCanvas />
                    </div>
                    
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-cyan-400 mr-2"></div>
                        <p className="text-sm text-gray-300">Military-grade Encryption</p>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-cyan-400 mr-2"></div>
                        <p className="text-sm text-gray-300">Palm Vein Recognition</p>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-cyan-400 mr-2"></div>
                        <p className="text-sm text-gray-300">Offline Transaction Support</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className="text-xs text-gray-400 italic">
                        Made with ❤️ by G.S. Dhakad
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Features</CardTitle>
                    <CardDescription>New capabilities coming soon</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        <div>
                          <p className="font-medium">Multi-factor Authentication</p>
                          <p className="text-sm text-muted-foreground">Coming in April 2023</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        <div>
                          <p className="font-medium">Business Account Integration</p>
                          <p className="text-sm text-muted-foreground">Coming in May 2023</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-primary/10 p-1 rounded-full mr-2 mt-0.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        </div>
                        <div>
                          <p className="font-medium">Merchant Payment Portal</p>
                          <p className="text-sm text-muted-foreground">Coming in June 2023</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
