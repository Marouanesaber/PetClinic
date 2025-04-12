
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Technician } from "./TechnicianData";

interface TechnicianCardProps {
  technician: Technician;
  index: number;
}

export function TechnicianCard({ technician, index }: TechnicianCardProps) {
  const navigate = useNavigate();

  const handleBookAppointment = (doctorName: string) => {
    toast.success(`Booking appointment with ${doctorName}`);
    navigate("/book-appointment");
  };

  const handleContactDoctor = (email: string) => {
    window.location.href = `mailto:${email}`;
    toast.success("Opening email client");
  };

  const handleCallDoctor = (phone: string) => {
    window.location.href = `tel:${phone}`;
    toast.success("Opening phone dialer");
  };

  const handleLinkedIn = (username: string) => {
    window.open(`https://linkedin.com/in/${username}`, "_blank");
    toast.success("Opening LinkedIn profile");
  };

  return (
    <Card 
      className="overflow-hidden transition-transform hover:shadow-lg animate-fade-in" 
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="md:flex">
        <div className="md:w-1/3 h-64 md:h-auto relative">
          <img 
            src={technician.image} 
            alt={technician.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{technician.name}</CardTitle>
                <CardDescription>{technician.role}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-gray-700">Speciality:</span> {technician.speciality}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-gray-700">Experience:</span> {technician.experience}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-semibold text-gray-700">Education:</span> {technician.education}
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-3">
              {technician.bio}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-blue-600" />
              <a 
                href={`mailto:${technician.email}`} 
                className="text-blue-600 hover:underline" 
                onClick={(e) => {
                  e.preventDefault();
                  handleContactDoctor(technician.email);
                }}
              >
                {technician.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-blue-600" />
              <a 
                href={`tel:${technician.phone}`} 
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleCallDoctor(technician.phone);
                }}
              >
                {technician.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>Available: {technician.availability}</span>
            </div>
            <div className="flex mt-3 space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="gap-1"
                onClick={() => handleLinkedIn(technician.linkedin)}
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-600 gap-1"
                onClick={() => handleBookAppointment(technician.name)}
              >
                Book Appointment
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
