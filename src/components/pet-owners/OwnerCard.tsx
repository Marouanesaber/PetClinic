
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, PawPrint } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface OwnerCardProps {
  owner: {
    id: number;
    name: string;
    address: string;
    phone: string; // Changed from 'contact' to 'phone' to match the data structure
    email: string;
    petsCount: number;
  };
  onViewProfile: () => void;
  onViewPets: () => void;
}

export function OwnerCard({ owner, onViewProfile, onViewPets }: OwnerCardProps) {
  const initials = owner.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(owner.name)}`} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{owner.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <PawPrint className="h-3 w-3" />
              {owner.petsCount} {owner.petsCount === 1 ? 'Pet' : 'Pets'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${owner.email}`} className="text-blue-600 hover:underline">{owner.email}</a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href={`tel:${owner.phone}`} className="hover:underline">{owner.phone}</a>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <span className="text-xs">{owner.address}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full hover:bg-blue-50 hover:text-blue-600 transition-all animate-fade-in"
          onClick={onViewProfile}
        >
          View Profile
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="w-full hover:bg-blue-50 hover:text-blue-600 transition-all animate-fade-in [animation-delay:100ms]"
          onClick={onViewPets}
        >
          View Pets
        </Button>
      </CardFooter>
    </Card>
  );
}
