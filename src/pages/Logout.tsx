
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Logout = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => navigate("/"), 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        <div className="rounded-full bg-blue-100 p-6 mx-auto w-32 h-32 flex items-center justify-center">
          <LogOut className="h-16 w-16 text-blue-600 animate-fade-in" />
        </div>
        
        <h1 className="text-3xl font-bold mt-8 animate-fade-in [animation-delay:200ms]">
          You've Been Signed Out
        </h1>
        
        <p className="text-gray-600 mt-2 max-w-sm mx-auto animate-fade-in [animation-delay:300ms]">
          Thank you for using PetClinic. We hope to see you again soon!
        </p>
        
        <div className="animate-fade-in [animation-delay:400ms] flex justify-center">
          <div className="relative">
            <svg className="animate-spin-slow" viewBox="0 0 100 100" width="120" height="120">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#dbeafe"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 * (1 - countdown / 5)}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold text-blue-600">{countdown}</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 animate-fade-in [animation-delay:500ms]">
          Redirecting to home page in {countdown} seconds...
        </p>
        
        <div className="space-y-3 pt-4 animate-fade-in [animation-delay:600ms]">
          <Button
            onClick={() => navigate("/")}
            className="w-full gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Home Page Now
          </Button>
          
          <Button
            onClick={() => navigate("/login")}
            variant="outline"
            className="w-full gap-2"
          >
            Sign in Again
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Logout;
