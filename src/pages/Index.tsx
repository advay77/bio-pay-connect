
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Fingerprint, ArrowRight, ShieldCheck, Smartphone, CreditCard, ChevronDown } from 'lucide-react';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import NetworkVisualization from '@/components/3d/NetworkVisualization';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#05081F] text-white overflow-hidden">
      {/* Network Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <NetworkVisualization />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full py-4 border-b border-white/10 bg-[#05081F]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-cyan-400/20 p-2 rounded-lg">
              <Fingerprint className="h-6 w-6 text-cyan-400" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              BioPay Connect
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-white/70 hover:text-white px-4 py-2">Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-white/70 hover:text-white">About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-cyan-500/20 to-blue-900/20 p-6 no-underline">
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            About BioPay Connect
                          </div>
                          <p className="text-sm text-white/70">
                            The next generation biometric payment platform with military-grade security.
                          </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 hover:bg-white/5">
                          <div className="text-sm font-medium text-white">Our Technology</div>
                          <p className="text-xs text-white/70">Learn about our advanced biometric technology</p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 hover:bg-white/5">
                          <div className="text-sm font-medium text-white">Team</div>
                          <p className="text-xs text-white/70">Meet the people behind BioPay Connect</p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-white/70 hover:text-white px-4 py-2">How It Works</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-white/70 hover:text-white px-4 py-2">Security</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink className="text-white/70 hover:text-white px-4 py-2">Contact</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-white hover:text-white hover:bg-white/10"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Register Now
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl text-center space-y-8 animate-fade-in">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="bg-cyan-400/10 p-4 rounded-full mb-4">
              <Fingerprint className="h-12 w-12 text-cyan-400" />
            </div>
            <p className="text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-4">
              Next Generation Biometric Payment
            </p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Revolutionary
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 my-2">
                Biometric Authentication
              </span>
              Payment System
            </h1>
            <p className="text-xl text-white/70 mt-6 max-w-2xl">
              Secure, fast, and convenient payments using advanced fingerprint and
              palm vein recognition technology. No cards, no phones, just you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover-lift">
              <div className="bg-cyan-400/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <ShieldCheck className="h-7 w-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Secure Authentication</h3>
              <p className="text-white/70">Your fingerprint is your password. Unmatched security for every transaction.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover-lift">
              <div className="bg-cyan-400/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Smartphone className="h-7 w-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Offline Transactions</h3>
              <p className="text-white/70">Complete payments without internet. Works anywhere, anytime.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover-lift">
              <div className="bg-cyan-400/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <CreditCard className="h-7 w-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Digital Wallet</h3>
              <p className="text-white/70">Manage your funds easily with our integrated digital wallet system.</p>
            </div>
          </div>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-white">
                Start Your Biometric Payment Journey
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  onClick={() => navigate('/login')} 
                  className="flex-1 text-lg py-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0"
                  size="lg"
                >
                  Sign In
                  <ArrowRight className="ml-2" />
                </Button>
                <Button 
                  onClick={() => navigate('/register')} 
                  variant="outline" 
                  className="flex-1 text-lg py-6 text-white border-white/20 bg-white/5 hover:bg-white/10 hover:text-white"
                  size="lg"
                >
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="relative z-10 pb-8 text-center">
        <div className="inline-flex flex-col items-center text-white/50">
          <p className="text-sm mb-2">Scroll to explore</p>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 w-full py-6 border-t border-white/10 bg-[#070A1F]/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-sm text-white/50 text-center">
              By using BioPay Connect, you agree to our Terms of Service and Privacy Policy
            </p>
            <p className="text-sm font-medium text-white/50">
              Made with ❤️ by <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">G.S. Dhakad</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
