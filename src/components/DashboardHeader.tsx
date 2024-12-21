import { Car, Bell, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  userName?: string;
  notificationCount?: number;
}

export const DashboardHeader = ({ 
  userName = "John Doe", 
  notificationCount = 3 
}: DashboardHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '#', active: true },
    { label: 'Inventory', href: '#', active: false },
    { label: 'Sales', href: '#', active: false },
    { label: 'Customers', href: '#', active: false },
  ];

  return (
    <header className="automotive-header sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">AutoDealer Pro</h1>
              <p className="text-sm text-muted-foreground">Management Dashboard</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link ${item.active ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center font-medium">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </div>

            {/* User Profile */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">Sales Manager</p>
              </div>
              <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`nav-link ${item.active ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* Mobile User Profile */}
            <div className="sm:hidden mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{userName}</p>
                  <p className="text-xs text-muted-foreground">Sales Manager</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};