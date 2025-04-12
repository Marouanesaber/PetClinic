
import React, { useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { PetInformationStep } from "./PetInformationStep";
import { ContactDetailsStep } from "./ContactDetailsStep";
import { AppointmentDetailsStep } from "./AppointmentDetailsStep";
import { ConfirmationStep } from "./ConfirmationStep";
import { BookingSteps } from "./BookingSteps";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function AppointmentForm() {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    ownerName: "",
    email: "",
    phone: "",
    appointmentType: "",
    symptoms: "",
    preferredTime: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.petName.trim()) {
      newErrors.petName = "Pet name is required";
    }
    
    if (!formData.petType) {
      newErrors.petType = "Pet type is required";
    }
    
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner's name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else {
      const phoneRegex = /^(\+\d{1,3})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.appointmentType) {
      newErrors.appointmentType = "Appointment type is required";
    }
    
    if (!date) {
      newErrors.date = "Date is required";
    }
    
    if (!formData.preferredTime) {
      newErrors.preferredTime = "Preferred time is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2) {
      isValid = validateStep2();
    } else if (step === 3) {
      isValid = validateStep3();
    }
    
    if (isValid && step < 4) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep3()) return;
    
    setIsSubmitting(true);
    
    localStorage.setItem('appointmentData', JSON.stringify({
      ...formData,
      date: date ? format(date, 'yyyy-MM-dd') : '',
      status: 'pending'
    }));
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4);
      window.scrollTo(0, 0);
      
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const newAppointment = {
        id: `appt-${Date.now()}`,
        petName: formData.petName,
        ownerName: formData.ownerName,
        date: date ? format(date, 'yyyy-MM-dd') : '',
        time: formData.preferredTime,
        type: formData.appointmentType,
        status: 'pending',
        notes: formData.symptoms
      };
      
      localStorage.setItem('appointments', JSON.stringify([...existingAppointments, newAppointment]));
      
    }, 1500);
  };

  return (
    <>
      <BookingSteps currentStep={step} />
      
      <Card className="border shadow-lg animate-fade-in bg-white">
        {step === 1 && (
          <PetInformationStep 
            formData={formData} 
            errors={errors} 
            handleChange={handleChange} 
            nextStep={nextStep} 
          />
        )}
        
        {step === 2 && (
          <ContactDetailsStep 
            formData={formData} 
            errors={errors} 
            handleChange={handleChange} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        )}
        
        {step === 3 && (
          <AppointmentDetailsStep 
            formData={formData}
            date={date}
            setDate={setDate}
            errors={errors}
            handleChange={handleChange}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
        )}
        
        {step === 4 && (
          <ConfirmationStep 
            formData={formData}
            date={date}
          />
        )}
      </Card>
    </>
  );
}
