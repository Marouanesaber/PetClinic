
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function TechnicianCallToAction() {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6 bg-blue-50">
      <div className="container mx-auto text-center max-w-3xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Schedule a Visit?</h2>
        <p className="text-lg text-gray-700 mb-8">
          Our veterinary professionals are available to provide excellent care for your pets.
        </p>
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 font-medium py-2 px-6 rounded-full"
          onClick={() => navigate("/book-appointment")}
        >
          Book an Appointment Today
        </Button>
      </div>
    </section>
  );
}
