import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset process
    setTimeout(() => {
      setIsLoading(false);
      
      if (email) {
        setResetSent(true);
        
        // Show success toast
        toast.success("Password reset link sent to your email", {
          duration: 3000,
          className: "animate-slide-in-right"
        });
      } else {
        toast.error("Please enter a valid email");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img 
          src="/lovable-uploads/53e5364f-8c3a-4ab4-a79a-201ef7f981b4.png" 
          alt="Dog with sunglasses" 
          className="w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold mb-2 animate-fade-in [animation-delay:200ms]">PetClinic</h1>
          <p className="text-xl animate-fade-in [animation-delay:400ms]">Caring for your pets' health</p>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in [animation-delay:200ms]">
          <Card className="shadow-lg border-0">
            {!resetSent ? (
              <>
                <CardHeader className="space-y-1 text-center">
                  <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
                  <CardDescription>
                    Enter your email address and we'll send you a link to reset your password
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleResetPassword}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">EMAIL ADDRESS</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                    <div className="flex justify-between w-full text-center text-sm mt-2">
                      <Link to="/login" className="text-blue-500 hover:underline flex items-center">
                        <ArrowLeft className="mr-1 h-4 w-4" /> 
                        Back to Login
                      </Link>
                      <Link to="/" className="text-blue-500 hover:underline">
                        Back to Website
                      </Link>
                    </div>
                  </CardFooter>
                </form>
              </>
            ) : (
              <>
                <CardHeader className="space-y-1 text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <CardTitle className="text-3xl font-bold">Check Your Email</CardTitle>
                  <CardDescription>
                    We've sent a password reset link to {email}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Please check your email inbox and click the link to reset your password. 
                    If you don't see it, please check your spam folder.
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                    onClick={() => navigate("/login")}
                  >
                    Back to Login
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => setResetSent(false)}
                  >
                    Try another email
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
