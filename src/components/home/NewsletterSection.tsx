
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NewsletterSection = () => {
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
    <section className="py-16 px-6 bg-gray-100">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center relative">
          <div className="absolute right-5 top-5">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1998/1998627.png" 
              alt="Pet illustration" 
              className="w-16 h-16"
            />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Join <span className="text-blue-600">PetClinic</span> Today
          </h2>
          <div className="flex gap-2 mt-4">
            <Input 
              placeholder="Email" 
              className="flex-grow"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <Button 
              className="bg-blue-600"
              onClick={handleSubscribe}
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Read veterinary services in news, only at PetClinic
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
