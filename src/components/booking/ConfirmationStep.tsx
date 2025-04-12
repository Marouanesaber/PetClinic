
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, PawPrint, User, Calendar, FileText, MapPin, Info, Dog, Cat, Bird, Rabbit } from "lucide-react";

interface ConfirmationStepProps {
  formData: {
    petName: string;
    petType: string;
    ownerName: string;
    email: string;
    appointmentType: string;
    symptoms: string;
    preferredTime: string;
  };
  date: Date | undefined;
}

export function ConfirmationStep({ formData, date }: ConfirmationStepProps) {
  const getPetTypeIcon = () => {
    switch (formData.petType) {
      case "dog":
        return <Dog className="h-10 w-10 text-blue-600" />;
      case "cat":
        return <Cat className="h-10 w-10 text-blue-600" />;
      case "bird":
        return <Bird className="h-10 w-10 text-blue-600" />;
      case "rabbit":
        return <Rabbit className="h-10 w-10 text-blue-600" />;
      default:
        return <PawPrint className="h-10 w-10 text-blue-600" />;
    }
  };

  return (
    <>
      <CardHeader className="text-center bg-green-50 border-b">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <CardTitle className="text-2xl text-green-600">Appointment Booked!</CardTitle>
        <CardDescription>
          Your appointment has been scheduled successfully
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="flex items-center justify-center">
          <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center">
            {getPetTypeIcon()}
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 space-y-4">
          <h3 className="font-bold text-lg text-blue-700 border-b border-blue-200 pb-2">Appointment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <PawPrint className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Pet</p>
                <p className="text-sm">{formData.petName} ({formData.petType})</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Owner</p>
                <p className="text-sm">{formData.ownerName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Date & Time</p>
                <p className="text-sm">{date ? format(date, "PPP") : ""} at {formData.preferredTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <p className="text-sm font-medium">Service</p>
                <p className="text-sm">{formData.appointmentType}</p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 pt-2 border-t border-blue-200 mt-2">
            <MapPin className="h-5 w-5 text-blue-600 mt-1" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm">PetClinic Main Office, 123 Pet Care Street</p>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-6">
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start gap-2">
            <Info className="h-5 w-5 text-yellow-600 mt-1" />
            <div>
              <p className="font-medium text-yellow-700">What's Next?</p>
              <p className="text-sm text-yellow-600">
                A confirmation email has been sent to {formData.email}. If you need to make any changes to your appointment, please contact our office at least 24 hours in advance.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center bg-gray-50 border-t px-6 py-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700" 
          onClick={() => window.location.href = "/"}
        >
          Return to Home
        </Button>
      </CardFooter>
    </>
  );
}
