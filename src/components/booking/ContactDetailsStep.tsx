
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Info, Mail, Phone } from "lucide-react";

interface ContactDetailsStepProps {
  formData: {
    email: string;
    phone: string;
  };
  errors: Record<string, string>;
  handleChange: (field: string, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function ContactDetailsStep({ formData, errors, handleChange, nextStep, prevStep }: ContactDetailsStepProps) {
  return (
    <>
      <CardHeader className="bg-blue-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          Contact Details
        </CardTitle>
        <CardDescription>
          Please provide your contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium text-gray-700">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={cn("pl-10", errors.email ? "border-red-500" : "")}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium text-gray-700">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={cn("pl-10", errors.phone ? "border-red-500" : "")}
                  required
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 bg-blue-50 -mx-6 px-6 py-3 mt-6 rounded-md text-blue-600 flex items-start space-x-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium">Privacy Note</p>
            <p className="text-sm text-blue-700">Your contact information will only be used to confirm your appointment and provide important updates.</p>
          </div>
        </div>
        
        <div className="pt-4 bg-gray-50 -mx-6 px-6 py-3 mt-6 border-t text-sm text-gray-600">
          Fields marked with * are required
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 border-t px-6 py-4">
        <Button 
          variant="outline" 
          onClick={prevStep}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous Step
        </Button>
        <Button 
          onClick={nextStep}
          className="bg-blue-600 hover:bg-blue-700 gap-2"
        >
          Next Step
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  );
}
