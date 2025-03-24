
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchIcon, Fingerprint, ArrowRight } from 'lucide-react';
import FingerPrintScanner from '../auth/FingerPrintScanner';

const formSchema = z.object({
  amount: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, {
    message: "Please enter a valid amount greater than 0",
  }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PaymentRequestProps {
  onCreatePaymentRequest: (values: FormValues) => void;
  onPaymentComplete?: (success: boolean) => void;
  isMerchant?: boolean;
}

const PaymentRequest: React.FC<PaymentRequestProps> = ({ 
  onCreatePaymentRequest,
  onPaymentComplete,
  isMerchant = true
}) => {
  const [stage, setStage] = useState<'form' | 'scanner' | 'complete'>('form');
  const [paymentDetails, setPaymentDetails] = useState<FormValues | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    setPaymentDetails(values);
    onCreatePaymentRequest(values);
    
    // If merchant, move to scanner stage
    if (isMerchant) {
      setStage('scanner');
    } else {
      // If customer, can directly complete the flow
      setStage('complete');
      if (onPaymentComplete) {
        onPaymentComplete(true);
      }
    }
  };

  const handleScanComplete = (success: boolean) => {
    setStage('complete');
    if (onPaymentComplete) {
      onPaymentComplete(success);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>
          {stage === 'form' 
            ? (isMerchant ? "Request Payment" : "Send Payment") 
            : stage === 'scanner' 
              ? "Customer Authentication" 
              : "Payment Complete"
          }
        </CardTitle>
        <CardDescription>
          {stage === 'form' 
            ? (isMerchant ? "Create a new payment request" : "Send money to a merchant") 
            : stage === 'scanner' 
              ? "Ask customer to scan their fingerprint" 
              : "Transaction has been processed"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {stage === 'form' && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter amount" 
                        {...field} 
                        type="number" 
                        min="1" 
                        step="0.01"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {isMerchant && (
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="What is this payment for?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {!isMerchant && (
                <div className="space-y-3">
                  <FormLabel>Merchant</FormLabel>
                  <div className="flex w-full items-center space-x-2">
                    <Input placeholder="Search merchant" />
                    <Button type="button" size="icon" variant="ghost">
                      <SearchIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <Button type="submit" className="w-full">
                {isMerchant ? "Generate Payment Request" : "Continue to Pay"}
              </Button>
            </form>
          </Form>
        )}
        
        {stage === 'scanner' && (
          <div className="text-center space-y-6 py-4">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10">
              <Fingerprint className="h-10 w-10 text-primary" />
            </div>
            
            <div className="space-y-2">
              <p className="font-medium">
                Ready to receive payment of ₹{paymentDetails?.amount}
              </p>
              <p className="text-sm text-muted-foreground">
                Ask customer to scan their fingerprint to authorize payment
              </p>
            </div>
            
            <FingerPrintScanner 
              onScanComplete={handleScanComplete} 
              className="py-6"
            />
          </div>
        )}
        
        {stage === 'complete' && (
          <div className="text-center space-y-6 py-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-medium">Payment Successful!</h3>
              <p className="text-muted-foreground">
                {isMerchant 
                  ? `You received ₹${paymentDetails?.amount}`
                  : `You sent ₹${paymentDetails?.amount}`
                }
              </p>
            </div>
            
            <Button 
              onClick={() => setStage('form')} 
              className="mt-4"
            >
              {isMerchant ? "Create New Request" : "Make Another Payment"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentRequest;
