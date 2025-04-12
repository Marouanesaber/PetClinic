
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface OwnerProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  owner: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    petsCount: number;
  } | null;
}

export function OwnerProfileDialog({ open, onOpenChange, owner }: OwnerProfileDialogProps) {
  if (!owner) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Owner Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(owner.name)}`} />
              <AvatarFallback>{owner.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">{owner.name}</h2>
              <p className="text-sm text-muted-foreground">{owner.petsCount} {owner.petsCount === 1 ? 'Pet' : 'Pets'}</p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="grid grid-cols-3 gap-2">
              <div className="font-medium">Email:</div>
              <div className="col-span-2 text-blue-600">
                <a href={`mailto:${owner.email}`}>{owner.email}</a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="font-medium">Phone:</div>
              <div className="col-span-2">
                <a href={`tel:${owner.phone}`}>{owner.phone}</a>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="font-medium">Address:</div>
              <div className="col-span-2">{owner.address}</div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <h3 className="font-medium">Ownership History</h3>
            <p className="text-sm text-muted-foreground">Customer since: January 2023</p>
            <p className="text-sm text-muted-foreground">Last Visit: June 15, 2023</p>
            <p className="text-sm text-muted-foreground">Total Visits: 8</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Edit Profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
