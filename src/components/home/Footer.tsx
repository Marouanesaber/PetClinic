
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube, PawPrint } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-blue-900 text-white py-16 px-6 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PawPrint className="h-6 w-6 text-blue-300" />
              <h3 className="text-xl font-bold text-white">PetClinic</h3>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Providing the best pet healthcare experience with professional staff and state-of-the-art facilities.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Book Appointment', 'Services', 'Technicians', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-blue-200 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Opening Hours</h4>
            <ul className="space-y-2">
              <li className="flex justify-between text-blue-200">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-blue-200">
                <span>Saturday:</span>
                <span>9:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between text-blue-200">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-blue-200">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>123 Pet Care Street, Veterinary District, 10001</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@petclinic.com</span>
              </li>
              <li className="flex items-center gap-3 text-blue-200">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <span>24/7 Emergency Service</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-6 text-sm text-blue-200 flex flex-col md:flex-row justify-between items-center">
          <div>© {currentYear} PetClinic. All rights reserved.</div>
          <div className="flex gap-4 mt-3 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#f9fafb" className="w-full">
          <path fillOpacity="1" d="M0,64L60,53.3C120,43,240,21,360,32C480,43,600,85,720,90.7C840,96,960,64,1080,53.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
