import React from "react";
import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPopup = ({ isOpen, onClose }: CartPopupProps) => {
  // Mock cart data
  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "Premium WoW Account",
      price: 299.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&q=80",
    },
    {
      id: "2",
      name: "Gold Farming Bot",
      price: 49.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=100&q=80",
    },
  ];

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Cart panel */}
      <div className="relative w-full max-w-md bg-background shadow-lg animate-in slide-in-from-right">
        <div className="flex h-full max-h-screen flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="font-medium">Shopping Cart ({totalItems})</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto py-2">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-2 px-4 py-8 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground">
                    Add items to your cart to see them here.
                  </p>
                </div>
                <Button onClick={onClose} className="mt-4" variant="outline">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4 px-4 py-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between space-x-4 border-b pb-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-4">
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="space-y-2">
                <Button className="w-full">Checkout</Button>
                <Button variant="outline" className="w-full" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
