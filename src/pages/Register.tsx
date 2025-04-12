import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { AuthAnimation } from "@/components/auth/AuthAnimation";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageSwitcher";
import { useAuth } from "@/components/AuthProvider";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    if (!agreedToTerms) {
      toast.error("You must agree to the terms and conditions!");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(name, email, password);
      
      if (success) {
        setShowSuccessAnimation(true);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err: any) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 relative overflow-hidden">
      <img 
        src="/lovable-uploads/53e5364f-8c3a-4ab4-a79a-201ef7f981b4.png" 
        alt="Dog Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-20 -z-10"
      />
      {!animationComplete && <AuthAnimation isLogin={false} />}
      {showSuccessAnimation && <AuthAnimation isSuccess={true} />}
      
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="w-full max-w-md animate-fade-in [animation-delay:200ms]">
          <Card className="shadow-lg border-0">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
              <CardDescription>
                Enter your details to register
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleRegister}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">FULL NAME</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
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
                <div className="space-y-2">
                  <Label htmlFor="password">PASSWORD</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">CONFIRM PASSWORD</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 transition-all duration-300 border-gray-300 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm"
                  >
                    I agree to the{" "}
                    <button 
                      type="button"
                      className="text-blue-500 hover:underline"
                      onClick={() => setIsTermsOpen(true)}
                    >
                      Terms and Conditions
                    </button>
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                  disabled={isLoading || !agreedToTerms}
                >
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
                <div className="text-center text-sm mt-2">
                  <span>Already have an account? </span>
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Log In
                  </Link>
                </div>
                <Link to="/" className="text-center text-sm text-blue-500 hover:underline flex items-center justify-center mt-4">
                  <ArrowLeft className="mr-1 h-4 w-4" /> 
                  Back to website
                </Link>
              </CardFooter>
            </form>
          </Card>
        </div>
      </motion.div>

      <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>PetClinic Terms and Conditions</DialogTitle>
            <DialogDescription>
              Last updated: June 2023
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <h3 className="font-bold">1. ACCEPTANCE OF TERMS</h3>
            <p>By accessing and using PetClinic's services, you agree to be bound by these Terms and Conditions, our Privacy Policy, and any other policies or guidelines referenced herein.</p>
            
            <h3 className="font-bold">2. SERVICES</h3>
            <p>PetClinic provides pet healthcare services, including but not limited to consultations, vaccinations, treatments, surgeries, and laboratory tests. All services are subject to availability and professional judgment of our veterinary staff.</p>
            
            <h3 className="font-bold">3. APPOINTMENTS</h3>
            <p>Appointments must be scheduled in advance. A cancellation fee may apply for appointments canceled with less than 24 hours' notice.</p>
            
            <h3 className="font-bold">4. PAYMENT</h3>
            <p>Payment is due at the time services are rendered. We accept cash, credit cards, and approved pet insurance plans.</p>
            
            <h3 className="font-bold">5. PET RECORDS</h3>
            <p>You agree to provide accurate information about your pet's health history. PetClinic maintains electronic records of all visits, treatments, and prescriptions.</p>
            
            <h3 className="font-bold">6. EMERGENCY SERVICES</h3>
            <p>In case of emergency, PetClinic will make reasonable efforts to provide care based on the urgency of the situation and available resources.</p>
            
            <h3 className="font-bold">7. LIABILITY</h3>
            <p>PetClinic strives to provide the highest standard of care but cannot guarantee outcomes. By accepting these terms, you acknowledge that there are inherent risks in medical treatments.</p>
            
            <h3 className="font-bold">8. PRIVACY</h3>
            <p>Your personal information and your pet's health information will be handled in accordance with our Privacy Policy.</p>
            
            <h3 className="font-bold">9. CHANGES TO TERMS</h3>
            <p>PetClinic reserves the right to modify these terms at any time. Continued use of our services following any changes constitutes your acceptance of the revised terms.</p>
            
            <h3 className="font-bold">10. GOVERNING LAW</h3>
            <p>These Terms and Conditions are governed by the laws of the jurisdiction in which PetClinic operates.</p>
            
            <p className="text-sm text-muted-foreground mt-6">By using PetClinic's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => {
              setIsTermsOpen(false);
              setAgreedToTerms(true);
            }}>
              I Agree
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;
