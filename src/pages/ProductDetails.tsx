import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Eye, Clock, Package, Youtube } from "lucide-react";
import YouTubeModal from "@/components/ui/YouTubeModal";

interface ProductDetailsProps {
  id?: string;
  title?: string;
  price?: number;
  image?: string;
  rating?: number;
  seller?: string;
  category?: string;
  inStock?: boolean;
  description?: string;
  salesCount?: number;
  viewsCount?: number;
  remainingQuantity?: number;
  videoId?: string;
  onAddToCart?: (id: string) => void;
  onBuyNow?: (id: string) => void;
}

const ProductDetails = ({
  id = "1",
  title = "Premium MMO Account",
  price = 99.99,
  image = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
  rating = 4.5,
  seller = "TopSeller",
  category = "Accounts",
  inStock = true,
  description = "This is a premium MMO account with max level characters, rare items, and exclusive cosmetics. Perfect for players who want to skip the grind and jump straight into endgame content.",
  salesCount = 120,
  viewsCount = 1500,
  remainingQuantity = 5,
  onAddToCart = () => {},
  onBuyNow = () => {},
  videoId = "dQw4w9WgXcQ",
}: ProductDetailsProps) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(id);
  };

  const handleBuyNow = () => {
    onBuyNow(id);
  };

  const handleOpenVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden shadow-md">
          <img src={image} alt={title} className="w-full h-auto object-cover" />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="mb-2">
                {category}
              </Badge>
              <Badge
                variant={inStock ? "default" : "destructive"}
                className="mb-2"
              >
                {inStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-lg">{rating}</span>
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Eye className="h-5 w-5 text-gray-500" />
                <span className="ml-1 text-gray-600">{viewsCount} views</span>
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <ShoppingCart className="h-5 w-5 text-gray-500" />
                <span className="ml-1 text-gray-600">{salesCount} sold</span>
              </div>
            </div>
          </div>

          <div className="text-3xl font-bold text-primary">
            ${price.toFixed(2)}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Package className="h-5 w-5 text-gray-500 mr-2" />
              <span>
                <span className="font-semibold">Remaining:</span>{" "}
                {remainingQuantity} items
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <span>
                <span className="font-semibold">Seller:</span> {seller}
              </span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={handleBuyNow}
              disabled={!inStock}
            >
              Buy Now
            </Button>
          </div>

          <div className="mt-4">
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleOpenVideoModal}
            >
              <Youtube className="h-5 w-5 mr-2" />
              Xem video hướng dẫn
            </Button>
          </div>

          <YouTubeModal
            isOpen={isVideoModalOpen}
            onClose={handleCloseVideoModal}
            videoId={videoId}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
