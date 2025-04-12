
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar as CalendarIcon, Clock, FileText } from "lucide-react";

interface AppointmentDetailsStepProps {
  formData: {
    appointmentType: string;
    preferredTime: string;
    symptoms: string;
  };
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  errors: Record<string, string>;
  handleChange: (field: string, value: string) => void;
  prevStep: () => void;
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}

export function AppointmentDetailsStep({ 
  formData, 
  date, 
  setDate, 
  errors, 
  handleChange, 
  prevStep,
  isSubmitting,
  handleSubmit
}: AppointmentDetailsStepProps) {
  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="bg-blue-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-600" />
          Appointment Details
        </CardTitle>
        <CardDescription>
          Choose appointment type, date and time
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="appointmentType" className="font-medium text-gray-700">Appointment Type *</Label>
            <Select
              value={formData.appointmentType}
              onValueChange={(value) => handleChange("appointmentType", value)}
            >
              <SelectTrigger id="appointmentType" className={cn(errors.appointmentType ? "border-red-500" : "")}>
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checkup">Regular Checkup</SelectItem>
                <SelectItem value="vaccination">Vaccination</SelectItem>
                <SelectItem value="illness">Illness/Injury</SelectItem>
                <SelectItem value="dental">Dental Care</SelectItem>
                <SelectItem value="surgery">Surgery</SelectItem>
                <SelectItem value="grooming">Grooming</SelectItem>
              </SelectContent>
            </Select>
            {errors.appointmentType && <p className="text-red-500 text-xs mt-1">{errors.appointmentType}</p>}
          </div>
          
          <div className="space-y-2">
            <Label className="font-medium text-gray-700">Preferred Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                    errors.date ? "border-red-500" : ""
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0;
                  }}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="preferredTime" className="font-medium text-gray-700">Preferred Time *</Label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Select
              value={formData.preferredTime}
              onValueChange={(value) => handleChange("preferredTime", value)}
            >
              <SelectTrigger id="preferredTime" className={cn("w-full pl-10", errors.preferredTime ? "border-red-500" : "")}>
                <SelectValue placeholder="Select preferred time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="09:00">9:00 AM</SelectItem>
                <SelectItem value="10:00">10:00 AM</SelectItem>
                <SelectItem value="11:00">11:00 AM</SelectItem>
                <SelectItem value="12:00">12:00 PM</SelectItem>
                <SelectItem value="14:00">2:00 PM</SelectItem>
                <SelectItem value="15:00">3:00 PM</SelectItem>
                <SelectItem value="16:00">4:00 PM</SelectItem>
                <SelectItem value="17:00">5:00 PM</SelectItem>
              </SelectContent>
            </Select>
            {errors.preferredTime && <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="symptoms" className="font-medium text-gray-700">Reason for Visit / Symptoms</Label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Textarea
              id="symptoms"
              placeholder="Please describe the reason for your visit or any symptoms your pet is experiencing..."
              value={formData.symptoms}
              onChange={(e) => handleChange("symptoms", e.target.value)}
              className="min-h-[120px] pl-10"
            />
          </div>
        </div>
        
        <div className="pt-4 bg-gray-50 -mx-6 px-6 py-3 mt-6 border-t text-sm text-gray-600">
          Fields marked with * are required
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 border-t px-6 py-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={prevStep}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous Step
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? "Submitting..." : "Book Appointment"}
        </Button>
      </CardFooter>
    </form>
  );
}
