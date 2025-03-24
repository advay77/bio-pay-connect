
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Fingerprint } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30">
      <div className="w-full max-w-lg text-center space-y-8 px-4 animate-fade-in">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 pb-2">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Fingerprint className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              BioPay
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mt-4 max-w-md">
            The future of payments. Fast, secure, and completely biometric.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 rounded-3xl blur-3xl opacity-40" />
          <div className="relative bg-card border border-border rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-6">
              Revolutionizing Transactions with Fingerprint Authentication
            </h2>
            
            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Fast, secure, and completely offline transactions</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No PINs or passwords to remember</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Simple wallet management for customers and merchants</span>
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => navigate('/login')} 
                className="flex-1 hover-lift"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => navigate('/register')} 
                variant="outline" 
                className="flex-1 hover-lift"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          By using BioPay, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Index;
