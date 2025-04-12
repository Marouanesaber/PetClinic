
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AdminPet, PetRecord } from "./types";

interface PetRecordsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentPet: AdminPet | null;
  newRecord: {
    type: string;
    date: string;
    notes: string;
  };
  onNewRecordChange: (field: string, value: string) => void;
  onAddRecord: () => void;
}

export function PetRecordsDialog({
  isOpen,
  onOpenChange,
  currentPet,
  newRecord,
  onNewRecordChange,
  onAddRecord,
}: PetRecordsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Medical Records for {currentPet?.name}
          </DialogTitle>
          <DialogDescription>
            View and manage pet medical records
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="records">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="records">Existing Records</TabsTrigger>
            <TabsTrigger value="add">Add New Record</TabsTrigger>
          </TabsList>
          <TabsContent value="records" className="pt-4">
            {currentPet?.petRecords.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No medical records found</p>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentPet?.petRecords.map((record: PetRecord, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.notes}</td>
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
                <Label htmlFor="record-type" className="text-right">
                  Record Type
                </Label>
                <Input
                  id="record-type"
                  placeholder="e.g., Checkup, Surgery"
                  value={newRecord.type}
                  onChange={(e) => onNewRecordChange('type', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="record-date" className="text-right">
                  Date
                </Label>
                <Input
                  id="record-date"
                  type="date"
                  value={newRecord.date}
                  onChange={(e) => onNewRecordChange('date', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="record-notes" className="text-right">
                  Notes
                </Label>
                <Input
                  id="record-notes"
                  placeholder="Any additional details"
                  value={newRecord.notes}
                  onChange={(e) => onNewRecordChange('notes', e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="flex justify-end pt-4">
                <Button onClick={onAddRecord}>Add Record</Button>
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
