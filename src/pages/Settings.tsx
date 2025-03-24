
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import FingerPrintScanner from '@/components/auth/FingerPrintScanner';
import { 
  Shield, 
  Bell, 
  Smartphone, 
  Languages, 
  Eye, 
  LifeBuoy,
  Fingerprint
} from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [biometricAuth, setBiometricAuth] = useState(true);
  const [transactionLimit, setTransactionLimit] = useState([5000]);
  const [showResetBiometric, setShowResetBiometric] = useState(false);
  
  const handleResetBiometric = () => {
    setShowResetBiometric(true);
  };
  
  const handleBiometricComplete = (success: boolean) => {
    if (success) {
      setShowResetBiometric(false);
      toast.success('Biometric data has been reset successfully!');
    }
  };
  
  const handleSaveChanges = () => {
    toast.success('Settings saved successfully!');
  };
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Customize your account preferences and security settings
          </p>
        </div>
        
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3 mb-6">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="security">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-start space-y-0 gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Fingerprint className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <CardTitle>Biometric Authentication</CardTitle>
                    <CardDescription>
                      Manage your fingerprint authentication settings
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!showResetBiometric ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="biometric-auth">Enable Biometric Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Use your fingerprint to authenticate transactions
                          </p>
                        </div>
                        <Switch
                          id="biometric-auth"
                          checked={biometricAuth}
                          onCheckedChange={setBiometricAuth}
                        />
                      </div>
                      
                      <Button 
                        onClick={handleResetBiometric}
                        variant="outline" 
                        className="w-full"
                      >
                        Reset Biometric Data
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-3 text-center py-3">
                      <h3 className="text-sm font-medium">
                        Scan your fingerprint to reset biometric data
                      </h3>
                      <FingerPrintScanner onScanComplete={handleBiometricComplete} />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowResetBiometric(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-start space-y-0 gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <CardTitle>Transaction Security</CardTitle>
                    <CardDescription>
                      Configure transaction limits and security options
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Transaction Limit (₹)</Label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">₹1,000</span>
                      <span className="text-sm text-muted-foreground">₹10,000</span>
                    </div>
                    <Slider
                      value={transactionLimit}
                      min={1000}
                      max={10000}
                      step={500}
                      onValueChange={setTransactionLimit}
                    />
                    <p className="text-center text-sm mt-2">
                      Current limit: ₹{transactionLimit[0].toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Security Verification</Label>
                    <RadioGroup defaultValue="fingerprint" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fingerprint" id="fingerprint" />
                        <Label htmlFor="fingerprint">Fingerprint only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fingerprint-pin" id="fingerprint-pin" />
                        <Label htmlFor="fingerprint-pin">Fingerprint + PIN for amounts above limit</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader className="flex flex-row items-start space-y-0 gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1.5">
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about your account activity
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                
                <div className="space-y-4 pl-6 border-l-2 border-border">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="transaction-alerts">Transaction Alerts</Label>
                    <Switch
                      id="transaction-alerts"
                      checked={transactionAlerts}
                      onCheckedChange={setTransactionAlerts}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <Switch
                      id="marketing-emails"
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                      disabled={!notificationsEnabled}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Notification Channels</Label>
                  <RadioGroup defaultValue="sms-email" className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sms" id="sms" disabled={!notificationsEnabled} />
                      <Label htmlFor="sms">SMS only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" disabled={!notificationsEnabled} />
                      <Label htmlFor="email">Email only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sms-email" id="sms-email" disabled={!notificationsEnabled} />
                      <Label htmlFor="sms-email">Both SMS and Email</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-start space-y-0 gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <CardTitle>Display Settings</CardTitle>
                    <CardDescription>
                      Customize how the app appears
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Currency Format</Label>
                    <RadioGroup defaultValue="rupee" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rupee" id="rupee" />
                        <Label htmlFor="rupee">₹ 1,000.00</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rupee-after" id="rupee-after" />
                        <Label htmlFor="rupee-after">1,000.00 ₹</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="hide-balance">Hide Balance</Label>
                      <p className="text-sm text-muted-foreground">
                        Hide your balance by default on the dashboard
                      </p>
                    </div>
                    <Switch id="hide-balance" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-start space-y-0 gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Languages className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <CardTitle>Language & Region</CardTitle>
                    <CardDescription>
                      Set your language and regional preferences
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="mr">Marathi</option>
                      <option value="ta">Tamil</option>
                      <option value="te">Telugu</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <select
                      id="region"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="in">India</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="sg">Singapore</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveChanges} className="px-8">
            Save Changes
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
