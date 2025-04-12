import React, { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Navigation } from "@/components/home/Navigation";
import Footer from "@/components/home/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/utils/api";
import { toast } from "sonner";
import { LanguageSwitcher, useLanguage } from "@/components/LanguageSwitcher";
import { emitEvent } from "@/utils/eventBus";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface Category {
  name: string;
  products: Product[];
}

const getMockProducts = (): Product[] => {
  return [
    {
      id: 1,
      name: "Premium Dog Food",
      description: "High-quality nutrition for adult dogs",
      price: 29.99,
      image: "https://placehold.co/300x300?text=Dog+Food",
      category: "food",
      stock: 50
    },
    {
      id: 2,
      name: "Cat Litter Box",
      description: "Spacious and easy to clean",
      price: 19.99,
      image: "https://placehold.co/300x300?text=Litter+Box",
      category: "housing",
      stock: 25
    },
    {
      id: 3,
      name: "Pet Shampoo",
      description: "Gentle formula for all pets",
      price: 12.99,
      image: "https://placehold.co/300x300?text=Pet+Shampoo",
      category: "grooming",
      stock: 100
    },
    {
      id: 4,
      name: "Dog Chew Toy",
      description: "Durable rubber toy for dogs",
      price: 8.99,
      image: "https://placehold.co/300x300?text=Chew+Toy",
      category: "toys",
      stock: 75
    },
    {
      id: 5,
      name: "Cat Scratching Post",
      description: "Sisal-covered post for cats",
      price: 24.99,
      image: "https://placehold.co/300x300?text=Scratching+Post",
      category: "toys",
      stock: 30
    },
    {
      id: 6,
      name: "Flea & Tick Treatment",
      description: "Monthly treatment for pets",
      price: 35.99,
      image: "https://placehold.co/300x300?text=Flea+Treatment",
      category: "health",
      stock: 60
    }
  ];
};

const Shop = () => {
  const { t } = useLanguage();
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const data = await apiRequest('/shop/products');
        return data;
      } catch (err) {
        console.error("Failed to fetch products, using mock data:", err);
        return getMockProducts();
      }
    }
  });

  const getProductsByCategory = () => {
    if (!products) return [];
    
    const categories: Record<string, Category> = {};
    
    products.forEach((product: Product) => {
      const category = product.category.toLowerCase();
      
      if (!categories[category]) {
        categories[category] = {
          name: product.category,
          products: []
        };
      }
      
      categories[category].products.push(product);
    });
    
    return Object.values(categories);
  };

  const handleAddedToCart = () => {
    emitEvent('cart-updated');
  };

  useEffect(() => {
    const cleanupFn = window.addEventListener('cart-updated', handleAddedToCart);
    
    return () => {
      window.removeEventListener('cart-updated', handleAddedToCart);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 animate-fade-in">
        <div className="bg-gray-50 py-8">
          <Container>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">{t('petShop')}</h1>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">{t('home')}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/shop">{t('shop')}</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
              <LanguageSwitcher />
            </div>
          </Container>
        </div>
        
        <Container className="py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-4 h-72">
                  <div className="bg-gray-200 w-full h-40 rounded-md mb-4"></div>
                  <div className="bg-gray-200 h-5 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('somethingWentWrong')}</h2>
              <p className="text-gray-600 mb-6">{t('couldNotLoadProducts')}</p>
              {toast.error(t('errorLoadingProducts'))}
            </div>
          ) : (
            <div className="space-y-16">
              <section>
                <h2 className="text-2xl font-bold mb-4">Pet Goods</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Add cards for pet goods */}
                </div>
              </section>
              <section className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Pet Medicines</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Add cards for pet medicines */}
                </div>
              </section>
              {getProductsByCategory().map((category) => (
                <div key={category.name} className="space-y-4">
                  <h2 className="text-2xl font-bold capitalize">{category.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddedToCart={handleAddedToCart}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default Shop;
