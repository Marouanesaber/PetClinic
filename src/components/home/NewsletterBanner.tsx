
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NewsletterBanner = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully subscribed to the newsletter!");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 flex justify-center z-30">
      <div className="container max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold">
          Join <span className="text-blue-600">PetClinic</span> Today
        </h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input 
            placeholder="Email" 
            className="w-full sm:w-48" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Button 
            className="bg-blue-600 whitespace-nowrap"
            onClick={handleSubscribe}
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterBanner;
