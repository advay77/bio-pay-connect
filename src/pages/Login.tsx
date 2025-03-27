
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = (data: { mobile: string, fingerprint: boolean }) => {
    console.log('Login data:', data);
    // In a real app, we would verify credentials here
    toast.success('Login successful!', {
      description: 'You are now logged in.',
    });
    
    // For demo purpose, set a default user type
    sessionStorage.setItem('user', JSON.stringify({
      name: 'Demo User',
      mobile: data.mobile,
      userType: 'merchant', // Default to merchant for demo
      fingerprint: data.fingerprint,
    }));
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4 relative overflow-hidden">
      {/* Background network grid with animation */}
      <div className="absolute inset-0 bg-network-grid bg-[length:50px_50px] opacity-20"></div>
      
      {/* Animated orbs in background */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="w-full max-w-md relative z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="bg-card/80 backdrop-blur-xl border border-cyan-800/30 shadow-lg rounded-xl p-8">
          <div className="mb-4 border-l-2 border-cyan-500/50 pl-3">
            <p className="text-sm text-muted-foreground">
              For demonstration purposes, the OTP will be shown in the browser console. 
              In a production app, the OTP would be sent via real SMS to your mobile number.
            </p>
          </div>
          <LoginForm onSubmit={handleLogin} />
        </div>
        
        {/* Decorative holographic strip */}
        <div className="absolute -top-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"></div>
        <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0"></div>
      </div>
    </div>
  );
};

export default Login;
