
// Data for the technicians page
export const technicianData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chief Veterinarian",
    speciality: "Surgery, Internal Medicine",
    experience: "15+ years",
    education: "DVM, Cornell University",
    bio: "Dr. Johnson is our senior veterinarian with extensive experience in small animal surgery and internal medicine. She has a special interest in cardiology and orthopedic procedures.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    email: "sarah.johnson@petclinic.com",
    phone: "+1 (555) 123-4567",
    linkedin: "sarahjohnson",
    availability: "Monday-Thursday"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Veterinarian",
    speciality: "Dermatology, Nutrition",
    experience: "8 years",
    education: "DVM, University of California",
    bio: "Dr. Chen specializes in veterinary dermatology and nutrition. He has helped countless pets overcome allergies, skin conditions, and dietary challenges with his innovative treatment approaches.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    email: "michael.chen@petclinic.com",
    phone: "+1 (555) 234-5678",
    linkedin: "michaelchen",
    availability: "Tuesday-Saturday"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Veterinarian",
    speciality: "Exotic Pets, Avian Medicine",
    experience: "10 years",
    education: "DVM, Colorado State University",
    bio: "Dr. Rodriguez is our exotic animal specialist, with extensive training in the care of birds, reptiles, amphibians, and small mammals. She's passionate about educating pet owners on proper care for these unique companions.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    email: "emily.rodriguez@petclinic.com",
    phone: "+1 (555) 345-6789",
    linkedin: "emilyrodriguez",
    availability: "Monday, Wednesday, Friday"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    role: "Veterinary Dentist",
    speciality: "Dental Surgery, Oral Health",
    experience: "12 years",
    education: "DVM, University of Pennsylvania",
    bio: "Dr. Wilson is our dental specialist, focusing exclusively on pet oral health. From routine cleanings to complex dental surgeries, he's dedicated to ensuring your pet's mouth stays healthy and pain-free.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    email: "james.wilson@petclinic.com",
    phone: "+1 (555) 456-7890",
    linkedin: "jameswilson",
    availability: "Thursday-Sunday"
  }
];

export type Technician = typeof technicianData[0];
