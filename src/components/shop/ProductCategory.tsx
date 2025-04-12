
import React from "react";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";
import { Product } from "@/pages/Shop";
import { useLanguage } from "@/components/LanguageSwitcher";

interface ProductCategoryProps {
  name: string;
  products: Product[];
  onAddedToCart?: () => void;
}

export function ProductCategory({ name, products, onAddedToCart }: ProductCategoryProps) {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold capitalize">{name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddedToCart={onAddedToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductCategory;
