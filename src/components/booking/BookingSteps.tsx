
import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/components/LanguageSwitcher";

interface BookingStepsProps {
  currentStep: number;
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
  const { t } = useLanguage();
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
              currentStep === i ? "border-blue-600 bg-blue-600 text-white" : 
              currentStep > i ? "border-green-500 bg-green-500 text-white" : 
              "border-gray-300 bg-white text-gray-500"
            )}
          >
            {currentStep > i ? <CheckCircle className="h-6 w-6" /> : i}
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
        <div 
          className="absolute top-0 left-0 h-1 bg-blue-600 transition-all" 
          style={{ width: `${(currentStep - 1) * 33.33}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm mt-2">
        <span className={cn("transition-colors duration-300", currentStep >= 1 ? "text-blue-600 font-medium" : "text-gray-500")}>
          {t("petInfo")}
        </span>
        <span className={cn("transition-colors duration-300", currentStep >= 2 ? "text-blue-600 font-medium" : "text-gray-500")}>
          {t("contactDetails")}
        </span>
        <span className={cn("transition-colors duration-300", currentStep >= 3 ? "text-blue-600 font-medium" : "text-gray-500")}>
          {t("appointmentDetails")}
        </span>
        <span className={cn("transition-colors duration-300", currentStep >= 4 ? "text-blue-600 font-medium" : "text-gray-500")}>
          {t("confirmation")}
        </span>
      </div>
    </div>
  );
}
