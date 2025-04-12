import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { vaccinationsApi } from "@/utils/api";
import { useAuth } from "@/components/AuthProvider";
import { useLanguage } from "@/components/LanguageSwitcher";

interface Vaccination {
  id: number;
  petId: string;
  vaccineTypeId: string;
  date: string;
  administeredBy: string;
  temp: string;
  dose?: string;
  batchNumber?: string;
  expiryDate?: string;
  notes?: string;
}

const VaccinationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState("25");
  const [currentLocation, setCurrentLocation] = useState("");
  const [vaccRecords, setVaccRecords] = useState<Vaccination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editVaccination, setEditVaccination] = useState<Vaccination | null>(null);
  const [viewVaccination, setViewVaccination] = useState<Vaccination | null>(null);
  const { token } = useAuth();
  const { t } = useLanguage();
  
  const [newVaccination, setNewVaccination] = useState({
    petId: "",
    vaccineTypeId: "",
    date: "",
    administeredBy: "Admin Admin",
    temp: "",
    dose: "",
    batchNumber: "",
    expiryDate: "",
    notes: ""
  });

  useEffect(() => {
    // Load vaccination records from API
    const loadVaccinations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Fetching vaccinations...");
        const data = await vaccinationsApi.getAll();
        console.log("Received vaccinations:", data);
        setVaccRecords(data);
      } catch (error) {
        console.error("Error loading vaccinations:", error);
        setError("Failed to load vaccination records. Please try again later.");
        toast.error("Failed to load vaccination records");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadVaccinations();
  }, [token]);

  // Filter vaccinations based on search term
  const filteredVaccinations = vaccRecords.filter(vacc => 
    vacc.petId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vacc.vaccineTypeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVaccination = async () => {
    if (!newVaccination.petId || !newVaccination.date || !newVaccination.vaccineTypeId) {
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      const response = await vaccinationsApi.create(newVaccination);
      setVaccRecords([response, ...vaccRecords]);
      setNewVaccination({
        petId: "",
        vaccineTypeId: "",
        date: "",
        administeredBy: "Admin Admin",
        temp: "",
        dose: "",
        batchNumber: "",
        expiryDate: "",
        notes: ""
      });
      toast.success("Vaccination record added successfully!");
    } catch (error) {
      console.error("Error adding vaccination:", error);
      toast.error("Failed to add vaccination record");
    }
  };

  const handleUpdateVaccination = async () => {
    if (!editVaccination) return;
    
    try {
      const updatedRecord = await vaccinationsApi.update(editVaccination.id, editVaccination);
      setVaccRecords(vaccRecords.map(v => 
        v.id === updatedRecord.id ? updatedRecord : v
      ));
      setEditVaccination(null);
      toast.success("Vaccination record updated successfully!");
    } catch (error) {
      console.error("Error updating vaccination:", error);
      toast.error("Failed to update vaccination record");
    }
  };

  const handleDeleteVaccination = async (id: number) => {
    try {
      await vaccinationsApi.delete(id);
      setVaccRecords(vaccRecords.filter(v => v.id !== id));
      toast.success("Vaccination record deleted successfully!");
    } catch (error) {
      console.error("Error deleting vaccination:", error);
      toast.error("Failed to delete vaccination record");
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">View Vaccination Records</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span className="mx-2">›</span>
          <span>Vaccinations</span>
        </div>
      </div>

      {/* Add New Vaccination Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600 transition-all flex items-center gap-2">
            <Plus size={16} />
            Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Vaccination Record</DialogTitle>
            <DialogDescription>
              Enter the details for the new vaccination record below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="petId" className="text-right">Pet ID</label>
              <Input 
                id="petId" 
                value={newVaccination.petId} 
                onChange={(e) => setNewVaccination({...newVaccination, petId: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="date" className="text-right">Date</label>
              <Input 
                id="date" 
                type="date" 
                value={newVaccination.date} 
                onChange={(e) => setNewVaccination({...newVaccination, date: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="vaccineTypeId" className="text-right">Vaccine Type</label>
              <Input 
                id="vaccineTypeId" 
                value={newVaccination.vaccineTypeId} 
                onChange={(e) => setNewVaccination({...newVaccination, vaccineTypeId: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="administeredBy" className="text-right">Vaccinated By</label>
              <Input 
                id="administeredBy" 
                value={newVaccination.administeredBy} 
                onChange={(e) => setNewVaccination({...newVaccination, administeredBy: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="temp" className="text-right">Temp</label>
              <Input 
                id="temp" 
                value={newVaccination.temp} 
                onChange={(e) => setNewVaccination({...newVaccination, temp: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="dose" className="text-right">Dose</label>
              <Input 
                id="dose" 
                value={newVaccination.dose} 
                onChange={(e) => setNewVaccination({...newVaccination, dose: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="batchNumber" className="text-right">Batch #</label>
              <Input 
                id="batchNumber" 
                value={newVaccination.batchNumber} 
                onChange={(e) => setNewVaccination({...newVaccination, batchNumber: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="expiryDate" className="text-right">Expiry Date</label>
              <Input 
                id="expiryDate" 
                type="date"
                value={newVaccination.expiryDate} 
                onChange={(e) => setNewVaccination({...newVaccination, expiryDate: e.target.value})}
                className="col-span-3" 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="notes" className="text-right">Notes</label>
              <Input 
                id="notes" 
                value={newVaccination.notes} 
                onChange={(e) => setNewVaccination({...newVaccination, notes: e.target.value})}
                className="col-span-3" 
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="button" onClick={handleAddVaccination}>Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between mt-4">
        <div className="w-full md:w-64">
          <label htmlFor="location" className="block text-sm text-muted-foreground mb-1">
            Sort by Current Location
          </label>
          <Select value={currentLocation} onValueChange={setCurrentLocation}>
            <SelectTrigger id="location" className="w-full">
              <SelectValue placeholder="Current Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="location1">Main Clinic</SelectItem>
              <SelectItem value="location2">Downtown Branch</SelectItem>
              <SelectItem value="location3">Northside Office</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
            <SelectTrigger className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">entries</span>
        </div>

        <div className="w-full md:w-64">
          <label htmlFor="search" className="block text-sm text-muted-foreground mb-1">
            Search:
          </label>
          <Input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full"
          />
        </div>
      </div>

      {/* Vaccinations Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Vaccination Records</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-4">{error}</div>
          ) : filteredVaccinations.length === 0 ? (
            <div className="text-center py-4">No vaccination records found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Pet ID</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Vaccine Type</th>
                    <th className="text-left py-3 px-4">Administered By</th>
                    <th className="text-left py-3 px-4">Temp</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVaccinations.map((vacc) => (
                    <tr key={vacc.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{vacc.petId}</td>
                      <td className="py-3 px-4">{vacc.date}</td>
                      <td className="py-3 px-4">{vacc.vaccineTypeId}</td>
                      <td className="py-3 px-4">{vacc.administeredBy}</td>
                      <td className="py-3 px-4">{vacc.temp}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* View Vaccination Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => setViewVaccination(vacc)}
                              >
                                <Eye size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Vaccination Details</DialogTitle>
                              </DialogHeader>
                              {viewVaccination && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-3 items-center gap-4">
                                    <span className="font-medium">Pet ID:</span>
                                    <span className="col-span-2">{viewVaccination.petId}</span>
                                  </div>
                                  <div className="grid grid-cols-3 items-center gap-4">
                                    <span className="font-medium">Date:</span>
                                    <span className="col-span-2">{viewVaccination.date}</span>
                                  </div>
                                  <div className="grid grid-cols-3 items-center gap-4">
                                    <span className="font-medium">Vaccine Type:</span>
                                    <span className="col-span-2">{viewVaccination.vaccineTypeId}</span>
                                  </div>
                                  <div className="grid grid-cols-3 items-center gap-4">
                                    <span className="font-medium">Administered By:</span>
                                    <span className="col-span-2">{viewVaccination.administeredBy}</span>
                                  </div>
                                  <div className="grid grid-cols-3 items-center gap-4">
                                    <span className="font-medium">Temperature:</span>
                                    <span className="col-span-2">{viewVaccination.temp}</span>
                                  </div>
                                  <div className="grid grid-cols-3 items-center gap-4">
                                    <span className="font-medium">Dose:</span>
                                    <span className="col-span-2">{viewVaccination.dose || 'N/A'}</span>
                                  </div>
                                  <div className="grid grid-cols-3 items-center gap-4">
                                    <span className="font-medium">Batch Number:</span>
                                    <span className="col-span-2">{viewVaccination.batchNumber || 'N/A'}</span>
                                  </div>
                                  <div className="grid grid-cols-3 items-center gap-4">
                                    <span className="font-medium">Expiry Date:</span>
                                    <span className="col-span-2">{viewVaccination.expiryDate || 'N/A'}</span>
                                  </div>
                                  <div className="grid grid-cols-3 items-center gap-4">
                                    <span className="font-medium">Notes:</span>
                                    <span className="col-span-2">{viewVaccination.notes || 'N/A'}</span>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button">Close</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Edit Vaccination Dialog */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => setEditVaccination({...vacc})}
                              >
                                <Edit size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Vaccination</DialogTitle>
                                <DialogDescription>
                                  Make changes to the vaccination record below.
                                </DialogDescription>
                              </DialogHeader>
                              {editVaccination && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-petId" className="text-right">Pet ID</label>
                                    <Input 
                                      id="edit-petId" 
                                      value={editVaccination.petId} 
                                      onChange={(e) => setEditVaccination({...editVaccination, petId: e.target.value})}
                                      className="col-span-3" 
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-date" className="text-right">Date</label>
                                    <Input 
                                      id="edit-date" 
                                      type="date" 
                                      value={editVaccination.date} 
                                      onChange={(e) => setEditVaccination({...editVaccination, date: e.target.value})}
                                      className="col-span-3" 
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-vaccineTypeId" className="text-right">Vaccine Type</label>
                                    <Input 
                                      id="edit-vaccineTypeId" 
                                      value={editVaccination.vaccineTypeId} 
                                      onChange={(e) => setEditVaccination({...editVaccination, vaccineTypeId: e.target.value})}
                                      className="col-span-3" 
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-administeredBy" className="text-right">Administered By</label>
                                    <Input 
                                      id="edit-administeredBy" 
                                      value={editVaccination.administeredBy} 
                                      onChange={(e) => setEditVaccination({...editVaccination, administeredBy: e.target.value})}
                                      className="col-span-3" 
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-temp" className="text-right">Temp</label>
                                    <Input 
                                      id="edit-temp" 
                                      value={editVaccination.temp} 
                                      onChange={(e) => setEditVaccination({...editVaccination, temp: e.target.value})}
                                      className="col-span-3" 
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-dose" className="text-right">Dose</label>
                                    <Input 
                                      id="edit-dose" 
                                      value={editVaccination.dose || ''} 
                                      onChange={(e) => setEditVaccination({...editVaccination, dose: e.target.value})}
                                      className="col-span-3" 
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-batchNumber" className="text-right">Batch #</label>
                                    <Input 
                                      id="edit-batchNumber" 
                                      value={editVaccination.batchNumber || ''} 
                                      onChange={(e) => setEditVaccination({...editVaccination, batchNumber: e.target.value})}
                                      className="col-span-3" 
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-expiryDate" className="text-right">Expiry Date</label>
                                    <Input 
                                      id="edit-expiryDate" 
                                      type="date"
                                      value={editVaccination.expiryDate || ''} 
                                      onChange={(e) => setEditVaccination({...editVaccination, expiryDate: e.target.value})}
                                      className="col-span-3" 
                                    />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-notes" className="text-right">Notes</label>
                                    <Input 
                                      id="edit-notes" 
                                      value={editVaccination.notes || ''} 
                                      onChange={(e) => setEditVaccination({...editVaccination, notes: e.target.value})}
                                      className="col-span-3" 
                                    />
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button type="button" onClick={handleUpdateVaccination}>Save Changes</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Delete Vaccination Alert Dialog */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600">
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the vaccination record.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteVaccination(vacc.id)} className="bg-red-500 hover:bg-red-600">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VaccinationsPage;
