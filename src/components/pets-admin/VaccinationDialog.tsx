
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AdminPet, VaccinationRecord } from "./types";

interface VaccinationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentPet: AdminPet | null;
  newVaccination: {
    name: string;
    date: string;
  };
  onNewVaccinationChange: (field: string, value: string) => void;
  onAddVaccination: () => void;
}

export function VaccinationDialog({
  isOpen,
  onOpenChange,
  currentPet,
  newVaccination,
  onNewVaccinationChange,
  onAddVaccination,
}: VaccinationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Vaccination Records for {currentPet?.name}
          </DialogTitle>
          <DialogDescription>
            View and manage vaccination records
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="records">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="records">Existing Records</TabsTrigger>
            <TabsTrigger value="add">Add New Vaccination</TabsTrigger>
          </TabsList>
          <TabsContent value="records" className="pt-4">
            {currentPet?.vaccinationRecords.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No vaccination records found</p>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vaccination</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentPet?.vaccinationRecords.map((record: VaccinationRecord, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
          <TabsContent value="add" className="pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vaccination-name" className="text-right">
                  Vaccination
                </Label>
                <Input
                  id="vaccination-name"
                  placeholder="e.g., Rabies, Distemper"
                  value={newVaccination.name}
                  onChange={(e) => onNewVaccinationChange('name', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vaccination-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="vaccination-date"
                  type="date"
                  value={newVaccination.date}
                  onChange={(e) => onNewVaccinationChange('date', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="flex justify-end pt-4">
                <Button onClick={onAddVaccination}>Add Vaccination</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
