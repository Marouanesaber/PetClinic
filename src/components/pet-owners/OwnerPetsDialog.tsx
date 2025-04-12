
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { PawPrint } from "lucide-react";

interface OwnerPetsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  owner: {
    id: number;
    name: string;
  } | null;
  petsByOwner: Record<number, Array<{
    id: number;
    name: string;
    species: string;
    breed: string;
    age: number;
  }>>;
}

export function OwnerPetsDialog({ open, onOpenChange, owner, petsByOwner }: OwnerPetsDialogProps) {
  if (!owner) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>{owner.name}'s Pets</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid gap-4">
            {petsByOwner[owner.id]?.map((pet) => (
              <Card key={pet.id} className="overflow-hidden animate-fade-in">
                <div className="flex items-start p-4">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <PawPrint className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{pet.name}</CardTitle>
                    <CardDescription>
                      {pet.species} • {pet.breed} • {pet.age} years old
                    </CardDescription>
                    <div className="mt-4 flex items-center text-sm text-muted-foreground">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      Healthy
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Schedule Visit</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Register New Pet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
