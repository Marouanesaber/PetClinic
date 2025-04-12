import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PawPrint, Menu, X, ShoppingCart, UserCircle2, Home, ClipboardList, Users, Phone, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { apiRequest } from "@/utils/api";
import { onEvent } from "@/utils/eventBus";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCartCount = async () => {
    if (!isAuthenticated) {
      setCartItemCount(0);
      return;
    }
    
    try {
      const cartItems = await apiRequest('/shop/cart');
      setCartItemCount(cartItems.length || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Keep the current count on error
    }
  };

  useEffect(() => {
    fetchCartCount();
    
    const unsubscribe = onEvent('cart-updated', () => {
      fetchCartCount();
    });
    
    return unsubscribe;
  }, [isAuthenticated]);

  return (
    <nav className="py-4 bg-white/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2"
            aria-label="PetClinic Home"
          >
            <PawPrint className="h-6 w-6 text-[#87CEEB]" />
            <span className="font-bold text-xl md:text-2xl">PetClinic</span>
          </Link>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
              <ClipboardList className="h-4 w-4" />
              Services
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
              <ShoppingCart className="h-4 w-4" />
              Shop
            </Link>
            <Link to="/technicians" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
              <Users className="h-4 w-4" />
              Technicians
            </Link>
            <Link to="/contact-us" className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1">
              <Phone className="h-4 w-4" />
              Contact
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="flex items-center gap-1">
                    <UserCircle2 className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/logout">
                  <Button variant="ghost" className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/"
                className="px-2 py-1 text-gray-700 hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                to="/services"
                className="px-2 py-1 text-gray-700 hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ClipboardList className="h-4 w-4" />
                Services
              </Link>
              <Link
                to="/shop"
                className="px-2 py-1 text-gray-700 hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-4 w-4" />
                Shop
              </Link>
              <Link
                to="/technicians"
                className="px-2 py-1 text-gray-700 hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users className="h-4 w-4" />
                Technicians
              </Link>
              <Link
                to="/contact-us"
                className="px-2 py-1 text-gray-700 hover:text-primary transition-colors flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Phone className="h-4 w-4" />
                Contact Us
              </Link>
              <div className="pt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <Link to="/dashboard" className="w-full">
                      <Button className="w-full flex items-center gap-2" variant="ghost" onClick={() => setIsMenuOpen(false)}>
                        <UserCircle2 className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/cart" className="w-full">
                      <Button className="w-full flex items-center gap-2" variant="outline" onClick={() => setIsMenuOpen(false)}>
                        <ShoppingCart className="h-4 w-4" />
                        Cart ({cartItemCount})
                      </Button>
                    </Link>
                    <Link to="/logout" className="w-full">
                      <Button className="w-full flex items-center gap-2 bg-red-50 text-red-500 hover:bg-red-100" variant="ghost" onClick={() => setIsMenuOpen(false)}>
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Link to="/login" className="flex-1">
                      <Button className="w-full" variant="ghost" onClick={() => setIsMenuOpen(false)}>Sign In</Button>
                    </Link>
                    <Link to="/register" className="flex-1">
                      <Button className="w-full" onClick={() => setIsMenuOpen(false)}>Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
