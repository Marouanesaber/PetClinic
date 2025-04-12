
import React, { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function AppointmentCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    petName: "",
    ownerName: "",
    appointmentType: "checkup",
    time: "10:00"
  });
  
  // Sample appointments data with state management
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: "Fluffy - Checkup",
      date: new Date(2023, 2, 15, 10, 0),
      duration: 30,
      type: "checkup"
    }
  ]);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const handleAddAppointment = () => {
    if (!newAppointment.petName || !newAppointment.ownerName) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Create the appointment
    const [hours, minutes] = newAppointment.time.split(':').map(Number);
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hours, minutes);
    
    const newAppointmentObj = {
      id: appointments.length + 1,
      title: `${newAppointment.petName} - ${formatAppointmentType(newAppointment.appointmentType)}`,
      date: appointmentDate,
      duration: 30,
      type: newAppointment.appointmentType
    };
    
    setAppointments([...appointments, newAppointmentObj]);
    setIsDialogOpen(false);
    toast.success("Appointment scheduled successfully!");
    
    // Reset form
    setNewAppointment({
      petName: "",
      ownerName: "",
      appointmentType: "checkup",
      time: "10:00"
    });
  };

  const formatAppointmentType = (type: string) => {
    const types: Record<string, string> = {
      "checkup": "Checkup",
      "vaccination": "Vaccination",
      "surgery": "Surgery",
      "dental": "Dental Cleaning",
      "grooming": "Grooming"
    };
    return types[type] || type;
  };

  const getAppointmentColor = (type: string) => {
    const colors: Record<string, string> = {
      "checkup": "bg-blue-100 text-blue-800 border-blue-200",
      "vaccination": "bg-green-100 text-green-800 border-green-200",
      "surgery": "bg-red-100 text-red-800 border-red-200",
      "dental": "bg-purple-100 text-purple-800 border-purple-200",
      "grooming": "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <Button variant="outline" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <Button 
          size="sm" 
          className="bg-clinic-blue hover:bg-clinic-blue/90"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          New Appointment
        </Button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center py-2 font-semibold text-sm">
          {daysOfWeek[i]}
        </div>
      );
    }

    return <div className="grid grid-cols-7">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const todaysAppointments = appointments.filter(appt => 
          isSameDay(appt.date, day)
        );
        
        days.push(
          <div
            key={day.toString()}
            className={`relative border p-1 min-h-[80px] ${
              !isSameMonth(day, monthStart)
                ? "bg-gray-50 text-gray-400"
                : isSameDay(day, selectedDate)
                ? "bg-blue-50 dark:bg-blue-900/20"
                : ""
            }`}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="text-right">{formattedDate}</div>
            {todaysAppointments.map(appt => (
              <div 
                key={appt.id} 
                className={`mt-1 text-xs p-1 rounded border truncate cursor-pointer ${getAppointmentColor(appt.type)}`}
                title={appt.title}
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info(`Appointment: ${appt.title} at ${format(appt.date, 'h:mm a')}`);
                }}
              >
                {format(appt.date, 'h:mm a')} - {appt.title}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="border rounded-md overflow-hidden">{rows}</div>;
  };

  return (
    <Card className="clinic-card space-y-4 animate-fade-in">
      <CardHeader className="pb-0">
        {renderHeader()}
      </CardHeader>
      <CardContent className="p-0">
        {renderDays()}
        {renderCells()}
      </CardContent>

      {/* New Appointment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New Appointment</DialogTitle>
            <DialogDescription>
              Add details for the new appointment on {format(selectedDate, "PPPP")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="petName" className="text-right">
                Pet Name
              </Label>
              <Input
                id="petName"
                placeholder="Fluffy"
                className="col-span-3"
                value={newAppointment.petName}
                onChange={(e) => setNewAppointment({...newAppointment, petName: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ownerName" className="text-right">
                Owner Name
              </Label>
              <Input
                id="ownerName"
                placeholder="John Doe"
                className="col-span-3"
                value={newAppointment.ownerName}
                onChange={(e) => setNewAppointment({...newAppointment, ownerName: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="appointmentType" className="text-right">
                Type
              </Label>
              <Select
                value={newAppointment.appointmentType}
                onValueChange={(value) => setNewAppointment({...newAppointment, appointmentType: value})}
              >
                <SelectTrigger id="appointmentType" className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="checkup">Checkup</SelectItem>
                  <SelectItem value="vaccination">Vaccination</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="dental">Dental Cleaning</SelectItem>
                  <SelectItem value="grooming">Grooming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                className="col-span-3"
                value={newAppointment.time}
                onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAppointment}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
