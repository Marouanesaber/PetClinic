
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section className="py-16 px-6 bg-white border-t">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-blue-600 font-medium mb-2">Address</h3>
            <h4 className="text-2xl font-bold mb-6">If you need to find us:</h4>
            
            <h3 className="font-bold mb-2">Stay connected</h3>
            <p className="text-gray-600 mb-6">Stay connected with OutstandenVet - we are available for your requests at all times.</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:+33746808745" className="text-gray-700 hover:text-blue-600">+33 746 80 8745</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <a href="mailto:info@outstandenvet.com" className="text-gray-700 hover:text-blue-600">info@outstandenvet.com</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700">Krakow, Poland</span>
              </div>
            </div>
            
            <h3 className="font-bold mb-3">Drop us a line</h3>
            <p className="text-gray-600 mb-6">
              If you have any query or suggestion, we are open to learning from you! Let's talk, mail us anytime.
            </p>
          </div>
          
          <div>
            <form className="space-y-4">
              <div>
                <Input placeholder="Name" className="w-full" />
              </div>
              <div>
                <Input placeholder="Email" type="email" className="w-full" />
              </div>
              <div>
                <textarea 
                  placeholder="Message" 
                  className="w-full rounded-md border border-input bg-background min-h-[120px] px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                ></textarea>
              </div>
              <Button className="w-full bg-blue-600">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
