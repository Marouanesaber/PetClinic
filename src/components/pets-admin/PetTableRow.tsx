
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, FileText, Syringe } from "lucide-react";
import { AdminPet } from "./types";

interface PetTableRowProps {
  pet: AdminPet;
  onEditClick: (pet: AdminPet) => void;
  onVaccinationClick: (pet: AdminPet) => void;
  onPetRecordsClick: (pet: AdminPet) => void;
}

export function PetTableRow({
  pet,
  onEditClick,
  onVaccinationClick,
  onPetRecordsClick,
}: PetTableRowProps) {
  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td>{pet.id}</td>
      <td>{pet.chipId}</td>
      <td>{pet.name}</td>
      <td>{pet.registeredBy}</td>
      <td>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-clinic-blue"
          onClick={() => onVaccinationClick(pet)}
        >
          <Syringe className="h-4 w-4 mr-1" />
          View ({pet.vaccinationRecords.length})
        </Button>
      </td>
      <td>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-clinic-blue"
          onClick={() => onPetRecordsClick(pet)}
        >
          <FileText className="h-4 w-4 mr-1" />
          View ({pet.petRecords.length})
        </Button>
      </td>
      <td className="text-right">
        <Button 
          size="sm" 
          className="bg-clinic-blue hover:bg-clinic-blue/90"
          onClick={() => onEditClick(pet)}
        >
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
      </td>
    </tr>
  );
}
