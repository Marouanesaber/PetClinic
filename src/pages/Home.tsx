
import React from "react";
import { Navigation } from "@/components/home/Navigation";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
import PetGallery from "@/components/home/PetGallery";
import Footer from "@/components/home/Footer";
import AppointmentStats from "@/components/home/AppointmentStats";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <AppointmentStats />
      </div>
      <ServicesSection />
      <PetGallery />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
