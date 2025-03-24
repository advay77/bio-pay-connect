
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  CreditCard, 
  BarChart3, 
  User, 
  Settings, 
  LogOut, 
  Fingerprint,
  Menu,
  X,
  Shield,
  MessageSquare,
  LifeBuoy
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: CreditCard, label: "Payments", path: "/payments" },
    { icon: BarChart3, label: "Transactions", path: "/transactions" },
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const secondaryNavItems = [
    { icon: Shield, label: "Security", path: "/security" },
    { icon: MessageSquare, label: "Support", path: "/support" },
    { icon: LifeBuoy, label: "Help", path: "/help" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-[#05081F] text-white">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#0A0E2E]">
        <div className="flex items-center gap-3 py-6 px-4 border-b border-white/10">
          <div className="bg-cyan-400/20 p-2 rounded-lg">
            <Fingerprint className="h-6 w-6 text-cyan-400" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            BioPay Connect
          </h1>
        </div>
        
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover-lift",
                location.pathname === item.path 
                  ? "bg-cyan-500/10 text-cyan-400 font-medium" 
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="px-3 py-2 text-xs uppercase text-white/40 font-semibold tracking-wider">
              More Options
            </p>
            {secondaryNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-white/60 hover:text-white hover:bg-white/5"
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        
        <div className="px-3 py-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 
                      hover:text-red-400 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </Link>
          
          <div className="mt-6 px-3 pt-4 border-t border-white/10">
            <p className="text-xs text-white/40 text-center">
              Made with ❤️ by <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">G.S. Dhakad</span>
            </p>
          </div>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="fixed md:hidden top-0 left-0 right-0 bg-[#0A0E2E]/90 backdrop-blur-lg z-10 border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5 text-cyan-400" />
            <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">BioPay Connect</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#0A0E2E]/95 backdrop-blur-lg z-20 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-cyan-400" />
              <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">BioPay Connect</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <X className="h-5 w-5 text-white" />
            </Button>
          </div>
          
          <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  location.pathname === item.path 
                    ? "bg-cyan-500/10 text-cyan-400 font-medium" 
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="px-3 py-2 text-xs uppercase text-white/40 font-semibold tracking-wider">
                More Options
              </p>
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-white/60 hover:text-white hover:bg-white/5"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>
          
          <div className="px-4 py-4 border-t border-white/10">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 
                        hover:text-red-400 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Link>
            
            <div className="mt-6 px-3 py-4 border-t border-white/10 text-center">
              <p className="text-xs text-white/40">
                Made with ❤️ by <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-500">G.S. Dhakad</span>
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className="flex-1 overflow-auto pt-0 md:pt-0 mt-12 md:mt-0 bg-[#05081F]">
        <div className="container max-w-6xl mx-auto p-4 md:p-6 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
