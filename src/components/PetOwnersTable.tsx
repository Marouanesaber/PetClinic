
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { OwnerCard } from "./pet-owners/OwnerCard";
import { OwnerProfileDialog } from "./pet-owners/OwnerProfileDialog";
import { OwnerPetsDialog } from "./pet-owners/OwnerPetsDialog";
import { AddOwnerDialog } from "./pet-owners/AddOwnerDialog";
import { owners, petsByOwner } from "./pet-owners/ownersData";

export function PetOwnersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddOwnerOpen, setIsAddOwnerOpen] = useState(false);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [isViewPetsOpen, setIsViewPetsOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<any>(null);

  // Filter owners based on search query
  const filteredOwners = owners.filter(owner => 
    owner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    owner.phone.includes(searchQuery)
  );

  return (
    <div className="clinic-card animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pet Owners</h1>
        <AddOwnerDialog 
          open={isAddOwnerOpen} 
          onOpenChange={setIsAddOwnerOpen} 
        />
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
            {filteredOwners.map(owner => (
              <OwnerCard 
                key={owner.id} 
                owner={owner} 
                onViewProfile={() => {
                  setSelectedOwner(owner);
                  setIsViewProfileOpen(true);
                }}
                onViewPets={() => {
                  setSelectedOwner(owner);
                  setIsViewPetsOpen(true);
                }}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOwners
              .slice(0, 3) // Just showing the first 3 as "recent" for demonstration
              .map(owner => (
                <OwnerCard 
                  key={owner.id} 
                  owner={owner} 
                  onViewProfile={() => {
                    setSelectedOwner(owner);
                    setIsViewProfileOpen(true);
                  }}
                  onViewPets={() => {
                    setSelectedOwner(owner);
                    setIsViewPetsOpen(true);
                  }}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <OwnerProfileDialog 
        open={isViewProfileOpen} 
        onOpenChange={setIsViewProfileOpen} 
        owner={selectedOwner} 
      />
      
      <OwnerPetsDialog 
        open={isViewPetsOpen} 
        onOpenChange={setIsViewPetsOpen} 
        owner={selectedOwner}
        petsByOwner={petsByOwner}
      />
    </div>
  );
}
