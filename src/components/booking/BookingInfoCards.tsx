
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Phone, Info } from "lucide-react";

export function BookingInfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" /> 
            Operating Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ul className="space-y-1">
            <li className="flex justify-between">
              <span>Monday - Friday:</span>
              <span>9:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday:</span>
              <span>9:00 AM - 4:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday:</span>
              <span>Closed</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Phone className="h-4 w-4 text-blue-600" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ul className="space-y-1">
            <li className="flex justify-between">
              <span>Phone:</span>
              <span>(555) 123-4567</span>
            </li>
            <li className="flex justify-between">
              <span>Email:</span>
              <span>info@petclinic.com</span>
            </li>
            <li className="flex justify-between">
              <span>Emergency:</span>
              <span>(555) 987-6543</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-600" />
            What to Bring
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <ul className="space-y-1">
            <li>• Previous medical records (if available)</li>
            <li>• Current medications</li>
            <li>• Pet's vaccination history</li>
            <li>• List of any questions</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
