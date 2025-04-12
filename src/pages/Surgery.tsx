import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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

const SurgeryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewingSurgery, setViewingSurgery] = useState<any>(null);

  // Mock data for surgeries
  const [surgeries, setSurgeries] = useState([
    { id: 1, petName: "Max", type: "Dog", owner: "John Doe", procedure: "Castration", date: "2023-09-15", status: "completed" },
    { id: 2, petName: "Luna", type: "Cat", owner: "Jane Smith", procedure: "Tumor Removal", date: "2023-09-20", status: "scheduled" },
    { id: 3, petName: "Buddy", type: "Dog", owner: "Mike Johnson", procedure: "Fracture Repair", date: "2023-10-05", status: "scheduled" },
    { id: 4, petName: "Coco", type: "Rabbit", owner: "Sarah Williams", procedure: "Teeth Trimming", date: "2023-10-10", status: "scheduled" }
  ]);

  const [newSurgery, setNewSurgery] = useState({
    petName: "",
    type: "",
    owner: "",
    procedure: "",
    date: "",
    status: "scheduled",
    time: "10:00"
  });

  // Filter surgeries based on search query and filter status
  const filteredSurgeries = surgeries.filter(surgery => {
    const matchesSearch = surgery.petName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          surgery.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          surgery.procedure.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || surgery.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddSurgery = () => {
    const surgery = {
      id: surgeries.length + 1,
      ...newSurgery
    };
    
    setSurgeries([surgery, ...surgeries]);
    
    // Reset form
    setNewSurgery({
      petName: "",
      type: "",
      owner: "",
      procedure: "",
      date: "",
      status: "scheduled",
      time: "10:00"
    });
    
    toast.success("New surgery scheduled successfully!");
  };

  const handleViewDetails = (surgery: any) => {
    setViewingSurgery(surgery);
  };

  const handleEditPet = (pet: any) => {
    // Logic for editing pet details
  };

  const handleDeletePet = (petId: number) => {
    // Logic for deleting pet
  };

  const handleEditSurgery = (surgery: any) => {
    // Logic for editing surgery details
  };

  const handleDeleteSurgery = (surgeryId: number) => {
    // Logic for deleting surgery
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Surgery</h1>
        
        {/* New Surgery Button with Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Surgery
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule New Surgery</DialogTitle>
              <DialogDescription>
                Enter the details for the new surgery.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="petName" className="text-right">Pet Name</label>
                <Input 
                  id="petName" 
                  value={newSurgery.petName} 
                  onChange={(e) => setNewSurgery({...newSurgery, petName: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="type" className="text-right">Pet Type</label>
                <Input 
                  id="type" 
                  value={newSurgery.type} 
                  onChange={(e) => setNewSurgery({...newSurgery, type: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="owner" className="text-right">Owner</label>
                <Input 
                  id="owner" 
                  value={newSurgery.owner} 
                  onChange={(e) => setNewSurgery({...newSurgery, owner: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="procedure" className="text-right">Procedure</label>
                <Input 
                  id="procedure" 
                  value={newSurgery.procedure} 
                  onChange={(e) => setNewSurgery({...newSurgery, procedure: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="date" className="text-right">Date</label>
                <Input 
                  id="date" 
                  type="date"
                  value={newSurgery.date} 
                  onChange={(e) => setNewSurgery({...newSurgery, date: e.target.value})}
                  className="col-span-3" 
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="time" className="text-right">Time</label>
                <Input 
                  id="time" 
                  type="time"
                  value={newSurgery.time} 
                  onChange={(e) => setNewSurgery({...newSurgery, time: e.target.value})}
                  className="col-span-3" 
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" onClick={handleAddSurgery}>Schedule</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Surgeries</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 my-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search surgeries..."
              className="w-full md:w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px] flex gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="upcoming" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSurgeries
              .filter(surgery => surgery.status === "scheduled")
              .map(surgery => (
                <Card key={surgery.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{surgery.petName} ({surgery.type})</CardTitle>
                    <CardDescription>{surgery.owner}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">Procedure:</div>
                        <div>{surgery.procedure}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>{new Date(surgery.date).toLocaleDateString()}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>10:00 AM</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs py-1 px-2 rounded-full bg-amber-100 text-amber-800">
                      Scheduled
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(surgery)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Surgery Details</DialogTitle>
                          <DialogDescription>
                            Detailed information about the scheduled surgery.
                          </DialogDescription>
                        </DialogHeader>
                        {viewingSurgery && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-2">
                              <span className="font-medium">Pet:</span>
                              <span>{viewingSurgery.petName} ({viewingSurgery.type})</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span className="font-medium">Owner:</span>
                              <span>{viewingSurgery.owner}</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span className="font-medium">Procedure:</span>
                              <span>{viewingSurgery.procedure}</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span className="font-medium">Date:</span>
                              <span>{new Date(viewingSurgery.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span className="font-medium">Time:</span>
                              <span>10:00 AM</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Status:</span>
                              <span className="text-xs py-1 px-2 rounded-full bg-amber-100 text-amber-800">
                                {viewingSurgery.status.charAt(0).toUpperCase() + viewingSurgery.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPet(surgery)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500"
                      onClick={() => handleDeletePet(surgery.id)}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSurgeries
              .filter(surgery => surgery.status === "completed")
              .map(surgery => (
                <Card key={surgery.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{surgery.petName} ({surgery.type})</CardTitle>
                    <CardDescription>{surgery.owner}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">Procedure:</div>
                        <div>{surgery.procedure}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>{new Date(surgery.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="text-xs py-1 px-2 rounded-full bg-green-100 text-green-800">
                      Completed
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(surgery)}>
                          View Report
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Surgery Report</DialogTitle>
                          <DialogDescription>
                            Detailed report of the completed surgery.
                          </DialogDescription>
                        </DialogHeader>
                        {viewingSurgery && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center border-b pb-2">
                              <span className="font-medium">Pet:</span>
                              <span>{viewingSurgery.petName} ({viewingSurgery.type})</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span className="font-medium">Owner:</span>
                              <span>{viewingSurgery.owner}</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span className="font-medium">Procedure:</span>
                              <span>{viewingSurgery.procedure}</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span className="font-medium">Date:</span>
                              <span>{new Date(viewingSurgery.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center border-b pb-2">
                              <span className="font-medium">Status:</span>
                              <span className="text-xs py-1 px-2 rounded-full bg-green-100 text-green-800">
                                {viewingSurgery.status.charAt(0).toUpperCase() + viewingSurgery.status.slice(1)}
                              </span>
                            </div>
                            <div className="border-b pb-2">
                              <span className="font-medium">Surgery Notes:</span>
                              <p className="mt-1 text-sm text-gray-600">
                                Surgery completed successfully with no complications. Patient is recovering well.
                              </p>
                            </div>
                            <div>
                              <span className="font-medium">Post-operative Care:</span>
                              <p className="mt-1 text-sm text-gray-600">
                                Keep the wound clean and dry. Administer prescribed medications as directed.
                                Return for follow-up in 7 days.
                              </p>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSurgeries.map(surgery => (
              <Card key={surgery.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{surgery.petName} ({surgery.type})</CardTitle>
                  <CardDescription>{surgery.owner}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">Procedure:</div>
                      <div>{surgery.procedure}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>{new Date(surgery.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className={`text-xs py-1 px-2 rounded-full ${
                    surgery.status === "completed" 
                      ? "bg-green-100 text-green-800" 
                      : surgery.status === "scheduled" 
                        ? "bg-amber-100 text-amber-800" 
                        : "bg-red-100 text-red-800"
                  }`}>
                    {surgery.status.charAt(0).toUpperCase() + surgery.status.slice(1)}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(surgery)}>
                        {surgery.status === "completed" ? "View Report" : "View Details"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {surgery.status === "completed" ? "Surgery Report" : "Surgery Details"}
                        </DialogTitle>
                        <DialogDescription>
                          {surgery.status === "completed" 
                            ? "Detailed report of the completed surgery."
                            : "Detailed information about the scheduled surgery."}
                        </DialogDescription>
                      </DialogHeader>
                      {viewingSurgery && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Pet:</span>
                            <span>{viewingSurgery.petName} ({viewingSurgery.type})</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Owner:</span>
                            <span>{viewingSurgery.owner}</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Procedure:</span>
                            <span>{viewingSurgery.procedure}</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Date:</span>
                            <span>{new Date(viewingSurgery.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between items-center border-b pb-2">
                            <span className="font-medium">Status:</span>
                            <span className={`text-xs py-1 px-2 rounded-full ${
                              viewingSurgery.status === "completed" 
                                ? "bg-green-100 text-green-800" 
                                : viewingSurgery.status === "scheduled" 
                                  ? "bg-amber-100 text-amber-800" 
                                  : "bg-red-100 text-red-800"
                            }`}>
                              {viewingSurgery.status.charAt(0).toUpperCase() + viewingSurgery.status.slice(1)}
                            </span>
                          </div>
                          {viewingSurgery.status === "completed" && (
                            <>
                              <div className="border-b pb-2">
                                <span className="font-medium">Surgery Notes:</span>
                                <p className="mt-1 text-sm text-gray-600">
                                  Surgery completed successfully with no complications. Patient is recovering well.
                                </p>
                              </div>
                              <div>
                                <span className="font-medium">Post-operative Care:</span>
                                <p className="mt-1 text-sm text-gray-600">
                                  Keep the wound clean and dry. Administer prescribed medications as directed.
                                  Return for follow-up in 7 days.
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button>Close</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPet(surgery)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500"
                    onClick={() => handleDeletePet(surgery.id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-4">
        {surgeries.map((surgery) => (
          <Card key={surgery.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{surgery.petName}</CardTitle>
              <CardDescription>{surgery.procedure}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Owner: {surgery.owner}</p>
              <p>Date: {surgery.date}</p>
              <p>Status: {surgery.status}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEditSurgery(surgery)}>
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDeleteSurgery(surgery.id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SurgeryPage;
