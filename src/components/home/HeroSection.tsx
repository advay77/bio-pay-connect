
import React from 'react';
import { Fingerprint } from 'lucide-react';
import { Button } from "@/components/ui/button";
import HolographicButton from '@/components/ui/HolographicButton';

interface HeroSectionProps {
  navigate: (path: string) => void;
  mousePosition: { x: number, y: number };
}

const HeroSection: React.FC<HeroSectionProps> = ({ navigate, mousePosition }) => {
  return (
    <div className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl text-center space-y-8 animate-fade-in">
        <div className="flex flex-col items-center justify-center mb-8 relative">
          {/* Parallax floating elements */}
          <div className="absolute -top-20 -left-10 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/5 blur-2xl"
            style={{
              transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
            }}
          ></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/5 blur-2xl"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
            }}
          ></div>
          
          {/* Fingerprint icon with animation */}
          <div className="relative group mb-6">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-md group-hover:bg-cyan-400/30 transition-all duration-500 animate-pulse"></div>
            <div className="bg-gradient-to-br from-cyan-900/80 to-blue-900/80 p-6 rounded-full relative hover:scale-105 transition-transform duration-300 backdrop-blur-xl border border-cyan-500/30">
              <Fingerprint className="h-14 w-14 text-cyan-400" />
            </div>
            
            {/* Rotating glow circle */}
            <div className="absolute -inset-2 border border-cyan-500/30 rounded-full animate-spin-slow"></div>
          </div>
          
          <p className="text-sm uppercase tracking-wider text-cyan-400 font-semibold mb-4 letter-spacing-2">
            Next Generation Biometric Payment
          </p>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            <span className="text-gradient-text-animation">Revolutionary</span>
            <br />
            <span className="text-gradient-text-animation-delay-1">Biometric Authentication</span>
            <br />
            <span className="text-gradient-text-animation-delay-2">Payment System</span>
          </h1>
          
          <p className="text-xl text-white/70 mt-6 max-w-2xl"
            style={{
              transform: `translateY(${mousePosition.y * 5}px)`
            }}
          >
            Secure, fast, and convenient payments using advanced fingerprint and palm vein recognition technology. No cards, no passwords, just you.
          </p>
        </div>
        
        <div 
          className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
          style={{
            transform: `translateY(${mousePosition.y * 10}px)`
          }}
        >
          <HolographicButton 
            onClick={() => navigate('/register')} 
            className="relative py-6 text-lg z-10"
          >
            Get Started Free
          </HolographicButton>
          
          <Button 
            onClick={() => {}} 
            variant="outline" 
            className="text-lg py-6 text-white border-white/20 bg-white/5 hover:bg-white/10 hover:text-white backdrop-blur-sm relative group overflow-hidden"
            size="lg"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            Watch Demo
          </Button>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all">
            <Fingerprint className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-white/80">Fingerprint ID</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all">
            <Fingerprint className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-white/80">Military-grade Encryption</span>
          </div>
          <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all">
            <Fingerprint className="h-4 w-4 text-green-400" />
            <span className="text-sm text-white/80">Palm Vein Verification</span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse"></div>
        </div>
        <span className="text-white/50 text-sm mt-2">Scroll to explore</span>
      </div>
    </div>
  );
};

export default HeroSection;
