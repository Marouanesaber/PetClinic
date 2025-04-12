
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, MapPin, Phone, Mail, Clock, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible."
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.5),rgba(255,255,255,0.8))] -z-10"></div>
        
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <Link to="/" className="inline-flex items-center text-blue-600 mb-8 transition-all hover:text-blue-800 hover:translate-x-[-5px] duration-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-blue-600 border-blue-200 bg-blue-50">Get In Touch</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Have questions or need to schedule an appointment? Reach out to our team and we'll be happy to assist you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="animate-slide-in">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Your Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    placeholder="john@example.com" 
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Appointment request" 
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700">Message</Label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?" 
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm min-h-[150px] transition-all duration-300 focus:ring-2 focus:ring-blue-500 hover:border-blue-400 focus:outline-none"
                    required
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
            
            <div className="space-y-8 animate-slide-in" style={{animationDelay: "0.2s"}}>
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="mt-0.5">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Our Location</h3>
                        <p className="text-gray-600 text-sm">123 Pet Care Drive</p>
                        <p className="text-gray-600 text-sm">San Francisco, CA 94158</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-purple-50">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="mt-0.5">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Phone className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Phone Number</h3>
                        <p className="text-gray-600 text-sm">Main: (555) 123-4567</p>
                        <p className="text-gray-600 text-sm">Emergency: (555) 987-6543</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-green-50">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="mt-0.5">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Email Address</h3>
                        <p className="text-gray-600 text-sm">info@fluffycare.com</p>
                        <p className="text-gray-600 text-sm">support@fluffycare.com</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-amber-50">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="mt-0.5">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">Business Hours</h3>
                        <p className="text-gray-600 text-sm">Mon-Fri: 8:00 AM - 6:00 PM</p>
                        <p className="text-gray-600 text-sm">Sat: 9:00 AM - 4:00 PM</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 animate-fade-in" style={{animationDelay: "0.4s"}}>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-lg">What to Expect</h3>
                </div>
                
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-blue-600 text-sm">1.</span>
                    <span>Our team will respond to your inquiry within 24 hours.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-blue-600 text-sm">2.</span>
                    <span>We'll provide detailed information about our services and answer your questions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-blue-600 text-sm">3.</span>
                    <span>If you're scheduling an appointment, we'll help find a time that works for you.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-blue-600 text-sm">4.</span>
                    <span>For emergencies, please call our emergency line directly.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-xl h-[400px] mb-12 animate-fade-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017951795!3d37.75781499657369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1655841525818!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              title="Fluffy Care Vet Location"
            ></iframe>
          </div>
          
          <div className="text-center mb-8 animate-fade-in">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <Link to="/book-appointment">Book an Appointment</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
