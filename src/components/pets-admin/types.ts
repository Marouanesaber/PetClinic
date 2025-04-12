
export interface VaccinationRecord {
  name: string;
  date: string;
}

export interface PetRecord {
  type: string;
  date: string;
  notes: string;
}

export interface AdminPet {
  id: number;
  chipId: string;
  name: string;
  registeredBy: string;
  vaccinationRecords: VaccinationRecord[];
  petRecords: PetRecord[];
}
