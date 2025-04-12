
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Home, Globe, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Layout = () => {
  const { isAuthenticated, logout, checkAuthStatus } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status when the component mounts
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const isAuth = await checkAuthStatus();
        
        // Only redirect to login if not authenticated
        if (!isAuth) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [checkAuthStatus, navigate]);

  // Don't render anything until we've checked authentication
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  const handleSignOut = () => {
    logout();
    toast.success("You have been signed out", {
      duration: 3000,
    });
    navigate("/logout");
  };

  // Preserve authentication when navigating to main page
  const navigateToMainPage = () => {
    // Don't logout - just navigate, keeping authentication state
    navigate("/", { replace: false });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background theme-transition animate-fade-in">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="px-4 py-2 border-b flex items-center justify-between animate-fade-in [animation-delay:200ms]">
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="gap-2 transition-all hover:bg-gray-100">
                <Home size={16} />
                Dashboard
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 transition-all hover:bg-blue-100 hover:text-blue-700"
              onClick={navigateToMainPage}
            >
              <Globe size={16} />
              Main Page
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 transition-all hover:bg-red-100 hover:text-red-700"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
        <main className="flex-1 overflow-auto p-4 md:p-6 animate-fade-in [animation-delay:300ms]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
