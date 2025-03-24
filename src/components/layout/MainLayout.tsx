
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
  X
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card">
        <div className="flex items-center gap-3 py-6 px-4 border-b border-border">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Fingerprint className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">BioPay Connect</h1>
        </div>
        
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover-lift",
                location.pathname === item.path 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="px-3 py-4 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground 
                      hover:text-destructive transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </Link>
          
          <div className="mt-6 px-3 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              Made with ❤️ by G.S. Dhakad
            </p>
          </div>
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="fixed md:hidden top-0 left-0 right-0 bg-background/80 backdrop-blur-lg z-10 border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5 text-primary" />
            <span className="font-semibold">BioPay Connect</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-lg z-20 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <Fingerprint className="h-5 w-5 text-primary" />
              <span className="font-semibold">BioPay Connect</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <X className="h-5 w-5" />
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
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="px-4 py-4 border-t border-border">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground 
                        hover:text-destructive transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Link>
            
            <div className="mt-6 px-3 py-4 border-t border-border/50 text-center">
              <p className="text-xs text-muted-foreground">
                Made with ❤️ by G.S. Dhakad
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className="flex-1 overflow-auto pt-0 md:pt-0 mt-12 md:mt-0">
        <div className="container max-w-6xl mx-auto p-4 md:p-6 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
