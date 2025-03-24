
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
import { Fingerprint, Loader2, SmartphoneIcon } from 'lucide-react';
import FingerPrintScanner from './FingerPrintScanner';
import OtpVerification from './OtpVerification';
import { toast } from "sonner";

const mobileRegex = /^[6-9]\d{9}$/;

const formSchema = z.object({
  mobile: z.string().regex(mobileRegex, {
    message: "Please enter a valid 10-digit Indian mobile number",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onSubmit: (values: { mobile: string, fingerprint: boolean }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [stage, setStage] = useState<'form' | 'otp' | 'fingerprint'>('form');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [mobile, setMobile] = useState("");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    setMobile(values.mobile);
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
    if (success) {
      setTimeout(() => {
        onSubmit({
          mobile,
          fingerprint: true,
        });
      }, 800);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-6 animate-fade-in">
      {stage === 'form' && (
        <>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">
              Enter your mobile number to sign in
            </p>
          </div>
          
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(handleFormSubmit)} 
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <SmartphoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Enter your 10-digit mobile number" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
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
              Don't have an account?{" "}
              <a href="/register" className="text-primary hover:underline">
                Register
              </a>
            </p>
          </div>
        </>
      )}

      {stage === 'otp' && (
        <OtpVerification 
          mobileNumber={mobile}
          onVerify={handleOtpVerify}
          onResend={handleOtpResend}
          onBack={() => setStage('form')}
        />
      )}
      
      {stage === 'fingerprint' && (
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Verify Your Identity</h2>
            <p className="text-muted-foreground mt-2">
              Please scan your fingerprint to continue
            </p>
          </div>
          
          <FingerPrintScanner 
            onScanComplete={handleFingerprintComplete} 
            className="py-8"
          />
          
          <Button 
            variant="outline" 
            onClick={() => setStage('otp')}
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
