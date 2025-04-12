
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Search, Plus, Stethoscope, FileText, PenSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";

// Sample consultation data
const consultationsData = [
  { 
    id: 1, 
    petName: "Fluffy", 
    ownerName: "Tim Lafaungih", 
    date: "2023-03-15", 
    veterinarian: "Dr. Smith",
    diagnosis: "Seasonal allergies",
    prescription: "Antihistamines"
  },
  { 
    id: 2, 
    petName: "Buddy", 
    ownerName: "Leah", 
    date: "2023-03-16", 
    veterinarian: "Dr. Johnson",
    diagnosis: "Ear infection",
    prescription: "Ear drops, antibiotics"
  },
];

const ConsultationsPage = () => {
  const [selectedConsultation, setSelectedConsultation] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteConsultation = () => {
    toast.success(`Consultation for ${selectedConsultation?.petName} has been deleted`);
    setIsDeleteOpen(false);
  };

  const handleSaveConsultation = () => {
    toast.success("New consultation has been saved");
  };

  const handleUpdateConsultation = () => {
    toast.success(`Consultation for ${selectedConsultation?.petName} has been updated`);
    setIsEditOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Consultations</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-clinic-blue hover:bg-clinic-blue/90 animate-fade-in">
              <Plus className="h-4 w-4 mr-2" />
              New Consultation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>New Consultation</DialogTitle>
              <DialogDescription>
                Record a new consultation for a pet.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="petName" className="text-right">
                  Pet
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select pet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fluffy">Fluffy</SelectItem>
                    <SelectItem value="buddy">Buddy</SelectItem>
                    <SelectItem value="whiskers">Whiskers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="veterinarian" className="text-right">
                  Veterinarian
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select veterinarian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-smith">Dr. Smith</SelectItem>
                    <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
                    <SelectItem value="dr-patel">Dr. Patel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Symptoms</Label>
                <Textarea 
                  placeholder="Describe the symptoms"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Diagnosis</Label>
                <Textarea 
                  placeholder="Enter diagnosis"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Treatment</Label>
                <Textarea 
                  placeholder="Describe the treatment"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Prescription</Label>
                <Textarea 
                  placeholder="Enter prescription details"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Notes</Label>
                <Textarea 
                  placeholder="Additional notes"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">
                Cancel
              </Button>
              <Button className="bg-clinic-blue hover:bg-clinic-blue/90" onClick={handleSaveConsultation}>
                Save Consultation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search consultations..."
              className="pl-8 w-full"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="animate-fade-in">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="clinic-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Pet</th>
                    <th>Owner</th>
                    <th>Date</th>
                    <th>Veterinarian</th>
                    <th>Diagnosis</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {consultationsData.map((consultation) => (
                    <tr key={consultation.id} className="hover:bg-muted/30 transition-colors">
                      <td>{consultation.id}</td>
                      <td>{consultation.petName}</td>
                      <td>{consultation.ownerName}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{consultation.date}</span>
                        </div>
                      </td>
                      <td>{consultation.veterinarian}</td>
                      <td>{consultation.diagnosis}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          {/* View Button */}
                          <Dialog open={isViewOpen && selectedConsultation?.id === consultation.id} onOpenChange={(open) => !open && setIsViewOpen(false)}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 animate-fade-in"
                                onClick={() => {
                                  setSelectedConsultation(consultation);
                                  setIsViewOpen(true);
                                }}
                              >
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Consultation Details</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="font-medium">Pet:</div>
                                  <div className="col-span-2">{consultation.petName}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="font-medium">Owner:</div>
                                  <div className="col-span-2">{consultation.ownerName}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="font-medium">Date:</div>
                                  <div className="col-span-2">{consultation.date}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="font-medium">Veterinarian:</div>
                                  <div className="col-span-2">{consultation.veterinarian}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="font-medium">Diagnosis:</div>
                                  <div className="col-span-2">{consultation.diagnosis}</div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="font-medium">Prescription:</div>
                                  <div className="col-span-2">{consultation.prescription}</div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => setIsViewOpen(false)}>Close</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Edit Button */}
                          <Dialog open={isEditOpen && selectedConsultation?.id === consultation.id} onOpenChange={(open) => !open && setIsEditOpen(false)}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 animate-fade-in [animation-delay:100ms]"
                                onClick={() => {
                                  setSelectedConsultation(consultation);
                                  setIsEditOpen(true);
                                }}
                              >
                                <PenSquare className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Edit Consultation</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Pet</Label>
                                  <Input 
                                    className="col-span-3" 
                                    defaultValue={consultation.petName}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Owner</Label>
                                  <Input 
                                    className="col-span-3" 
                                    defaultValue={consultation.ownerName} 
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Veterinarian</Label>
                                  <Select defaultValue={consultation.veterinarian}>
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                                      <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                                      <SelectItem value="Dr. Patel">Dr. Patel</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Diagnosis</Label>
                                  <Textarea 
                                    className="col-span-3" 
                                    defaultValue={consultation.diagnosis} 
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Prescription</Label>
                                  <Textarea 
                                    className="col-span-3" 
                                    defaultValue={consultation.prescription} 
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleUpdateConsultation}>
                                  Update Consultation
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Delete Button */}
                          <Dialog open={isDeleteOpen && selectedConsultation?.id === consultation.id} onOpenChange={(open) => !open && setIsDeleteOpen(false)}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-clinic-red animate-fade-in [animation-delay:200ms]"
                                onClick={() => {
                                  setSelectedConsultation(consultation);
                                  setIsDeleteOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Consultation</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this consultation? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                                  Cancel
                                </Button>
                                <Button variant="destructive" onClick={handleDeleteConsultation}>
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="animate-fade-in">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="clinic-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Pet</th>
                    <th>Owner</th>
                    <th>Date</th>
                    <th>Veterinarian</th>
                    <th>Diagnosis</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {consultationsData.map((consultation) => (
                    <tr key={consultation.id} className="hover:bg-muted/30 transition-colors">
                      <td>{consultation.id}</td>
                      <td>{consultation.petName}</td>
                      <td>{consultation.ownerName}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{consultation.date}</span>
                        </div>
                      </td>
                      <td>{consultation.veterinarian}</td>
                      <td>{consultation.diagnosis}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 animate-fade-in">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 animate-fade-in [animation-delay:100ms]">
                            <PenSquare className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-clinic-red animate-fade-in [animation-delay:200ms]">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="archived" className="animate-fade-in">
          <div className="flex items-center justify-center h-40 border rounded-md bg-muted/30">
            <p className="text-muted-foreground">No archived consultations found.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConsultationsPage;
