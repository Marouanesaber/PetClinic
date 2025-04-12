
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Filter, Plus, FileSpreadsheet, FileCheck, CircleAlert, BarChart3, Beaker, Microscope, TestTube } from "lucide-react";
import { toast } from "sonner";

// Sample test types
const testTypes = [
  { id: 1, name: "Complete Blood Count (CBC)", category: "hematology", price: 85 },
  { id: 2, name: "Blood Chemistry Panel", category: "chemistry", price: 120 },
  { id: 3, name: "Urinalysis", category: "urine", price: 65 },
  { id: 4, name: "Fecal Examination", category: "parasitology", price: 55 },
  { id: 5, name: "Thyroid Panel", category: "endocrinology", price: 145 },
  { id: 6, name: "Heartworm Test", category: "infectious disease", price: 70 },
  { id: 7, name: "FeLV/FIV Test", category: "infectious disease", price: 80 },
  { id: 8, name: "Skin Scrape/Cytology", category: "dermatology", price: 90 },
  { id: 9, name: "Ear Cytology", category: "dermatology", price: 75 },
  { id: 10, name: "Fine Needle Aspirate", category: "cytology", price: 110 }
];

// Sample lab tests
const initialTests = [
  { id: 1, testId: 1, petName: "Max", petOwner: "John Doe", date: "2023-09-15", status: "completed", results: "Normal", doctor: "Dr. Smith" },
  { id: 2, testId: 3, petName: "Luna", petOwner: "Jane Smith", date: "2023-09-16", status: "pending", results: "", doctor: "Dr. Jones" },
  { id: 3, testId: 2, petName: "Buddy", petOwner: "Mike Johnson", date: "2023-09-14", status: "in_progress", results: "", doctor: "Dr. Smith" },
  { id: 4, testId: 7, petName: "Whiskers", petOwner: "Sarah Williams", date: "2023-09-17", status: "attention", results: "Abnormal values detected", doctor: "Dr. Jones" },
  { id: 5, testId: 5, petName: "Rocky", petOwner: "David Miller", date: "2023-09-13", status: "completed", results: "Normal", doctor: "Dr. Smith" }
];

// Sample pets for dropdown
const pets = [
  { id: 1, name: "Max", owner: "John Doe", species: "Dog", breed: "Golden Retriever" },
  { id: 2, name: "Luna", owner: "Jane Smith", species: "Cat", breed: "Siamese" },
  { id: 3, name: "Buddy", owner: "Mike Johnson", species: "Dog", breed: "German Shepherd" },
  { id: 4, name: "Whiskers", owner: "Sarah Williams", species: "Cat", breed: "Maine Coon" },
  { id: 5, name: "Rocky", owner: "David Miller", species: "Dog", breed: "Bulldog" }
];

const LaboratoryPage = () => {
  const [labTests, setLabTests] = useState(initialTests);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isNewTestDialogOpen, setIsNewTestDialogOpen] = useState(false);
  const [isViewResultsDialogOpen, setIsViewResultsDialogOpen] = useState(false);
  const [isUpdateResultsDialogOpen, setIsUpdateResultsDialogOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<any>(null);

  // Form states
  const [newTest, setNewTest] = useState({
    petId: "",
    testId: "",
    notes: ""
  });

  const [testResults, setTestResults] = useState({
    results: "",
    notes: ""
  });

  // Filtered tests based on search and filters
  const filteredTests = labTests.filter(test => {
    const matchesSearch = 
      test.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.petOwner.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || test.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddTest = () => {
    if (!newTest.petId || !newTest.testId) {
      toast.error("Please select both a pet and a test type");
      return;
    }

    const pet = pets.find(p => p.id.toString() === newTest.petId);
    const testType = testTypes.find(t => t.id.toString() === newTest.testId);

    if (!pet || !testType) return;

    const newLabTest = {
      id: labTests.length + 1,
      testId: parseInt(newTest.testId),
      petName: pet.name,
      petOwner: pet.owner,
      date: new Date().toISOString().split('T')[0],
      status: "pending",
      results: "",
      doctor: "Dr. Smith" // In a real app, this would be the logged-in doctor
    };

    setLabTests([...labTests, newLabTest]);
    setIsNewTestDialogOpen(false);
    setNewTest({ petId: "", testId: "", notes: "" });
    toast.success("New lab test has been registered");
  };

  const handleViewResults = (test: any) => {
    setSelectedTest(test);
    setIsViewResultsDialogOpen(true);
  };

  const handleUpdateResults = (test: any) => {
    setSelectedTest(test);
    setTestResults({
      results: test.results || "",
      notes: ""
    });
    setIsUpdateResultsDialogOpen(true);
  };

  const handleSaveResults = () => {
    if (!testResults.results) {
      toast.error("Please enter test results");
      return;
    }

    const updatedTests = labTests.map(test => {
      if (test.id === selectedTest.id) {
        return {
          ...test,
          results: testResults.results,
          status: "completed"
        };
      }
      return test;
    });

    setLabTests(updatedTests);
    setIsUpdateResultsDialogOpen(false);
    toast.success("Test results have been updated");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-500">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "attention":
        return <Badge className="bg-red-500">Needs Attention</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getTestIcon = (testId: number) => {
    const test = testTypes.find(t => t.id === testId);
    if (!test) return <Beaker className="h-5 w-5" />;

    switch (test.category) {
      case "hematology":
        return <TestTube className="h-5 w-5 text-red-500" />;
      case "chemistry":
        return <Beaker className="h-5 w-5 text-blue-500" />;
      case "urine":
        return <Beaker className="h-5 w-5 text-yellow-500" />;
      case "parasitology":
        return <Microscope className="h-5 w-5 text-green-500" />;
      case "endocrinology":
        return <BarChart3 className="h-5 w-5 text-purple-500" />;
      case "infectious disease":
        return <CircleAlert className="h-5 w-5 text-red-500" />;
      case "dermatology":
        return <Microscope className="h-5 w-5 text-orange-500" />;
      case "cytology":
        return <Microscope className="h-5 w-5 text-teal-500" />;
      default:
        return <Beaker className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Laboratory</h1>
        <Button onClick={() => setIsNewTestDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Lab Test
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Lab Tests Management</CardTitle>
          <CardDescription>
            View and manage laboratory tests and results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="relative w-full md:w-auto">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by pet or owner name..."
                className="w-full md:w-[350px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-full md:w-[180px]">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="attention">Needs Attention</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Tests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="attention">Needs Attention</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Test</TableHead>
                      <TableHead>Pet</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                          No lab tests found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests.map((test) => {
                        const testType = testTypes.find(t => t.id === test.testId);
                        return (
                          <TableRow key={test.id} className="hover:bg-muted/30 transition-colors">
                            <TableCell>{test.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getTestIcon(test.testId)}
                                <span>{testType?.name || "Unknown Test"}</span>
                              </div>
                            </TableCell>
                            <TableCell>{test.petName}</TableCell>
                            <TableCell>{test.petOwner}</TableCell>
                            <TableCell>{test.date}</TableCell>
                            <TableCell>{getStatusBadge(test.status)}</TableCell>
                            <TableCell>{test.doctor}</TableCell>
                            <TableCell className="text-right space-x-2">
                              {test.status === "completed" || test.status === "attention" ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewResults(test)}
                                >
                                  <FileCheck className="h-4 w-4 mr-1" />
                                  View Results
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateResults(test)}
                                >
                                  <FileSpreadsheet className="h-4 w-4 mr-1" />
                                  Update Results
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Test</TableHead>
                      <TableHead>Pet</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.filter(t => t.status === "pending").length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No pending tests found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests
                        .filter(t => t.status === "pending")
                        .map((test) => {
                          const testType = testTypes.find(t => t.id === test.testId);
                          return (
                            <TableRow key={test.id} className="hover:bg-muted/30 transition-colors">
                              <TableCell>{test.id}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getTestIcon(test.testId)}
                                  <span>{testType?.name || "Unknown Test"}</span>
                                </div>
                              </TableCell>
                              <TableCell>{test.petName}</TableCell>
                              <TableCell>{test.petOwner}</TableCell>
                              <TableCell>{test.date}</TableCell>
                              <TableCell>{test.doctor}</TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUpdateResults(test)}
                                >
                                  <FileSpreadsheet className="h-4 w-4 mr-1" />
                                  Update Results
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Test</TableHead>
                      <TableHead>Pet</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.filter(t => t.status === "completed").length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No completed tests found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests
                        .filter(t => t.status === "completed")
                        .map((test) => {
                          const testType = testTypes.find(t => t.id === test.testId);
                          return (
                            <TableRow key={test.id} className="hover:bg-muted/30 transition-colors">
                              <TableCell>{test.id}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getTestIcon(test.testId)}
                                  <span>{testType?.name || "Unknown Test"}</span>
                                </div>
                              </TableCell>
                              <TableCell>{test.petName}</TableCell>
                              <TableCell>{test.petOwner}</TableCell>
                              <TableCell>{test.date}</TableCell>
                              <TableCell>{test.doctor}</TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewResults(test)}
                                >
                                  <FileCheck className="h-4 w-4 mr-1" />
                                  View Results
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="attention" className="mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">ID</TableHead>
                      <TableHead>Test</TableHead>
                      <TableHead>Pet</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Doctor</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.filter(t => t.status === "attention").length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No tests needing attention found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests
                        .filter(t => t.status === "attention")
                        .map((test) => {
                          const testType = testTypes.find(t => t.id === test.testId);
                          return (
                            <TableRow key={test.id} className="hover:bg-muted/30 transition-colors">
                              <TableCell>{test.id}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getTestIcon(test.testId)}
                                  <span>{testType?.name || "Unknown Test"}</span>
                                </div>
                              </TableCell>
                              <TableCell>{test.petName}</TableCell>
                              <TableCell>{test.petOwner}</TableCell>
                              <TableCell>{test.date}</TableCell>
                              <TableCell>{test.doctor}</TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewResults(test)}
                                >
                                  <FileCheck className="h-4 w-4 mr-1" />
                                  View Results
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* New Lab Test Dialog */}
      <Dialog open={isNewTestDialogOpen} onOpenChange={setIsNewTestDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Request New Lab Test</DialogTitle>
            <DialogDescription>
              Fill in the details to request a new laboratory test
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pet" className="text-right">
                Pet
              </Label>
              <Select
                value={newTest.petId}
                onValueChange={(value) => setNewTest({...newTest, petId: value})}
              >
                <SelectTrigger id="pet" className="col-span-3">
                  <SelectValue placeholder="Select pet" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id.toString()}>
                      {pet.name} ({pet.species} - {pet.owner})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="test-type" className="text-right">
                Test Type
              </Label>
              <Select
                value={newTest.testId}
                onValueChange={(value) => setNewTest({...newTest, testId: value})}
              >
                <SelectTrigger id="test-type" className="col-span-3">
                  <SelectValue placeholder="Select test type" />
                </SelectTrigger>
                <SelectContent>
                  {testTypes.map((test) => (
                    <SelectItem key={test.id} value={test.id.toString()}>
                      {test.name} (${test.price})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="notes" className="text-right pt-2">
                Notes
              </Label>
              <Input
                id="notes"
                placeholder="Any special instructions or notes"
                className="col-span-3"
                value={newTest.notes}
                onChange={(e) => setNewTest({...newTest, notes: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTestDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTest}>Submit Test Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Test Results Dialog */}
      <Dialog open={isViewResultsDialogOpen} onOpenChange={setIsViewResultsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Test Results</DialogTitle>
            <DialogDescription>
              {selectedTest && (
                <>
                  Test for {selectedTest.petName} ({testTypes.find(t => t.id === selectedTest.testId)?.name || "Unknown Test"})
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedTest && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Pet Name:</p>
                    <p className="text-sm">{selectedTest.petName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Owner:</p>
                    <p className="text-sm">{selectedTest.petOwner}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date:</p>
                    <p className="text-sm">{selectedTest.date}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Test Type:</p>
                    <p className="text-sm">{testTypes.find(t => t.id === selectedTest.testId)?.name || "Unknown Test"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status:</p>
                    <p className="text-sm">{getStatusBadge(selectedTest.status)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Results:</p>
                  <div className="rounded-md border p-3 mt-1 bg-muted/20">
                    <p className="text-sm whitespace-pre-wrap">{selectedTest.results}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewResultsDialogOpen(false)}>Close</Button>
            <Button 
              onClick={() => {
                setIsViewResultsDialogOpen(false);
                handleUpdateResults(selectedTest);
              }}
            >
              Edit Results
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Test Results Dialog */}
      <Dialog open={isUpdateResultsDialogOpen} onOpenChange={setIsUpdateResultsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Update Test Results</DialogTitle>
            <DialogDescription>
              {selectedTest && (
                <>
                  Enter the results for {selectedTest.petName}'s {testTypes.find(t => t.id === selectedTest.testId)?.name || "test"}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedTest && (
              <>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">Pet Name:</p>
                    <p className="text-sm">{selectedTest.petName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Owner:</p>
                    <p className="text-sm">{selectedTest.petOwner}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Date:</p>
                    <p className="text-sm">{selectedTest.date}</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="results">Test Results</Label>
                  <Input
                    id="results"
                    value={testResults.results}
                    onChange={(e) => setTestResults({...testResults, results: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Input
                    id="notes"
                    value={testResults.notes}
                    onChange={(e) => setTestResults({...testResults, notes: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="abnormal" />
                  <label
                    htmlFor="abnormal"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Flag as abnormal (needs attention)
                  </label>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateResultsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveResults}>Save Results</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LaboratoryPage;
