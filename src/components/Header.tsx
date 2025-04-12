
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, userProfile } = useAuth();

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("hidden");
      setSidebarVisible(!sidebarVisible);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("You have been signed out", {
      duration: 3000,
    });
    navigate("/logout");
  };

  const navigateToProfile = () => {
    navigate("/dashboard/profile");
  };

  const navigateToSettings = () => {
    navigate("/dashboard/settings");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  // Sample notifications
  const notifications = [
    { id: 1, title: "New appointment", message: "You have a new appointment scheduled for tomorrow", time: "5 minutes ago", read: false },
    { id: 2, title: "Lab results ready", message: "Lab results for patient #OVHMS0003 are ready", time: "1 hour ago", read: false },
    { id: 3, title: "System maintenance", message: "Scheduled maintenance at 2 AM", time: "3 hours ago", read: true },
  ];

  const markAsRead = (id: number) => {
    toast.success("Notification marked as read");
    // In a real app, you would update the notification state
    // For now we just show a toast
  };

  const markAllAsRead = () => {
    toast.success("All notifications marked as read");
    setNotificationsOpen(false);
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 flex items-center justify-between theme-transition">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-10 w-10 rounded-full"
          title={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 w-full md:w-[260px] rounded-full bg-muted"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative animate-fade-in h-10 w-10 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-clinic-red animate-pulse"></span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Notifications</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-blue-600 hover:text-blue-800"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              </div>
            </div>
            <div className="max-h-[300px] overflow-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b hover:bg-muted/50 transition-colors ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-sm">{notification.title}</h5>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{notification.message}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs text-blue-600 hover:text-blue-800 h-6 px-2"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                </div>
              ))}
            </div>
            <div className="p-2 border-t text-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs w-full text-muted-foreground hover:text-foreground"
                onClick={() => setNotificationsOpen(false)}
              >
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={userProfile?.profilePicture || "https://github.com/shadcn.png"}
                  alt={userProfile?.name || "Admin"}
                />
                <AvatarFallback>
                  {userProfile?.name ? getInitials(userProfile.name) : "AD"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 animate-scale-in" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={navigateToProfile}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={navigateToSettings}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-clinic-red" onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
