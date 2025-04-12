
import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Dog Owner",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "PetClinic is all you can ask for. The perfect fit for all your pet care needs! The staff is incredibly knowledgeable and caring.",
    rating: 5,
    petType: "Golden Retriever"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Cat Owner",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "I've been taking my cats to PetClinic for years. The veterinarians are thorough, gentle, and really understand feline behavior. Highly recommended!",
    rating: 5,
    petType: "Siamese Cat"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Multiple Pet Owner",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    quote: "As someone with both dogs and exotic pets, finding a clinic that handles all of them well is rare. PetClinic exceeds expectations every time.",
    rating: 4,
    petType: "Various Pets"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Rabbit Owner",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    quote: "When my rabbit needed emergency care, the staff at PetClinic were calm, professional, and saved her life. I can't thank them enough.",
    rating: 5,
    petType: "Dutch Rabbit"
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Dog Breeder",
    avatar: "https://randomuser.me/api/portraits/men/95.jpg",
    quote: "The reproductive healthcare services at PetClinic are top-notch. They've helped me maintain healthy bloodlines in my breeding program.",
    rating: 5,
    petType: "Labrador Breeder"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const nextTestimonial = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-blue-600 font-medium text-center mb-4">Testimonials</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-4">What Our Clients Say</h3>
          <p className="max-w-2xl mx-auto text-gray-600">
            More than 200 happy customers have trusted us with their beloved pets, and here's what they have to say about their experience.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-10 -left-10 text-blue-200 opacity-30">
            <Quote size={80} />
          </div>
          
          <div className="relative z-10 bg-white p-8 rounded-xl shadow-xl transition-all duration-500 transform hover:shadow-2xl">
            <div className={`transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].name} 
                    className="w-16 h-16 rounded-full border-2 border-blue-200"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-500 text-sm">{testimonials[activeIndex].role}</p>
                    <p className="text-blue-600 text-xs">{testimonials[activeIndex].petType}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-lg italic mb-4">
                "{testimonials[activeIndex].quote}"
              </p>
            </div>
            
            <div className="flex justify-between items-center mt-8">
              <div className="flex space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeIndex === idx ? 'bg-blue-600 w-6' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-10 w-10"
                  onClick={prevTestimonial}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full h-10 w-10"
                  onClick={nextTestimonial}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial, idx) => (
            idx !== activeIndex && (
              <div 
                key={testimonial.id} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  "{testimonial.quote.substring(0, 120)}..."
                </p>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
