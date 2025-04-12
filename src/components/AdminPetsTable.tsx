import React, { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table";
import { toast } from "sonner";
import { PetTableRow } from "./pets-admin/PetTableRow";
import { PetsPagination } from "./pets-admin/PetsPagination";
import { PetEditDialog } from "./pets-admin/PetEditDialog";
import { VaccinationDialog } from "./pets-admin/VaccinationDialog";
import { PetRecordsDialog } from "./pets-admin/PetRecordsDialog";
import { AdminPet } from "./pets-admin/types";

// Sample data for pets registered by admin
const initialAdminPetsData = [];

export function AdminPetsTable() {
  const [adminPetsData, setAdminPetsData] = useState<AdminPet[]>(initialAdminPetsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isVaccinationDialogOpen, setIsVaccinationDialogOpen] = useState(false);
  const [isPetRecordsDialogOpen, setIsPetRecordsDialogOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState<null | AdminPet>(null);
  
  const [editForm, setEditForm] = useState({
    name: "",
    chipId: ""
  });
  
  const [newVaccination, setNewVaccination] = useState({
    name: "",
    date: ""
  });
  
  const [newRecord, setNewRecord] = useState({
    type: "",
    date: "",
    notes: ""
  });
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(adminPetsData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = adminPetsData.slice(startIndex, endIndex);

  const handleEditClick = (pet: AdminPet) => {
    setCurrentPet(pet);
    setEditForm({
      name: pet.name,
      chipId: pet.chipId
    });
    setIsEditDialogOpen(true);
  };

  const handleVaccinationClick = (pet: AdminPet) => {
    setCurrentPet(pet);
    setNewVaccination({
      name: "",
      date: ""
    });
    setIsVaccinationDialogOpen(true);
  };

  const handlePetRecordsClick = (pet: AdminPet) => {
    setCurrentPet(pet);
    setNewRecord({
      type: "",
      date: "",
      notes: ""
    });
    setIsPetRecordsDialogOpen(true);
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditForm({...editForm, [field]: value});
  };

  const handleNewVaccinationChange = (field: string, value: string) => {
    setNewVaccination({...newVaccination, [field]: value});
  };

  const handleNewRecordChange = (field: string, value: string) => {
    setNewRecord({...newRecord, [field]: value});
  };

  const handleSaveEdit = () => {
    if (!currentPet) return;
    
    // Validate
    if (!editForm.name || !editForm.chipId) {
      toast.error("All fields are required");
      return;
    }
    
    // Update the data
    const updatedData = adminPetsData.map(pet => 
      pet.id === currentPet.id 
        ? { ...pet, name: editForm.name, chipId: editForm.chipId } 
        : pet
    );
    
    setAdminPetsData(updatedData);
    setIsEditDialogOpen(false);
    toast.success("Pet information updated successfully!");
  };

  const handleAddVaccination = () => {
    if (!currentPet) return;
    
    // Validate
    if (!newVaccination.name || !newVaccination.date) {
      toast.error("All fields are required");
      return;
    }
    
    // Update the data
    const updatedData = adminPetsData.map(pet => {
      if (pet.id === currentPet.id) {
        return {
          ...pet,
          vaccinationRecords: [
            ...pet.vaccinationRecords,
            { name: newVaccination.name, date: newVaccination.date }
          ]
        };
      }
      return pet;
    });
    
    setAdminPetsData(updatedData);
    setNewVaccination({ name: "", date: "" });
    toast.success("Vaccination record added successfully!");
  };

  const handleAddRecord = () => {
    if (!currentPet) return;
    
    // Validate
    if (!newRecord.type || !newRecord.date) {
      toast.error("Type and date are required");
      return;
    }
    
    // Update the data
    const updatedData = adminPetsData.map(pet => {
      if (pet.id === currentPet.id) {
        return {
          ...pet,
          petRecords: [
            ...pet.petRecords,
            { 
              type: newRecord.type, 
              date: newRecord.date,
              notes: newRecord.notes 
            }
          ]
        };
      }
      return pet;
    });
    
    setAdminPetsData(updatedData);
    setNewRecord({ type: "", date: "", notes: "" });
    toast.success("Pet record added successfully!");
  };

  return (
    <div className="clinic-card animate-fade-in">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">ID</TableHead>
              <TableHead>Chip ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Registered By</TableHead>
              <TableHead>Vaccination Records</TableHead>
              <TableHead>Pet Records</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((pet) => (
              <PetTableRow
                key={pet.id}
                pet={pet}
                onEditClick={handleEditClick}
                onVaccinationClick={handleVaccinationClick}
                onPetRecordsClick={handlePetRecordsClick}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <PetsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={adminPetsData.length}
        onPageChange={handlePageChange}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />

      {/* Dialogs */}
      <PetEditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        currentPet={currentPet}
        editForm={editForm}
        onEditFormChange={handleEditFormChange}
        onSave={handleSaveEdit}
      />

      <VaccinationDialog
        isOpen={isVaccinationDialogOpen}
        onOpenChange={setIsVaccinationDialogOpen}
        currentPet={currentPet}
        newVaccination={newVaccination}
        onNewVaccinationChange={handleNewVaccinationChange}
        onAddVaccination={handleAddVaccination}
      />

      <PetRecordsDialog
        isOpen={isPetRecordsDialogOpen}
        onOpenChange={setIsPetRecordsDialogOpen}
        currentPet={currentPet}
        newRecord={newRecord}
        onNewRecordChange={handleNewRecordChange}
        onAddRecord={handleAddRecord}
      />
    </div>
  );
}
