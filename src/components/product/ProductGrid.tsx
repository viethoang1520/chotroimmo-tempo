import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import { Search, Filter, X } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  rating: number;
  seller: string;
  category: string;
}

interface ProductGridProps {
  products?: Product[];
  title?: string;
  showFilters?: boolean;
}

const ProductGrid = ({
  products = defaultProducts,
  title = "Featured Products",
  showFilters = true,
}: ProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSeller, setSelectedSeller] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Extract unique categories and sellers for filter dropdowns
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];
  const sellers = [
    "all",
    ...new Set(products.map((product) => product.seller)),
  ];

  // Filter products based on search term and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSeller =
      selectedSeller === "all" || product.seller === selectedSeller;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesSeller && matchesPrice;
  });

  // Add a filter tag
  const addFilter = (type: string, value: string) => {
    if (value !== "all" && !activeFilters.includes(`${type}:${value}`)) {
      setActiveFilters([...activeFilters, `${type}:${value}`]);
    }
  };

  // Remove a filter tag
  const removeFilter = (filter: string) => {
    const newFilters = activeFilters.filter((f) => f !== filter);
    setActiveFilters(newFilters);

    // Reset the corresponding filter
    const [type, value] = filter.split(":");
    if (type === "category") setSelectedCategory("all");
    if (type === "seller") setSelectedSeller("all");
    if (type === "price") setPriceRange([0, 1000]);
  };

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value !== "all") {
      addFilter("category", value);
    } else {
      const categoryFilter = activeFilters.find((f) =>
        f.startsWith("category:"),
      );
      if (categoryFilter) removeFilter(categoryFilter);
    }
  };

  // Handle seller change
  const handleSellerChange = (value: string) => {
    setSelectedSeller(value);
    if (value !== "all") {
      addFilter("seller", value);
    } else {
      const sellerFilter = activeFilters.find((f) => f.startsWith("seller:"));
      if (sellerFilter) removeFilter(sellerFilter);
    }
  };

  // Handle price range change
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    const priceFilter = activeFilters.find((f) => f.startsWith("price:"));
    if (priceFilter) removeFilter(priceFilter);
    addFilter("price", `$${value[0]}-$${value[1]}`);
  };

  return (
    <div className="w-full bg-white p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

        {showFilters && (
          <div className="space-y-4">
            {/* Search and filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="w-full md:w-auto">
                  <Select
                    value={selectedCategory}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full md:w-auto">
                  <Select
                    value={selectedSeller}
                    onValueChange={handleSellerChange}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Seller" />
                    </SelectTrigger>
                    <SelectContent>
                      {sellers.map((seller) => (
                        <SelectItem key={seller} value={seller}>
                          {seller === "all" ? "All Sellers" : seller}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>More Filters</span>
                </Button>
              </div>
            </div>

            {/* Price range slider */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Price Range</span>
                <span className="text-sm text-muted-foreground">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="py-4"
              />
            </div>

            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium">Active Filters:</span>
                {activeFilters.map((filter) => {
                  const [type, value] = filter.split(":");
                  return (
                    <Badge
                      key={filter}
                      variant="outline"
                      className="flex items-center gap-1 px-2 py-1"
                    >
                      <span>
                        {type}: {value}
                      </span>
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeFilter(filter)}
                      />
                    </Badge>
                  );
                })}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setActiveFilters([]);
                    setSelectedCategory("all");
                    setSelectedSeller("all");
                    setPriceRange([0, 1000]);
                  }}
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">No products found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedSeller("all");
              setPriceRange([0, 1000]);
              setActiveFilters([]);
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

// Default mock products data
const defaultProducts: Product[] = [
  {
    id: "1",
    title: "Premium SEO Software",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
    rating: 4.5,
    seller: "SEO Master",
    category: "software",
  },
  {
    id: "2",
    title: "Social Media Management Tool",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80",
    rating: 4.2,
    seller: "Digital Marketing Pro",
    category: "software",
  },
  {
    id: "3",
    title: "Email Marketing Platform",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80",
    rating: 4.0,
    seller: "Email Guru",
    category: "software",
  },
  {
    id: "4",
    title: "Content Creation Suite",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=500&q=80",
    rating: 4.7,
    seller: "Content Creator",
    category: "software",
  },
  {
    id: "5",
    title: "Premium Gaming Account",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80",
    rating: 4.8,
    seller: "Game Master",
    category: "account",
  },
  {
    id: "6",
    title: "Streaming Platform Account",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80",
    rating: 3.9,
    seller: "Stream Pro",
    category: "account",
  },
  {
    id: "7",
    title: "Analytics Dashboard Tool",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    rating: 4.6,
    seller: "Data Expert",
    category: "software",
  },
  {
    id: "8",
    title: "Premium Stock Trading Account",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80",
    rating: 4.4,
    seller: "Finance Pro",
    category: "account",
  },
];

export default ProductGrid;
