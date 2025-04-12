
import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  Stethoscope,
  Syringe,
  Beaker,
  Scissors,
  PawPrint,
  Users,
  Settings,
  Globe,
  User,
} from "lucide-react";
import { useAuth } from "./AuthProvider";

export function Sidebar() {
  const { userProfile } = useAuth();
  
  return (
    <aside className="sidebar w-64 h-screen flex flex-col bg-sidebar dark:bg-sidebar backdrop-blur-lg border-r border-border overflow-y-auto shrink-0 theme-transition animate-slide-in">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <PawPrint className="h-6 w-6 text-clinic-blue" />
          <span className="font-bold text-xl">PetClinic</span>
        </div>
      </div>
      <nav className="flex-1 py-4">
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Dashboard
          </h3>
          <div className="space-y-1">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            >
              <Globe className="h-5 w-5" />
              <span>Main Page</span>
            </NavLink>
          </div>
        </div>
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Services
          </h3>
          <div className="space-y-1">
            <NavLink
              to="/dashboard/appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <Calendar className="h-5 w-5" />
              <span>Appointments</span>
            </NavLink>
            <NavLink
              to="/dashboard/consultations"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <Stethoscope className="h-5 w-5" />
              <span>Consultations</span>
            </NavLink>
            <NavLink
              to="/dashboard/vaccinations"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <Syringe className="h-5 w-5" />
              <span>Vaccinations</span>
            </NavLink>
            <NavLink
              to="/dashboard/laboratory"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <Beaker className="h-5 w-5" />
              <span>Laboratory</span>
            </NavLink>
            <NavLink
              to="/dashboard/surgery"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <Scissors className="h-5 w-5" />
              <span>Surgery</span>
            </NavLink>
          </div>
        </div>
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Management
          </h3>
          <div className="space-y-1">
            <NavLink
              to="/dashboard/pets"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <PawPrint className="h-5 w-5" />
              <span>Pets</span>
            </NavLink>
            <NavLink
              to="/dashboard/owners"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <Users className="h-5 w-5" />
              <span>Owners</span>
            </NavLink>
          </div>
        </div>
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            User
          </h3>
          <div className="space-y-1">
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </NavLink>
          </div>
        </div>
      </nav>
      <div className="p-4 border-t border-border">
        <div className="rounded-lg bg-sidebar-accent p-3">
          <p className="text-xs text-muted-foreground">
            Logged in as <span className="font-semibold">{userProfile?.name || "Admin"}</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
