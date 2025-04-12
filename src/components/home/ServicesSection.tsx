
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ServicesSection = () => {
  return (
    <section className="py-16 px-6 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-blue-600 font-medium mb-4">Services</h2>
        <h3 className="text-3xl font-bold mb-8">Comprehensive Veterinary Care <br />for Your Beloved Pets</h3>
        <p className="text-gray-600 max-w-2xl mb-10">
          At our veterinary hospital, we provide a wide range of veterinarian services, including routine check-ups, vaccinations, surgeries, and more. Additionally, we offer specialized services to ensure the well-being of your pets.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Service 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl">🏥</span>
            </div>
            <h4 className="text-xl font-bold mb-2">Diagnosis and Treatment</h4>
            <p className="text-gray-600 mb-4">Get all the veterinary services you need in one place, quickly and efficiently to ensure the best care of your pets.</p>
            <Link to="/services" className="text-blue-600 text-sm hover:underline">Discover it →</Link>
          </div>
          
          {/* Service 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-xl">🦮</span>
            </div>
            <h4 className="text-xl font-bold mb-2">Comprehensive Solutions</h4>
            <p className="text-gray-600 mb-4">Monitor your pet's health and growth with our comprehensive solutions. We provide everything you need in one place.</p>
            <Link to="/services" className="text-blue-600 text-sm hover:underline">Read More →</Link>
          </div>
          
          {/* Contact Us */}
          <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold mb-4">Need help?</h4>
              <p className="text-gray-600 mb-6">If you have any questions about our services, please don't hesitate to contact us.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/contact-us" className="flex-1">
                <Button variant="outline" className="w-full">Contact Us</Button>
              </Link>
              <Link to="/book-appointment" className="flex-1">
                <Button className="w-full bg-blue-600">Book a Demo</Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Pet Illustration Section */}
        <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-6 mb-16">
          <div className="md:w-1/3">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1998/1998627.png" 
              alt="Cartoon dog with medical items" 
              className="w-40 h-40 md:w-full md:h-auto object-contain"
            />
          </div>
          <div className="md:w-2/3">
            <h4 className="text-gray-500 uppercase text-sm mb-2">REPORTS</h4>
            <h3 className="text-2xl font-bold mb-4">Access Comprehensive Reports</h3>
            <p className="text-gray-600 mb-6">
              With our veterinary care services, you can easily access detailed reports about your pet's health and growth. All the necessary filters are available to make your specific search.
            </p>
            <Link to="/login" className="text-blue-600 hover:underline flex items-center">
              Sign in or Join OutstandenVet Today <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
