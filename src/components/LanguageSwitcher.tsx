
import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { translations } from "@/utils/translations";

// Define TranslationKey type
export type TranslationKey = keyof typeof translations.en;

// Language type
export type Language = "en" | "es" | "fr" | "de" | "zh";

// Create a context for language
interface LanguageContextType {
  language: Language;
  t: (key: TranslationKey) => string;
  changeLanguage: (newLanguage: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  t: (key) => String(key),
  changeLanguage: () => {},
});

// Language provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "es", "fr", "de", "zh"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    document.documentElement.lang = newLanguage;
  };

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use the language context
export function useLanguage() {
  return useContext(LanguageContext);
}

// Language switcher component
export function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Globe className="h-4 w-4" />
          <span>{
            language === "en" ? "English" : 
            language === "es" ? "Español" :
            language === "fr" ? "Français" : 
            language === "de" ? "Deutsch" :
            "中文"
          }</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          <span className={language === "en" ? "font-bold" : ""}>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("es")}>
          <span className={language === "es" ? "font-bold" : ""}>Español</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("fr")}>
          <span className={language === "fr" ? "font-bold" : ""}>Français</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("de")}>
          <span className={language === "de" ? "font-bold" : ""}>Deutsch</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("zh")}>
          <span className={language === "zh" ? "font-bold" : ""}>中文</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
