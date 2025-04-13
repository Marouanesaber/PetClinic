import React, { useEffect, useState, forwardRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { petsApi, ownersApi } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

// Wrap Select with forwardRef to handle refs
const ForwardedSelect = React.forwardRef((props, ref) => (
  <Select {...props} ref={ref} />
));
ForwardedSelect.displayName = "ForwardedSelect";

interface Pet {
  id: number;
  name: string;
  type: string;
  type_id: number;
  age: number;
  ownerId: number;
  ownerName: string;
  gender: string;
  breed?: string;
  photo?: string;
  createdAt?: string;
}

const PetsPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [owners, setOwners] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [isEditPetOpen, setIsEditPetOpen] = useState(false);
  const [isViewPetOpen, setIsViewPetOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    petsApi.getAll().then(setPets).catch(console.error);
    ownersApi.getAll().then(setOwners).catch(console.error);
    petsApi.getPetTypes()
      .then(setPetTypes)
      .catch((err) => {
        console.error("Error fetching pet types:", err);
        toast.error("Failed to load pet types");
      });
  }, []);

  const filteredPets = pets.filter((pet) => {
    if (activeTab === "recent") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(pet.createdAt || "") >= oneWeekAgo;
    }
    return true;
  }).filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPet = async (data) => {
    try {
      const payload = {
        name: data.name,
        type_id: parseInt(data.type_id),
        owner_id: parseInt(data.owner_id),
        breed: data.breed || null,
        date_of_birth: data.date_of_birth || null,
        gender: data.gender,
        notes: data.notes || null,
      };

      console.log("Sending payload to backend:", payload); // Debugging log

      const addedPet = await petsApi.create(payload);
      petsApi.getAll().then(setPets).catch(console.error);
      toast.success("Pet added successfully");
      setIsAddPetOpen(false);
      reset();
    } catch (error) {
      console.error("Error adding pet:", error);
      toast.error(error.response?.data?.error || "Failed to add pet");
    }
  };

  const handleEditPet = async (data) => {
    if (!selectedPet) return;
    try {
      const payload = {
        ...data,
        type_id: parseInt(data.type_id, 10),
        owner_id: parseInt(data.owner_id, 10),
      };

      const updatedPet = await petsApi.update(selectedPet.id, payload);
      setPets(pets.map((pet) => (pet.id === selectedPet.id ? updatedPet : pet)));
      toast.success("Pet updated successfully");
      setIsEditPetOpen(false);
      setSelectedPet(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to update pet");
    }
  };

  const handleDeletePet = async (petId: number) => {
    try {
      await petsApi.delete(petId);
      setPets(pets.filter((pet) => pet.id !== petId));
      toast.success("Pet deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete pet");
    }
  };

  const handleViewPet = (pet) => {
    setSelectedPet(pet);
    setIsViewPetOpen(true);
  };

  const openAddPetModal = () => {
    reset();
    setIsAddPetOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pets</h1>
        <Button onClick={openAddPetModal}>Add New Pet</Button>
      </div>

      {/* Tabs for All Pets and Recently Added */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
            All Pets
          </TabsTrigger>
          <TabsTrigger value="recent" onClick={() => setActiveTab("recent")}>
            Recently Added
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search Bar */}
      <div className="relative w-full my-4">
        <Input
          type="search"
          placeholder="Search pets by name..."
          className="w-full md:w-[350px] pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Pet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPets.map((pet) => (
          <div key={pet.id} className="border p-4 rounded shadow">
            <div className="flex items-center gap-3">
              {/* Avatar with Initials */}
              <Avatar>
                <AvatarImage src={pet.photo || ""} />
                <AvatarFallback>
                  {pet.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-bold">{pet.name}</h2>
            </div>
            <p>Species: {pet.type}</p>
            <p>Breed: {pet.breed || "Unknown"}</p>
            <p>Age: {pet.age} years</p>
            <p>Gender: {pet.gender.charAt(0).toUpperCase() + pet.gender.slice(1)}</p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => handleViewPet(pet)}>
                View Pet
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedPet(pet);
                  setValue("name", pet.name);
                  setValue("type_id", String(pet.type_id));
                  setValue("age", String(pet.age));
                  setValue("owner_id", String(pet.ownerId));
                  setValue("gender", pet.gender);
                  setIsEditPetOpen(true);
                }}
              >
                Modify
              </Button>
              <Button
                variant="outline"
                className="text-red-500"
                onClick={() => handleDeletePet(pet.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Pet Dialog */}
      <Dialog open={isAddPetOpen} onOpenChange={setIsAddPetOpen}>
        <DialogContent aria-describedby="add-pet-description">
          <DialogHeader>
            <DialogTitle>Add New Pet</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleAddPet)} className="space-y-4">
            <Input
              placeholder="Enter pet name"
              {...register("name", { required: true })}
            />
            <Controller
              name="type_id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ForwardedSelect {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Pet Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {petTypes.map((type) => (
                      <SelectItem key={type.id} value={String(type.id)}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </ForwardedSelect>
              )}
            />
            <Input
              placeholder="Enter age"
              type="number"
              {...register("age", { required: true })}
            />
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ForwardedSelect {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </ForwardedSelect>
              )}
            />
            <Controller
              name="owner_id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ForwardedSelect {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {owners.map((owner) => (
                      <SelectItem key={owner.id} value={String(owner.id)}>
                        {owner.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </ForwardedSelect>
              )}
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Pet</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Pet Dialog */}
      <Dialog open={isEditPetOpen} onOpenChange={setIsEditPetOpen}>
        <DialogContent aria-describedby="edit-pet-description">
          <DialogHeader>
            <DialogTitle>Edit Pet</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(handleEditPet)} className="space-y-4">
            <Input
              placeholder="Enter pet name"
              {...register("name", { required: true })}
            />
            <Input
              placeholder="Enter breed"
              {...register("breed", { required: false })}
            />
            <Input
              placeholder="Enter age"
              type="number"
              {...register("age", { required: true })}
            />
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ForwardedSelect {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </ForwardedSelect>
              )}
            />
            <Controller
              name="type_id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ForwardedSelect {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Pet Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {petTypes.map((type) => (
                      <SelectItem key={type.id} value={String(type.id)}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </ForwardedSelect>
              )}
            />
            {errors.type_id && <p className="text-red-500 text-xs mt-1">Pet type is required</p>}
            <Controller
              name="owner_id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ForwardedSelect {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {owners.map((owner) => (
                      <SelectItem key={owner.id} value={String(owner.id)}>
                        {owner.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </ForwardedSelect>
              )}
            />
            {errors.owner_id && <p className="text-red-500 text-xs mt-1">Owner is required</p>}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditPetOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Pet Dialog */}
      <Dialog open={isViewPetOpen} onOpenChange={setIsViewPetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pet Details</DialogTitle>
          </DialogHeader>
          {selectedPet && (
            <div className="space-y-4">
              <p><strong>Name:</strong> {selectedPet.name}</p>
              <p><strong>Type:</strong> {selectedPet.type}</p>
              <p><strong>Breed:</strong> {selectedPet.breed || "Unknown"}</p>
              <p><strong>Age:</strong> {selectedPet.age} years</p>
              <p><strong>Gender:</strong> {selectedPet.gender}</p>
              <p><strong>Owner:</strong> {selectedPet.ownerName}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewPetOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PetsPage;
