
import React from "react";
import { TechnicianCard } from "./TechnicianCard";
import { technicianData } from "./TechnicianData";
import { Container } from "@/components/ui/container";

export function TechnicianGrid() {
  return (
    <section className="py-16 px-6 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technicianData.map((tech, index) => (
            <TechnicianCard 
              key={tech.id} 
              technician={tech} 
              index={index} 
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
