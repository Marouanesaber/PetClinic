
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/AuthProvider";
import { apiRequest } from "@/utils/api";
import { useLanguage } from "@/components/LanguageSwitcher";
import { emitEvent } from "@/utils/eventBus";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddedToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddedToCart }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const { t } = useLanguage();

  const handleViewDetails = () => {
    navigate(`/shop/product/${product.id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click from triggering

    if (!isAuthenticated) {
      toast.error(t('loginToAddToCart'));
      navigate('/login', { state: { from: '/shop' } });
      return;
    }

    if (product.stock <= 0) {
      toast.error(t('productOutOfStock'));
      return;
    }

    setIsAdding(true);
    try {
      await apiRequest('/shop/cart/add', {
        method: 'POST',
        body: {
          productId: product.id,
          quantity: 1
        }
      });
      
      toast.success(t('addedToCart'));
      
      // Emit event to update cart
      emitEvent('cart-updated');
      
      // Call the callback if provided
      if (onAddedToCart) {
        onAddedToCart();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(t('errorAddingToCart'));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer h-full flex flex-col"
      onClick={handleViewDetails}
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105" 
        />
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-medium px-3 py-1 bg-red-500 rounded-full text-sm">
              {t('outOfStock')}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-end justify-between mt-auto pt-2">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
              className="h-8 w-8 p-0"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">{t('viewDetails')}</span>
            </Button>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              disabled={isAdding || product.stock <= 0}
              className="h-8 w-8 p-0"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">{t('addToCart')}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
