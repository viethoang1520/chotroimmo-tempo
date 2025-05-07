import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Eye } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  seller: string;
  category: string;
  inStock: boolean;
  description?: string;
  views?: number;
  purchases?: number;
  preOrderAmount?: number;
  onAddToCart?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  title = "Premium MMO Account",
  price = 99.99,
  image = "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
  rating = 4.5,
  seller = "TopSeller",
  category = "Accounts",
  inStock = true,
  description = "Tài khoản MMO cao cấp với nhiều tính năng đặc biệt và quyền lợi độc quyền cho người dùng.",
  views = 120,
  purchases = 24,
  preOrderAmount = 0,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) => {
  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(id);
  };

  const handleViewDetails = () => {
    if (onViewDetails) onViewDetails(id);
  };

  return (
    <Card className="w-full max-w-[280px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white rounded-xl shadow-sm">
      <div className="relative">
        <img src={image} alt={title} className="h-40 w-full object-cover" />
        <Badge
          variant={inStock ? "default" : "destructive"}
          className="absolute top-2 right-2"
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </Badge>
        <Badge variant="secondary" className="absolute top-2 left-2">
          {category}
        </Badge>
        {preOrderAmount > 0 && (
          <Badge
            variant="outline"
            className="absolute bottom-2 right-2 bg-amber-100 text-amber-800 border-amber-300"
          >
            Đã lăng cọc: {preOrderAmount.toLocaleString()}đ
          </Badge>
        )}
      </div>

      <CardHeader className="p-4 pb-0">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm ml-1">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">by {seller}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-2">
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <p className="text-xl font-bold text-primary">${price.toFixed(2)}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <div className="flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            <span>{views.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <ShoppingCart className="h-3 w-3 mr-1" />
            <span>{purchases.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleViewDetails}
        >
          <Eye className="h-4 w-4 mr-1" />
          Details
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
