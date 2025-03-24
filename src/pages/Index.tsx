
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Fingerprint, ArrowRight, ShieldCheck, Smartphone, CreditCard } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl text-center space-y-8 animate-fade-in">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Fingerprint className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-foreground">
              BioPay Connect
            </h1>
            <p className="text-xl text-muted-foreground mt-6 max-w-2xl">
              The future of payments. Fast, secure, and completely biometric.
              No cards, no phones, just your fingerprint.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover-lift">
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <ShieldCheck className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
              <p className="text-muted-foreground">Your fingerprint is your password. Unmatched security for every transaction.</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover-lift">
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Smartphone className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Offline Transactions</h3>
              <p className="text-muted-foreground">Complete payments without internet. Works anywhere, anytime.</p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover-lift">
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <CreditCard className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Wallet</h3>
              <p className="text-muted-foreground">Manage your funds easily with our integrated digital wallet system.</p>
            </div>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/20 to-primary/5 rounded-3xl blur-3xl opacity-40"></div>
            <div className="relative bg-card border border-border rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">
                Start Your Biometric Payment Journey
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  onClick={() => navigate('/login')} 
                  className="flex-1 text-lg py-6 hover-lift"
                  size="lg"
                >
                  Sign In
                  <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  onClick={() => navigate('/register')} 
                  variant="outline" 
                  className="flex-1 text-lg py-6 hover-lift"
                  size="lg"
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full py-6 border-t border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-sm text-muted-foreground text-center">
              By using BioPay Connect, you agree to our Terms of Service and Privacy Policy
            </p>
            <p className="text-sm font-medium">
              Made with ❤️ by G.S. Dhakad
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
