
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = (data: { mobile: string, fingerprint: boolean }) => {
    console.log('Login data:', data);
    // In a real app, we would verify credentials here
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30 p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-8" 
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="bg-card border border-border shadow-lg rounded-xl p-8">
          <LoginForm onSubmit={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default Login;
