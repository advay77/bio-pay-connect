
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
  const [serverOtp, setServerOtp] = useState<string | null>(null);

  // Timer countdown for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Effect to send OTP when component mounts
  useEffect(() => {
    sendOtp();
  }, []);

  // Function to send SMS OTP
  const sendOtp = async () => {
    try {
      setLoading(true);
      
      // Generate a 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Generated OTP:', generatedOtp); // For testing purposes
      
      // In a production environment, we would call an API to send the SMS
      // For demo purposes, we'll simulate the API call and store the OTP locally
      // This would normally be done on the server side
      
      // Simulate API call to send SMS
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store the OTP temporarily (in a real app, this would be stored server-side)
      setServerOtp(generatedOtp);
      
      toast.success("OTP sent to your mobile number");
      setLoading(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
      setLoading(false);
    }
  };

  // Handle OTP verification
  const handleVerify = async () => {
    // Validation check
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    
    try {
      // In a real app, this would be an API call to verify the OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Compare the entered OTP with the server OTP
      // In production, this verification would happen on the server
      const isValid = otp === serverOtp;
      
      if (isValid) {
        toast.success("OTP verified successfully");
        onVerify(true);
      } else {
        toast.error("Invalid OTP. Please try again.");
        onVerify(false);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    setIsResending(true);
    
    try {
      // Reset OTP field
      setOtp('');
      
      // Call the send OTP function again
      await sendOtp();
      
      setTimer(30);
      toast.success("A new OTP has been sent to your mobile number");
      onResend();
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
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
