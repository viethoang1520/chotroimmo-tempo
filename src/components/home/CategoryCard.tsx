import React from "react";
import { Link } from "react-router-dom";
import { Category } from "@/types/category";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { name, count, icon, image } = category;

  return (
    <Link to={`/category/${name.toLowerCase()}`} className="block h-full">
      <Card className="h-full transition-all hover:shadow-md border-opacity-40">
        <CardHeader className="pb-2">
          {image ? (
            <div className="w-full aspect-square overflow-hidden rounded-lg mb-3">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : icon ? (
            <div className="text-4xl mb-2">{icon}</div>
          ) : null}
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {count} {count === 1 ? "sản phẩm" : "sản phẩm"}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
