
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PaymentRequest from '@/components/payments/PaymentRequest';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"pay" | "request">("pay");
  
  // Check if the URL has a request parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('request') === 'true') {
      setActiveTab("request");
    }
  }, [location.search]);
  
  const handleCreatePaymentRequest = (values: any) => {
    console.log('Payment request created:', values);
  };
  
  const handlePaymentComplete = (success: boolean) => {
    if (success) {
      toast.success('Payment completed successfully!');
      // In a real app, we would update the transaction history
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else {
      toast.error('Payment failed. Please try again.');
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground mt-1">
            Make payments or request money securely using fingerprint authentication.
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "pay" | "request")} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="pay">Pay</TabsTrigger>
            <TabsTrigger value="request">Request</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pay" className="mt-6">
            <PaymentRequest 
              onCreatePaymentRequest={handleCreatePaymentRequest}
              onPaymentComplete={handlePaymentComplete}
              isMerchant={false}
            />
          </TabsContent>
          
          <TabsContent value="request" className="mt-6">
            <PaymentRequest 
              onCreatePaymentRequest={handleCreatePaymentRequest}
              onPaymentComplete={handlePaymentComplete}
              isMerchant={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Payments;
