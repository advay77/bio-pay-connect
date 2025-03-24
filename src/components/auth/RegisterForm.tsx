
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, SmartphoneIcon, User } from 'lucide-react';
import FingerPrintScanner from './FingerPrintScanner';
import OtpVerification from './OtpVerification';
import { toast } from "sonner";

const mobileRegex = /^[6-9]\d{9}$/;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  mobile: z.string().regex(mobileRegex, {
    message: "Please enter a valid 10-digit Indian mobile number",
  }),
  userType: z.enum(["customer", "merchant"], {
    required_error: "Please select a user type.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface RegisterFormProps {
  onSubmit: (values: FormValues & { fingerprint: boolean }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [stage, setStage] = useState<'form' | 'otp' | 'fingerprint'>('form');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [fingerprintRegistered, setFingerprintRegistered] = useState(false);
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      userType: "customer",
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    setFormValues(values);
    setSendingOtp(true);
    
    // Simulate sending OTP (replace with actual API call)
    setTimeout(() => {
      setSendingOtp(false);
      setStage('otp');
      toast.success("OTP sent to your mobile number");
    }, 1500);
  };

  const handleOtpVerify = (success: boolean) => {
    if (success) {
      setStage('fingerprint');
    }
  };

  const handleOtpResend = () => {
    // Logic for resending OTP is handled within the OtpVerification component
  };

  const handleFingerprintComplete = (success: boolean) => {
    setFingerprintRegistered(success);
    if (success && formValues) {
      setTimeout(() => {
        onSubmit({
          ...formValues,
          fingerprint: true,
        });
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
      {stage === 'form' && (
        <>
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Create your account</h2>
            <p className="text-muted-foreground mt-2">
              Enter your details to register a new account
            </p>
          </div>
          
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(handleFormSubmit)} 
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter your full name" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <SmartphoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter your 10-digit mobile number" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Account Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="customer" id="customer" />
                          <label htmlFor="customer" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Customer
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="merchant" id="merchant" />
                          <label htmlFor="merchant" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Merchant/Shopkeeper
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={sendingOtp}>
                {sendingOtp ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          </Form>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline">
                Login
              </a>
            </p>
          </div>
        </>
      )}

      {stage === 'otp' && formValues && (
        <OtpVerification 
          mobileNumber={formValues.mobile}
          onVerify={handleOtpVerify}
          onResend={handleOtpResend}
          onBack={() => setStage('form')}
        />
      )}
      
      {stage === 'fingerprint' && (
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Register Your Fingerprint</h2>
            <p className="text-muted-foreground mt-2">
              Please scan your fingerprint to complete registration
            </p>
          </div>
          
          <FingerPrintScanner 
            onScanComplete={handleFingerprintComplete} 
            className="py-8"
          />
          
          {fingerprintRegistered ? (
            <div className="text-center animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-green-600">Fingerprint Registered!</h3>
              <p className="text-muted-foreground mt-2">
                Completing your registration...
              </p>
            </div>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setStage('otp')}
              className="mt-4"
            >
              Go Back
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
