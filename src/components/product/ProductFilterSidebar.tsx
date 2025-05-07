import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Filter, X } from "lucide-react";
import { Badge } from "../ui/badge";

export interface FilterValues {
  userEmail: string;
  productName: string;
  priceRange: [number, number];
}

interface ProductFilterSidebarProps {
  onFilterChange: (filters: FilterValues) => void;
  className?: string;
  defaultValues?: FilterValues;
  minPrice?: number;
  maxPrice?: number;
}

const ProductFilterSidebar = ({
  onFilterChange,
  className = "",
  defaultValues = {
    userEmail: "",
    productName: "",
    priceRange: [1000, 20000000],
  },
  minPrice = 1000,
  maxPrice = 20000000,
}: ProductFilterSidebarProps) => {
  const [userEmail, setUserEmail] = useState(defaultValues.userEmail);
  const [productName, setProductName] = useState(defaultValues.productName);
  const [priceRange, setPriceRange] = useState<[number, number]>(
    defaultValues.priceRange,
  );
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Update filters when inputs change
  useEffect(() => {
    const newFilters: FilterValues = {
      userEmail,
      productName,
      priceRange,
    };
    onFilterChange(newFilters);

    // Update active filters
    const newActiveFilters: string[] = [];
    if (userEmail) newActiveFilters.push(`email:${userEmail}`);
    if (productName) newActiveFilters.push(`product:${productName}`);
    if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
      newActiveFilters.push(
        `price:${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()} VND`,
      );
    }
    setActiveFilters(newActiveFilters);
  }, [userEmail, productName, priceRange, onFilterChange, minPrice, maxPrice]);

  // Reset all filters
  const resetFilters = () => {
    setUserEmail("");
    setProductName("");
    setPriceRange([minPrice, maxPrice]);
    setActiveFilters([]);
  };

  // Remove a specific filter
  const removeFilter = (filter: string) => {
    const [type] = filter.split(":");
    if (type === "email") setUserEmail("");
    if (type === "product") setProductName("");
    if (type === "price") setPriceRange([minPrice, maxPrice]);
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Bộ lọc</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          <X className="h-4 w-4 mr-1" /> Xóa lọc
        </Button>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map((filter) => {
            const [type, value] = filter.split(":");
            return (
              <Badge
                key={filter}
                variant="outline"
                className="flex items-center gap-1 px-2 py-1"
              >
                <span>
                  {type === "email"
                    ? "Email"
                    : type === "product"
                      ? "Sản phẩm"
                      : "Giá"}
                  : {value}
                </span>
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeFilter(filter)}
                />
              </Badge>
            );
          })}
        </div>
      )}

      <div className="space-y-6">
        {/* Username/Email filter */}
        <div className="space-y-2">
          <Label htmlFor="userEmail">Username hoặc Email</Label>
          <Input
            id="userEmail"
            placeholder="Nhập username hoặc email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        {/* Product name filter */}
        <div className="space-y-2">
          <Label htmlFor="productName">Tên sản phẩm</Label>
          <Input
            id="productName"
            placeholder="Nhập tên sản phẩm (ví dụ: FIFA)"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        {/* Price range filter */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Khoảng giá</Label>
            <span className="text-sm text-muted-foreground">
              {priceRange[0].toLocaleString()} -{" "}
              {priceRange[1].toLocaleString()} VND
            </span>
          </div>
          <Slider
            defaultValue={[minPrice, maxPrice]}
            value={priceRange}
            min={minPrice}
            max={maxPrice}
            step={1000}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="py-4"
          />
        </div>

        {/* Apply filters button (mobile only) */}
        <Button className="w-full md:hidden" size="sm">
          <Filter className="h-4 w-4 mr-2" /> Áp dụng bộ lọc
        </Button>
      </div>
    </div>
  );
};

export default ProductFilterSidebar;
