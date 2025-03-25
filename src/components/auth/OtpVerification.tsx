
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, SmartphoneIcon } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import FingerprintModelCanvas from '../3d/FingerprintModel';
import { useRef } from 'react';

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
  const [scanAnimation, setScanAnimation] = useState(false);
  const modelRef = useRef(null);

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
      setScanAnimation(true);
      
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
      setScanAnimation(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
      setLoading(false);
      setScanAnimation(false);
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
    setScanAnimation(true);
    
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
      setScanAnimation(false);
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
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight relative">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Verify your mobile
          </span>
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 bottom-0 left-0 transform -translate-y-1"></div>
        </h2>
        <p className="text-muted-foreground flex justify-center items-center gap-2">
          <SmartphoneIcon className="h-4 w-4" /> 
          We've sent a 6-digit OTP to {mobileNumber}
        </p>
      </div>

      {/* 3D Fingerprint Model */}
      <div className={`h-40 w-full transition-opacity duration-500 ${scanAnimation ? 'opacity-100' : 'opacity-70'}`} ref={modelRef}>
        <FingerprintModelCanvas className="h-full w-full" />
      </div>

      <div className="bg-gradient-to-r from-cyan-950/30 to-blue-950/30 backdrop-blur-lg rounded-xl p-6 border border-cyan-800/30">
        <div className="space-y-4">
          <div className="bg-black/20 backdrop-blur-md rounded-lg p-4">
            <InputOTP 
              maxLength={6} 
              value={otp} 
              onChange={setOtp}
              disabled={loading}
              className="justify-center"
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
            <p className="text-xs text-cyan-400/80 mt-3 text-center">
              Enter the 6-digit code sent to your mobile
            </p>
          </div>

          <Button 
            onClick={handleVerify} 
            disabled={otp.length !== 6 || loading}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all"
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
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30"
            >
              Back
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleResend}
              disabled={timer > 0 || loading || isResending}
              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30"
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
      
      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          <span className="text-cyan-500">Note:</span> In this demo, check your browser console to see the OTP.
          <br />
          In a production app, this would be sent via SMS to your mobile.
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
