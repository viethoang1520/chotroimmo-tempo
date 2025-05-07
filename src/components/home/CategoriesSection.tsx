import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Category {
  name: string;
  count: number;
  icon: string;
}

interface CategoriesSectionProps {
  categories?: Category[];
}

const CategoriesSection = ({
  categories = defaultCategories,
}: CategoriesSectionProps) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Browse Categories
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore our wide range of MMO products and services
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {categories.map((category) => (
            <Link
              to={`/category/${category.name.toLowerCase()}`}
              key={category.name}
            >
              <Card className="h-full transition-all hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {category.count} products
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Default categories data
const defaultCategories = [
  { name: "Accounts", count: 120, icon: "🎮" },
  { name: "Software", count: 85, icon: "💻" },
  { name: "Currency", count: 210, icon: "💰" },
  { name: "Items", count: 175, icon: "🎁" },
  { name: "Guides", count: 65, icon: "📚" },
  { name: "Services", count: 95, icon: "🛠️" },
];

export default CategoriesSection;
