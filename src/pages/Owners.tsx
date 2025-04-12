import { useEffect, useState } from "react";
import { ownersApi } from "@/utils/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Phone, Mail, MapPin, PawPrint } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Owner {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  petsCount: number;
  created_at: string;
}

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
}

const OwnersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOwnerOpen, setIsAddOwnerOpen] = useState(false);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [isViewPetsOpen, setIsViewPetsOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [petsByOwner, setPetsByOwner] = useState<Record<number, Pet[]>>({});

  useEffect(() => {
    ownersApi.getAll().then(setOwners).catch(console.error);
  }, []);

  const handleDeleteOwner = async (ownerId: number) => {
    try {
      await ownersApi.delete(ownerId);
      setOwners((prevOwners) => prevOwners.filter((owner) => owner.id !== ownerId));
      toast.success("Owner deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete owner");
    }
  };

  const handleAddOwner = async () => {
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const phoneInput = document.getElementById("phone") as HTMLInputElement;
    const addressInput = document.getElementById("address") as HTMLTextAreaElement;

    // Split the full name into first_name and last_name
    const [first_name, ...lastNameParts] = nameInput.value.split(" ");
    const last_name = lastNameParts.join(" ");

    const newOwner = {
      first_name,
      last_name,
      email: emailInput.value,
      telephone: phoneInput.value,
      address: addressInput.value,
    };

    try {
      const createdOwner = await ownersApi.create(newOwner);
      setOwners([...owners, createdOwner]);
      toast.success("Owner added successfully");
      setIsAddOwnerOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to add owner");
    }
  };

  const handleViewProfile = (owner: Owner) => {
    setSelectedOwner(owner);
    setIsViewProfileOpen(true);
  };

  const handleViewPets = async (ownerId: number) => {
    try {
      const pets = await ownersApi.getOwnerPets(ownerId);
      setPetsByOwner((prev) => ({ ...prev, [ownerId]: pets }));
      setSelectedOwner(owners.find((owner) => owner.id === ownerId) || null);
      setIsViewPetsOpen(true);
    } catch (error) {
      console.error("Failed to fetch pets:", error);
      toast.error("Failed to fetch pets");
    }
  };

  const filteredOwners = owners.filter(
    (owner) =>
      (owner.name?.toLowerCase().includes(searchQuery.toLowerCase()) || "") ||
      (owner.email?.toLowerCase().includes(searchQuery.toLowerCase()) || "") ||
      (owner.phone?.includes(searchQuery) || "")
  );

  const recentlyAddedOwners = [...owners]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5); // Limit to the 5 most recently added owners

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pet Owners</h1>
        <Dialog open={isAddOwnerOpen} onOpenChange={setIsAddOwnerOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 animate-fade-in">
              <Plus className="h-4 w-4" />
              Add New Owner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Owner</DialogTitle>
              <DialogDescription>Enter the details of the new pet owner.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name
                </Label>
                <Input id="name" placeholder="John Doe" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Textarea id="address" placeholder="123 Main St, New York, NY" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOwnerOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddOwner}>Add Owner</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2">
          <TabsTrigger value="all">All Owners</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>

        <div className="relative w-full my-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search owners by name, email, or phone..."
            className="w-full md:w-[350px] pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOwners.map((owner) => (
              <OwnerCard
                key={owner.id}
                owner={owner}
                onViewProfile={() => handleViewProfile(owner)}
                onViewPets={() => handleViewPets(owner.id)}
                onDelete={() => handleDeleteOwner(owner.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentlyAddedOwners.map((owner) => (
              <OwnerCard
                key={owner.id}
                owner={owner}
                onViewProfile={() => handleViewProfile(owner)}
                onViewPets={() => handleViewPets(owner.id)}
                onDelete={() => handleDeleteOwner(owner.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* View Profile Dialog */}
      <Dialog open={isViewProfileOpen} onOpenChange={setIsViewProfileOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Owner Profile</DialogTitle>
          </DialogHeader>
          {selectedOwner && (
            <div className="space-y-4">
              <p><strong>Name:</strong> {selectedOwner.name}</p>
              <p><strong>Email:</strong> {selectedOwner.email}</p>
              <p><strong>Phone:</strong> {selectedOwner.phone}</p>
              <p><strong>Address:</strong> {selectedOwner.address}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewProfileOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Pets Dialog */}
      <Dialog open={isViewPetsOpen} onOpenChange={setIsViewPetsOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Owner's Pets</DialogTitle>
          </DialogHeader>
          {selectedOwner && petsByOwner[selectedOwner.id] && (
            <div className="space-y-4">
              {petsByOwner[selectedOwner.id].map((pet) => (
                <div key={pet.id} className="border p-2 rounded">
                  <p><strong>Name:</strong> {pet.name}</p>
                  <p><strong>Species:</strong> {pet.species}</p>
                  <p><strong>Breed:</strong> {pet.breed}</p>
                  <p><strong>Age:</strong> {pet.age}</p>
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewPetsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const OwnerCard = ({
  owner,
  onViewProfile,
  onViewPets,
  onDelete,
}: {
  owner: Owner;
  onViewProfile: () => void;
  onViewPets: () => void;
  onDelete: () => void;
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(owner.name)}`} />
            <AvatarFallback>{owner.name.split(" ").map((n) => n[0]).join("").toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{owner.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <PawPrint className="h-3 w-3" />
              {owner.petsCount} {owner.petsCount === 1 ? "Pet" : "Pets"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${owner.email}`} className="text-blue-600 hover:underline">
              {owner.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <a href={`tel:${owner.phone}`} className="hover:underline">
              {owner.phone}
            </a>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <span className="text-xs">{owner.address}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button size="sm" variant="outline" onClick={onViewProfile}>
          View Profile
        </Button>
        <Button size="sm" variant="outline" onClick={onViewPets}>
          View Pets
        </Button>
        <Button size="sm" variant="outline" className="text-red-500" onClick={onDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OwnersPage;
