
import React, { useState, useEffect } from 'react';
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
import { Loader2, SmartphoneIcon, User, Mail, Building2 } from 'lucide-react';
import FingerPrintScanner from './FingerPrintScanner';
import OtpVerification from './OtpVerification';
import { toast } from "sonner";
import MerchantVerification from './MerchantVerification';

const mobileRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().regex(emailRegex, {
    message: "Please enter a valid email address",
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
  const [stage, setStage] = useState<'form' | 'otp' | 'fingerprint' | 'merchantVerification'>('form');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [fingerprintRegistered, setFingerprintRegistered] = useState(false);
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [currentMerchantStep, setCurrentMerchantStep] = useState(0);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
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
      
      // Generate a 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Generated OTP:', generatedOtp); // For testing purposes
      
      toast.success("OTP sent to your mobile number");
    }, 1500);
  };

  const handleOtpVerify = (success: boolean) => {
    if (success) {
      if (formValues?.userType === "merchant") {
        setStage('merchantVerification');
      } else {
        setStage('fingerprint');
      }
    }
  };

  const handleOtpResend = () => {
    // Logic for resending OTP is handled within the OtpVerification component
  };

  const handleMerchantVerificationComplete = () => {
    setStage('fingerprint');
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter your email address" className="pl-10" type="email" {...field} />
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
                        className="grid grid-cols-2 gap-4"
                      >
                        <div className="relative rounded-lg border border-cyan-800/30 bg-black/20 backdrop-blur-md p-4 cursor-pointer transition-all hover:border-cyan-500/50 hover:bg-black/30">
                          <RadioGroupItem 
                            value="customer" 
                            id="customer" 
                            className="absolute right-2 top-2"
                          />
                          <label 
                            htmlFor="customer" 
                            className="block cursor-pointer"
                          >
                            <div className="flex flex-col items-center">
                              <User className="h-8 w-8 mb-2 text-cyan-400" />
                              <span className="text-sm font-medium">Customer</span>
                              <span className="text-xs text-muted-foreground mt-1">Personal use</span>
                            </div>
                          </label>
                        </div>
                        
                        <div className="relative rounded-lg border border-cyan-800/30 bg-black/20 backdrop-blur-md p-4 cursor-pointer transition-all hover:border-cyan-500/50 hover:bg-black/30">
                          <RadioGroupItem 
                            value="merchant" 
                            id="merchant" 
                            className="absolute right-2 top-2"
                          />
                          <label 
                            htmlFor="merchant" 
                            className="block cursor-pointer"
                          >
                            <div className="flex flex-col items-center">
                              <Building2 className="h-8 w-8 mb-2 text-cyan-400" />
                              <span className="text-sm font-medium">Merchant</span>
                              <span className="text-xs text-muted-foreground mt-1">Business use</span>
                            </div>
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400" disabled={sendingOtp}>
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
      
      {stage === 'merchantVerification' && formValues && (
        <MerchantVerification
          userData={formValues}
          onComplete={handleMerchantVerificationComplete}
          onBack={() => setStage('otp')}
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
              onClick={() => formValues?.userType === "merchant" ? setStage('merchantVerification') : setStage('otp')}
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
