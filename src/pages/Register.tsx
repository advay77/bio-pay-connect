
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import RegisterForm from '@/components/auth/RegisterForm';
import { toast } from 'sonner';

const Register = () => {
  const navigate = useNavigate();
  
  const handleRegister = (data: any) => {
    console.log('Registration data:', data);
    // In a real app, we would save user data here
    toast.success('Registration successful!', {
      description: `Your ${data.userType === 'merchant' ? 'merchant' : 'customer'} account has been created.`,
    });
    
    // Save the user data in session storage for the demo
    sessionStorage.setItem('user', JSON.stringify({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      userType: data.userType,
      fingerprint: data.fingerprint,
    }));
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4 relative overflow-hidden">
      {/* Background network grid with animation */}
      <div className="absolute inset-0 bg-network-grid bg-[length:50px_50px] opacity-20"></div>
      
      {/* Animated holographic elements */}
      <div className="absolute top-1/3 left-1/5 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      
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
        
        <div className="bg-card/80 backdrop-blur-xl border border-cyan-800/30 shadow-lg rounded-xl p-8 relative">
          {/* Holographic corner accents */}
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-cyan-500/50 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-cyan-500/50 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg"></div>
          
          <div className="mb-4 border-l-2 border-cyan-500/50 pl-3">
            <p className="text-sm text-muted-foreground">
              For demonstration purposes, the OTP will be shown in the browser console. 
              In a production app, the OTP would be sent via real SMS to your mobile number.
            </p>
          </div>
          <RegisterForm onSubmit={handleRegister} />
        </div>
      </div>
    </div>
  );
};

export default Register;
