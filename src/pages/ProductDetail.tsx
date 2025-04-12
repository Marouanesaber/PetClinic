
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/utils/api';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Plus, Minus, ShoppingCart, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';
import { Navigation } from '@/components/home/Navigation';
import Footer from '@/components/home/Footer';
import { useLanguage } from '@/components/LanguageSwitcher';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  sku?: string;
  weight?: string;
  dimensions?: string;
}

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { t } = useLanguage();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      try {
        return await apiRequest(`/shop/products/${productId}`);
      } catch (err) {
        console.error("Failed to fetch product, using mock data:", err);
        return getMockProduct(Number(productId));
      }
    }
  });

  const handleQuantityChange = (change: number) => {
    const newValue = quantity + change;
    if (newValue >= 1 && (!product?.stock || newValue <= product.stock)) {
      setQuantity(newValue);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error(t('loginToAddToCart'));
      navigate('/login', { state: { from: `/shop/product/${productId}` } });
      return;
    }

    setIsAdding(true);
    try {
      await apiRequest('/shop/cart/add', {
        method: 'POST',
        body: {
          productId: Number(productId),
          quantity
        }
      });
      
      toast.success(t('addedToCart'));
      
      // Force a reload of cart data
      window.dispatchEvent(new CustomEvent('cart-updated'));
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(t('errorAddingToCart'));
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navigation />
        <Container className="py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg aspect-square"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mt-6"></div>
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navigation />
        <Container className="py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">{t('productNotFound')}</h2>
          <p className="text-gray-500 mb-8">{t('productNotFoundDesc')}</p>
          <Link to="/shop">
            <Button>{t('backToShop')}</Button>
          </Link>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container className="py-8">
        <Link to="/shop" className="text-primary hover:underline inline-flex items-center mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> {t('backToShop')}
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain aspect-square"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="text-lg font-semibold text-primary mb-4">${product.price.toFixed(2)}</div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{t('category')}</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{t('availability')}</span>
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? t('inStock') : t('outOfStock')}
                </span>
              </div>
              {product.sku && (
                <div className="flex justify-between">
                  <span className="text-gray-600">SKU:</span>
                  <span>{product.sku}</span>
                </div>
              )}
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-6">
              <div className="flex items-center">
                <span className="text-gray-600 mr-4">{t('quantity')}</span>
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-1 border-x">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={product.stock && quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="w-full gap-2"
                size="lg"
                disabled={isAdding || product.stock <= 0}
              >
                {isAdding ? (
                  <>
                    <Check className="h-5 w-5 animate-bounce" />
                    {t('adding')}
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    {t('addToCart')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">{t('productDetails')}</h2>
          <Separator className="mb-6" />
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">{t('description')}</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {(product.weight || product.dimensions) && (
              <div>
                <h3 className="text-lg font-semibold mb-2">{t('specifications')}</h3>
                <ul className="space-y-2 text-gray-600">
                  {product.weight && (
                    <li><span className="font-medium">{t('weight')}:</span> {product.weight}</li>
                  )}
                  {product.dimensions && (
                    <li><span className="font-medium">{t('dimensions')}:</span> {product.dimensions}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

function getMockProduct(id: number): Product {
  return {
    id,
    name: "Premium Pet Food",
    description: "High-quality nutrition for your beloved pet. Made with natural ingredients and essential nutrients to keep your pet healthy and happy.",
    price: 29.99,
    image: `https://placehold.co/600x600?text=Product+${id}`,
    category: "Food",
    stock: 50,
    sku: `PF-${id}00${id}`,
    weight: "5 kg",
    dimensions: "30 × 20 × 10 cm"
  };
}

export default ProductDetail;
