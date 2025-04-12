
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, ArrowRight, Calendar, Shield, Clock } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Services = () => {
  const petServices = [
    { 
      name: "Wellness Exam", 
      description: "Comprehensive health checkup including physical examination, weight check, and health history review.", 
      price: "$50",
      features: ["Complete physical examination", "Vital signs check", "Health history review", "Preventive care recommendations"],
      popular: true,
      icon: "🩺",
      color: "from-blue-500 to-cyan-400"
    },
    { 
      name: "Vaccination", 
      description: "Core and non-core vaccines to protect your pet from common diseases.", 
      price: "$25-45",
      features: ["Customized vaccination schedule", "DHPP/FVRCP for dogs and cats", "Rabies vaccination", "Vaccination certificate"],
      popular: false,
      icon: "💉",
      color: "from-green-500 to-teal-400"
    },
    { 
      name: "Dental Cleaning", 
      description: "Professional dental care including cleaning, polishing, and examination under anesthesia.", 
      price: "$150",
      features: ["Full dental radiographs", "Scaling and polishing", "Fluoride treatment", "Extractions if needed (additional cost)"],
      popular: false,
      icon: "🦷",
      color: "from-purple-500 to-indigo-400"
    },
    { 
      name: "Surgery", 
      description: "Various surgical procedures including spay/neuter, tumor removal, and orthopedic procedures.", 
      price: "Varies",
      features: ["Pre-surgical blood work", "Anesthesia monitoring", "Pain management", "Post-op care instructions"],
      popular: false,
      icon: "🔪",
      color: "from-red-500 to-pink-400"
    },
    { 
      name: "Laboratory Testing", 
      description: "Comprehensive blood work, urinalysis, and other diagnostic testing.", 
      price: "$75-200",
      features: ["Complete blood count", "Chemistry panels", "Thyroid testing", "Rapid results"],
      popular: false,
      icon: "🧪",
      color: "from-amber-500 to-yellow-400"
    },
    { 
      name: "Microchipping", 
      description: "Permanent pet identification with registration to national database.", 
      price: "$45",
      features: ["Lifetime registration", "Quick, painless procedure", "Universal scanner detection", "Peace of mind"],
      popular: false,
      icon: "📡",
      color: "from-blue-600 to-violet-500"
    },
    { 
      name: "Grooming", 
      description: "Professional grooming services including bathing, haircuts, and nail trims.", 
      price: "$40-80",
      features: ["Breed-specific styling", "Ear cleaning", "Nail trimming", "Anal gland expression"],
      popular: true,
      icon: "✂️",
      color: "from-pink-500 to-rose-400"
    },
    { 
      name: "Boarding", 
      description: "Safe, comfortable overnight care for your pet while you're away.", 
      price: "$30/night",
      features: ["Climate-controlled facilities", "Regular exercise", "Medication administration", "Veterinary supervision"],
      popular: false,
      icon: "🏠",
      color: "from-emerald-500 to-green-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-blue-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.5),rgba(255,255,255,0.8))] -z-10"></div>
        
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <Link to="/" className="inline-flex items-center text-blue-600 mb-6 transition-all hover:text-blue-800 hover:translate-x-[-5px] duration-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-600 border-blue-200 bg-blue-50">Our Expert Care</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Professional Veterinary Services
            </h1>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              At Fluffy Care Vet, we provide comprehensive veterinary services designed to keep your pets healthy and happy throughout every stage of life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 flex flex-col items-center text-center transform transition duration-300 hover:shadow-md hover:-translate-y-1 animate-slide-in">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Convenient Scheduling</h3>
              <p className="text-gray-600">Easy online booking available 24/7 with flexible appointment times to fit your schedule.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 flex flex-col items-center text-center transform transition duration-300 hover:shadow-md hover:-translate-y-1 animate-slide-in" style={{animationDelay: "0.1s"}}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Veterinary Care</h3>
              <p className="text-gray-600">Our team of experienced veterinarians specializes in comprehensive pet healthcare.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 flex flex-col items-center text-center transform transition duration-300 hover:shadow-md hover:-translate-y-1 animate-slide-in" style={{animationDelay: "0.2s"}}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Efficient Service</h3>
              <p className="text-gray-600">We value your time with minimal wait times and streamlined appointment processes.</p>
            </div>
          </div>
          
          <div className="mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Service Packages</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {petServices.slice(0, 6).map((service, index) => (
                <Card key={service.name} className="overflow-hidden border-0 shadow-lg transform transition duration-300 hover:shadow-xl hover:-translate-y-1 animate-scale-in" style={{animationDelay: `${index * 0.05}s`}}>
                  <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="text-4xl mb-2">{service.icon}</div>
                      {service.popular && (
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">Popular</Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <CardDescription className="text-gray-600">{service.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 min-h-[60px]">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 flex items-center justify-center gap-2">
                      Book Now
                      <ArrowRight size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mb-12 overflow-hidden rounded-xl shadow-lg animate-fade-in">
            <div className="bg-white p-8">
              <h2 className="text-2xl font-bold mb-6">Complete Services List</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <Table>
                  <TableHeader className="bg-blue-50">
                    <TableRow>
                      <TableHead className="font-semibold text-blue-800">Service</TableHead>
                      <TableHead className="font-semibold text-blue-800">Description</TableHead>
                      <TableHead className="text-right font-semibold text-blue-800">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {petServices.map((service, idx) => (
                      <TableRow key={service.name} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <TableCell className="font-medium">{service.name}</TableCell>
                        <TableCell>{service.description}</TableCell>
                        <TableCell className="text-right">{service.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-xl text-white shadow-lg mb-8 animate-fade-in">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to book an appointment?</h3>
              <p className="text-blue-100">Schedule a visit for your pet today and experience our premium care</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link to="/book-appointment">Book Appointment</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20">
                <Link to="/">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
