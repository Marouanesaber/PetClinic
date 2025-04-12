
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowRight, Dog, Cat, Bird, Rabbit, PawPrint, User } from "lucide-react";

interface PetInformationStepProps {
  formData: {
    petName: string;
    petType: string;
    ownerName: string;
  };
  errors: Record<string, string>;
  handleChange: (field: string, value: string) => void;
  nextStep: () => void;
}

export function PetInformationStep({ formData, errors, handleChange, nextStep }: PetInformationStepProps) {
  return (
    <>
      <CardHeader className="bg-blue-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <PawPrint className="h-5 w-5 text-blue-600" />
          Pet Information
        </CardTitle>
        <CardDescription>
          Tell us about your pet who needs the appointment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="petName" className="font-medium text-gray-700">Pet Name *</Label>
              <div className="relative">
                <PawPrint className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="petName"
                  placeholder="Max"
                  value={formData.petName}
                  onChange={(e) => handleChange("petName", e.target.value)}
                  className={cn("pl-10", errors.petName ? "border-red-500" : "")}
                  required
                />
                {errors.petName && <p className="text-red-500 text-xs mt-1">{errors.petName}</p>}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="petType" className="font-medium text-gray-700">Pet Type *</Label>
              <Select
                value={formData.petType}
                onValueChange={(value) => handleChange("petType", value)}
              >
                <SelectTrigger id="petType" className={cn("w-full", errors.petType ? "border-red-500" : "")}>
                  <SelectValue placeholder="Select pet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">
                    <div className="flex items-center gap-2">
                      <Dog className="h-4 w-4" />
                      <span>Dog</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="cat">
                    <div className="flex items-center gap-2">
                      <Cat className="h-4 w-4" />
                      <span>Cat</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="bird">
                    <div className="flex items-center gap-2">
                      <Bird className="h-4 w-4" />
                      <span>Bird</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="rabbit">
                    <div className="flex items-center gap-2">
                      <Rabbit className="h-4 w-4" />
                      <span>Rabbit</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="other">
                    <div className="flex items-center gap-2">
                      <PawPrint className="h-4 w-4" />
                      <span>Other</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.petType && <p className="text-red-500 text-xs mt-1">{errors.petType}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ownerName" className="font-medium text-gray-700">Owner's Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="ownerName"
                placeholder="John Doe"
                value={formData.ownerName}
                onChange={(e) => handleChange("ownerName", e.target.value)}
                className={cn("pl-10", errors.ownerName ? "border-red-500" : "")}
                required
              />
              {errors.ownerName && <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>}
            </div>
          </div>
        </div>
        
        <div className="pt-4 bg-gray-50 -mx-6 px-6 py-3 mt-6 border-t text-sm text-gray-600">
          Fields marked with * are required
        </div>
      </CardContent>
      <CardFooter className="flex justify-end bg-gray-50 border-t px-6 py-4">
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
