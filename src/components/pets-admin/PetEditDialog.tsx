
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AdminPet } from "./types";

interface PetEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentPet: AdminPet | null;
  editForm: {
    name: string;
    chipId: string;
  };
  onEditFormChange: (field: string, value: string) => void;
  onSave: () => void;
}

export function PetEditDialog({
  isOpen,
  onOpenChange,
  currentPet,
  editForm,
  onEditFormChange,
  onSave,
}: PetEditDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Pet Information</DialogTitle>
          <DialogDescription>
            Update the details for this pet
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Pet Name
            </Label>
            <Input
              id="edit-name"
              value={editForm.name}
              onChange={(e) => onEditFormChange('name', e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-chipId" className="text-right">
              Chip ID
            </Label>
            <Input
              id="edit-chipId"
              value={editForm.chipId}
              onChange={(e) => onEditFormChange('chipId', e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
