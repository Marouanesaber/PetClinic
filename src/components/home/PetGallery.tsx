
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const pets = [
  {
    id: 1,
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    description: "Friendly and active Golden Retriever who loves playing fetch."
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    description: "Elegant Siamese cat who enjoys sitting by the window and watching birds."
  },
  {
    id: 3,
    name: "Buddy",
    type: "Dog",
    breed: "Beagle",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Energetic Beagle with a great nose for adventure."
  },
  {
    id: 4,
    name: "Misty",
    type: "Cat",
    breed: "Persian",
    image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    description: "Fluffy Persian cat who loves to be pampered."
  },
  {
    id: 5,
    name: "Rocky",
    type: "Dog",
    breed: "Husky",
    image: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGh1c2t5fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    description: "Majestic Husky with striking blue eyes and a playful personality."
  },
  {
    id: 6,
    name: "Whiskers",
    type: "Rabbit",
    breed: "Holland Lop",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFiYml0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    description: "Cute Holland Lop rabbit with floppy ears and a gentle temperament."
  }
];

const PetGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [activeIndex, isAutoPlaying]);

  const nextSlide = () => {
    setDirection("right");
    setActiveIndex((prevIndex) => (prevIndex + 1) % pets.length);
  };

  const prevSlide = () => {
    setDirection("left");
    setActiveIndex((prevIndex) => (prevIndex - 1 + pets.length) % pets.length);
  };

  return (
    <section className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Meet Our Lovely Pets</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take a look at some of the adorable animals we've had the pleasure of caring for at PetClinic.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg h-[500px]"
             onMouseEnter={() => setIsAutoPlaying(false)}
             onMouseLeave={() => setIsAutoPlaying(true)}>
          {/* Navigation buttons */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full z-10 hover:bg-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full z-10 hover:bg-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          {/* Slides */}
          <div className="h-full">
            {pets.map((pet, index) => (
              <div
                key={pet.id}
                className={`absolute inset-0 transition-all duration-500 transform ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0"
                    : index < activeIndex || (index === pets.length - 1 && activeIndex === 0)
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold">{pet.name}</h3>
                  <p className="text-sm opacity-90">{pet.type} • {pet.breed}</p>
                  <p className="mt-2">{pet.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {pets.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "bg-white w-4" : "bg-white/50"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetGallery;
