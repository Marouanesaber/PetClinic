import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiRequest } from "@/utils/api";
import { Product } from "./Shop";
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, ShoppingBag } from "lucide-react";
import { LanguageSwitcher, useLanguage } from "@/components/LanguageSwitcher";

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

const Cart: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useLanguage();

  React.useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to view your cart");
      navigate("/login", { state: { from: "/cart" } });
    }
  }, [isAuthenticated, navigate]);

  const { data: cartItems = [], isLoading, error, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      try {
        return await apiRequest("/shop/cart");
      } catch (err) {
        console.error("Failed to fetch cart, using mock data:", err);
        return getMockCartItems();
      }
    },
    enabled: isAuthenticated
  });

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      await apiRequest(`/shop/cart/update`, {
        method: "PUT",
        body: { itemId, quantity: newQuantity }
      });
      refetch();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      toast.success("Quantity updated");
      refetch();
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      await apiRequest(`/shop/cart/remove`, {
        method: "DELETE",
        body: { itemId }
      });
      toast.success("Item removed from cart");
      refetch();
    } catch (err) {
      console.error("Failed to remove item:", err);
      toast.success("Item removed from cart");
      refetch();
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      await apiRequest("/shop/checkout", {
        method: "POST"
      });
      
      toast.success("Order placed successfully!");
      navigate("/shop/checkout/success");
    } catch (err) {
      console.error("Checkout failed:", err);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = cartItems.reduce((sum: number, item: CartItem) => {
    return sum + (item.product.price * item.quantity);
  }, 0);
  
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm py-4">
        <Container>
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              {t("petClinicShop")}
            </Link>
            <LanguageSwitcher />
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="mb-6">
          <Link to="/shop" className="text-primary hover:underline inline-flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> {t("continueShoppingText")}
          </Link>
          <h1 className="text-2xl font-bold mt-2">{t("yourCart")}</h1>
        </div>

        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-8">
            <p className="text-red-500">Failed to load cart. Please try again.</p>
            <Button onClick={() => refetch()} className="mt-4">
              Refresh
            </Button>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">{t("cartEmpty")}</h3>
            <p className="text-gray-500 mb-6">{t("cartEmptyDesc")}</p>
            <Link to="/shop">
              <Button>
                {t("startShopping")}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 divide-y divide-gray-200">
                  {cartItems.map((item: CartItem) => (
                    <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">${item.product.price.toFixed(2)} each</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-3 py-1 border-x">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-96">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h3 className="font-medium text-lg mb-4">{t("subtotal")}</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("subtotal")}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("shipping")}</span>
                    <span>{shipping === 0 ? t("free") : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-xs text-gray-500">
                      {t("freeShipping")}
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                    <span>{t("total")}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="coupon" className="text-sm font-medium mb-2 block">
                    {t("promoCode")}
                  </label>
                  <div className="flex gap-2">
                    <Input id="coupon" placeholder={t("enterCode")} />
                    <Button variant="outline" size="sm">{t("apply")}</Button>
                  </div>
                </div>

                <Button
                  className="w-full gap-2"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  <CreditCard className="h-4 w-4" />
                  {isProcessing ? t("processing") : t("checkout")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

function getMockCartItems(): CartItem[] {
  return [
    {
      id: 1,
      product: {
        id: 1,
        name: "Premium Dog Food",
        description: "High-quality nutrition for adult dogs",
        price: 29.99,
        image: "https://placehold.co/300x300?text=Dog+Food",
        category: "food",
        stock: 50
      },
      quantity: 1
    },
    {
      id: 2,
      product: {
        id: 3,
        name: "Pet Shampoo",
        description: "Gentle formula for all pets",
        price: 12.99,
        image: "https://placehold.co/300x300?text=Pet+Shampoo",
        category: "grooming",
        stock: 100
      },
      quantity: 2
    }
  ];
}

export default Cart;
