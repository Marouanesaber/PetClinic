import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calendar, Clock, MapPin, BarChart3, DollarSign, Users, PawPrint, Beaker, Syringe } from "lucide-react";
import { AppointmentCalendar } from "@/components/AppointmentCalendar";
import { VaccinationChart } from "@/components/VaccinationChart";
import { PetOwnersTable } from "@/components/PetOwnersTable";
import { AdminPetsTable } from "@/components/AdminPetsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import BackToTopButton from "@/components/BackToTopButton";

const Index = () => {
  const [currentLocation, setCurrentLocation] = useState("Main Clinic");
  const [allLocations, setAllLocations] = useState(["All Locations"]);
  const navigate = useNavigate();

  const quickNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">
            <MapPin className="inline-block h-4 w-4 mr-1" />
            {currentLocation}
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            <MapPin className="inline-block h-4 w-4 mr-1" />
            {allLocations[0]}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="clinic-card bg-clinic-green/10 border-clinic-green/20 animate-slide-in [animation-delay:100ms]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-clinic-green/20">
              <Calendar className="h-5 w-5 text-clinic-green" />
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-muted-foreground">All Visits</div>
            </div>
          </div>
        </div>
        <div className="clinic-card bg-clinic-blue/10 border-clinic-blue/20 animate-slide-in [animation-delay:200ms]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-clinic-blue/20">
              <Clock className="h-5 w-5 text-clinic-blue" />
            </div>
            <div>
              <div className="text-2xl font-bold">5</div>
              <div className="text-xs text-muted-foreground">Appointments</div>
            </div>
          </div>
        </div>
        <div className="clinic-card bg-clinic-red/10 border-clinic-red/20 animate-slide-in [animation-delay:300ms]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-clinic-red/20">
              <BarChart3 className="h-5 w-5 text-clinic-red" />
            </div>
            <div>
              <div className="text-2xl font-bold">28</div>
              <div className="text-xs text-muted-foreground">Pets</div>
            </div>
          </div>
        </div>
        <div className="clinic-card bg-clinic-purple/10 border-clinic-purple/20 animate-slide-in [animation-delay:400ms]">
          <div className="flex items-center gap-3">
            <div className="rounded-full p-2 bg-clinic-purple/20">
              <DollarSign className="h-5 w-5 text-clinic-purple" />
            </div>
            <div>
              <div className="text-2xl font-bold">GHS 1,240.00</div>
              <div className="text-xs text-muted-foreground">Total Sales Today</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="transition-all hover:shadow-md cursor-pointer hover:scale-105" 
                onClick={() => quickNavigate('/dashboard/appointments')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">Schedule and manage appointments</div>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-md cursor-pointer hover:scale-105" 
                onClick={() => quickNavigate('/dashboard/vaccinations')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vaccinations</CardTitle>
              <Syringe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">Manage pet vaccination records</div>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-md cursor-pointer hover:scale-105" 
                onClick={() => quickNavigate('/dashboard/laboratory')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Laboratory</CardTitle>
              <Beaker className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">Track laboratory tests and results</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Calendar */}
      <div>
        <h2 className="text-xl font-bold mb-4">Appointments Calendar</h2>
        <AppointmentCalendar />
      </div>

      {/* Charts */}
      <div>
        <h2 className="text-xl font-bold mb-4">Vaccination Graph</h2>
        <VaccinationChart />
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-clinic-blue/10">
                <PawPrint className="h-5 w-5 text-clinic-blue" />
              </div>
              <div>
                <div className="text-sm font-medium">New pet registered</div>
                <div className="text-xs text-muted-foreground">Max (Dog) - 30 minutes ago</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-clinic-green/10">
                <Calendar className="h-5 w-5 text-clinic-green" />
              </div>
              <div>
                <div className="text-sm font-medium">Appointment scheduled</div>
                <div className="text-xs text-muted-foreground">Luna (Cat) - 1 hour ago</div>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-clinic-purple/10">
                <Users className="h-5 w-5 text-clinic-purple" />
              </div>
              <div>
                <div className="text-sm font-medium">New owner registered</div>
                <div className="text-xs text-muted-foreground">John Doe - 2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Pet Owners & Their Registered Pets</h2>
          <PetOwnersTable />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Pets Registered by Admin</h2>
          <AdminPetsTable />
        </div>
      </div>

      <BackToTopButton />
    </div>
  );
};

export default Index;
