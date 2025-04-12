
import React from "react";
import { Navigation } from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import { Container } from "@/components/ui/container";
import { AppointmentForm } from "@/components/booking/AppointmentForm";
import { BookingInfoCards } from "@/components/booking/BookingInfoCards";
import { useLanguage } from "@/components/LanguageSwitcher";

const BookAppointment = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="flex-grow pt-24 pb-16 px-4 animate-fade-in">
        <Container className="max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600">{t("bookVetAppointment")}</h1>
            <div className="flex justify-center">
              <p className="text-gray-600 max-w-2xl mx-auto border-b-2 border-blue-200 pb-4">
                {t("scheduleVisit")}
              </p>
            </div>
          </div>
          
          <AppointmentForm />
          
          <BookingInfoCards />
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookAppointment;
