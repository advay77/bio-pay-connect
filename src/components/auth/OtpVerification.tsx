
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

interface OtpVerificationProps {
  mobileNumber: string;
  onVerify: (success: boolean) => void;
  onResend: () => void;
  onBack: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ 
  mobileNumber, 
  onVerify, 
  onResend,
  onBack 
}) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);

  // Timer countdown for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Handle OTP verification
  const handleVerify = () => {
    // Validation check
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    
    // Simulate OTP verification (replace with actual API call)
    setTimeout(() => {
      // For demo purposes, we'll accept any 6-digit OTP
      // In production, this would validate against a backend service
      const isValid = otp.length === 6;
      
      if (isValid) {
        toast.success("OTP verified successfully");
        onVerify(true);
      } else {
        toast.error("Invalid OTP. Please try again.");
        onVerify(false);
      }
      
      setLoading(false);
    }, 1500);
  };

  // Handle resend OTP
  const handleResend = () => {
    setIsResending(true);
    
    // Simulate OTP resend (replace with actual API call)
    setTimeout(() => {
      toast.success("A new OTP has been sent to your mobile number");
      setTimer(30);
      setIsResending(false);
      setOtp('');
      onResend();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Verify your mobile</h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit OTP to {mobileNumber}
        </p>
      </div>

      <div className="space-y-4">
        <InputOTP 
          maxLength={6} 
          value={otp} 
          onChange={setOtp}
          disabled={loading}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Enter the 6-digit code sent to your mobile
        </p>

        <Button 
          onClick={handleVerify} 
          disabled={otp.length !== 6 || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </Button>

        <div className="flex justify-between items-center pt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            disabled={loading || isResending}
          >
            Back
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResend}
            disabled={timer > 0 || loading || isResending}
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                Resending...
              </>
            ) : timer > 0 ? (
              `Resend OTP in ${timer}s`
            ) : (
              "Resend OTP"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
