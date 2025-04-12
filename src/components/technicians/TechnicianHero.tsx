
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function TechnicianHero() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-6">
      <div className="container mx-auto text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-600 animate-fade-in">
          Meet Our Veterinary Team
        </h1>
        <p className="text-lg text-gray-700 mb-8 animate-fade-in [animation-delay:200ms]">
          Our highly skilled veterinarians and technicians are dedicated to providing the best possible care for your beloved pets.
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in [animation-delay:400ms]">
          <Button 
            className="bg-blue-600" 
            onClick={() => navigate("/book-appointment")}
          >
            Book an Appointment
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/services")}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
