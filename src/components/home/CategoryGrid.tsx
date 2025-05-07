import React from "react";
import CategoryCard from "./CategoryCard";
import { Category } from "@/types/category";

interface CategoryGridProps {
  categories: Category[];
  className?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories = defaultCategories,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 ${className}`}
    >
      {categories.map((category) => (
        <CategoryCard key={category.name} category={category} />
      ))}
    </div>
  );
};

// Default categories for testing purposes
const defaultCategories: Category[] = [
  {
    name: "Accounts",
    count: 120,
    icon: "🎮",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
  },
  {
    name: "Software",
    count: 85,
    icon: "💻",
    image:
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&q=80",
  },
  {
    name: "Currency",
    count: 210,
    icon: "💰",
    image:
      "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&q=80",
  },
  {
    name: "Items",
    count: 175,
    icon: "🎁",
    image:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80",
  },
  {
    name: "Guides",
    count: 65,
    icon: "📚",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
  },
  {
    name: "Services",
    count: 95,
    icon: "🛠️",
    image:
      "https://images.unsplash.com/photo-1560415755-bd80d06eda60?w=400&q=80",
  },
];

export default CategoryGrid;
