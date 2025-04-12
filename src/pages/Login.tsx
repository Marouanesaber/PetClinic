import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { AuthAnimation } from "@/components/auth/AuthAnimation";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageSwitcher";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const from = location.state?.from?.pathname || "/";
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError("");
    
    try {
      const success = await login(email, password);
      
      if (success) {
        setShowSuccessAnimation(true);
        toast.success(t("loginSuccessful"));
        setTimeout(() => {
          navigate(from || '/');
        }, 1000);
      }
    } catch (err: any) {
      setError(err.message || t("loginFailedMessage"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simulate animation completion
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
      {!animationComplete && <AuthAnimation isLogin={true} />}
      {showSuccessAnimation && <AuthAnimation isSuccess={true} />}
      
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card>
          <CardHeader className="space-y-1">
            <h4 className="text-xl font-semibold">{t('login')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('enterCredentials')}
            </p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <form onSubmit={handleLogin}>
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('enterEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2 mt-2">
                <Label htmlFor="password">{t('password')}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('enterPassword')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? t('loggingIn') : t('login')}
              </Button>
            </form>
            <div className="text-sm text-muted-foreground">
              {t('dontHaveAccount')}{" "}
              <Link to="/register" className="text-primary hover:underline">
                {t('signUp')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
