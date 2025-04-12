
import React from "react";
import { Navigation } from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import { TechnicianHero } from "@/components/technicians/TechnicianHero";
import { TechnicianGrid } from "@/components/technicians/TechnicianGrid";
import { TechnicianCallToAction } from "@/components/technicians/TechnicianCallToAction";

const Technicians = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow pt-24 animate-fade-in">
        <TechnicianHero />
        <TechnicianGrid />
        <TechnicianCallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Technicians;
