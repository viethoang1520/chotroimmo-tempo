import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import ProductGrid from "./product/ProductGrid";

const Home = () => {
  // Mock data for featured products
  const featuredProducts = [
    {
      id: 1,
      title: "Premium MMO Account",
      price: 299000,
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
      rating: 4.5,
      seller: "GameMaster",
      category: "Accounts",
    },
    {
      id: 2,
      title: "Auto Farming Software",
      price: 499000,
      image:
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&q=80",
      rating: 4.8,
      seller: "DevPro",
      category: "Software",
    },
    {
      id: 3,
      title: "Game Currency Package",
      price: 199000,
      image:
        "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=400&q=80",
      rating: 4.2,
      seller: "CoinMaster",
      category: "Currency",
    },
    {
      id: 4,
      title: "MMO Strategy Guide",
      price: 99000,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
      rating: 4.7,
      seller: "ProGamer",
      category: "Guides",
    },
  ];

  // Mock data for categories
  const categories = [
    { name: "Accounts", count: 120, icon: "🎮" },
    { name: "Software", count: 85, icon: "💻" },
    { name: "Currency", count: 210, icon: "💰" },
    { name: "Items", count: 175, icon: "🎁" },
    { name: "Guides", count: 65, icon: "📚" },
    { name: "Services", count: 95, icon: "🛠️" },
  ];

  // Mock statistics
  const statistics = {
    customers: 15000,
    transactions: 45000,
    products: 2500,
    satisfaction: 98,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Menu className="h-6 w-6 md:hidden" />
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">ChoTroiMMO</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium">
              Products
            </Link>
            <Link to="/categories" className="text-sm font-medium">
              Categories
            </Link>
            <Link to="/about" className="text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex w-full max-w-sm items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8 md:w-[300px] rounded-full bg-muted"
              />
            </div>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  3
                </span>
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button className="hidden md:flex">Sign In</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Your One-Stop MMO Marketplace
              </h1>
              <p className="max-w-[600px] text-muted-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Buy and sell MMO accounts, software, currency, and services with
                secure transactions and verified sellers.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Browse Products
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20"
                >
                  Become a Seller
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] aspect-video overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
                alt="MMO Gaming"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
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

      {/* Featured Products Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Featured Products
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Check out our most popular MMO products and services
              </p>
            </div>
          </div>
          <Tabs defaultValue="all" className="mt-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="accounts">Accounts</TabsTrigger>
                <TabsTrigger value="software">Software</TabsTrigger>
                <TabsTrigger value="currency">Currency</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-6">
              <ProductGrid products={featuredProducts} />
            </TabsContent>
            <TabsContent value="accounts" className="mt-6">
              <ProductGrid
                products={featuredProducts.filter(
                  (p) => p.category === "Accounts",
                )}
              />
            </TabsContent>
            <TabsContent value="software" className="mt-6">
              <ProductGrid
                products={featuredProducts.filter(
                  (p) => p.category === "Software",
                )}
              />
            </TabsContent>
            <TabsContent value="currency" className="mt-6">
              <ProductGrid
                products={featuredProducts.filter(
                  (p) => p.category === "Currency",
                )}
              />
            </TabsContent>
            <TabsContent value="guides" className="mt-6">
              <ProductGrid
                products={featuredProducts.filter(
                  (p) => p.category === "Guides",
                )}
              />
            </TabsContent>
          </Tabs>
          <div className="flex justify-center mt-8">
            <Button size="lg" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 border-t">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Marketplace in Numbers
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of satisfied users on ChoTroiMMO
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold">
                {statistics.customers.toLocaleString()}+
              </h3>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold">
                {statistics.transactions.toLocaleString()}+
              </h3>
              <p className="text-muted-foreground">Successful Transactions</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold">
                {statistics.products.toLocaleString()}+
              </h3>
              <p className="text-muted-foreground">Products Available</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold">{statistics.satisfaction}%</h3>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                What Our Users Say
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our satisfied customers and sellers
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Testimonial 1 */}
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1"
                      alt="User"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-sm text-muted-foreground">Customer</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "I've been using ChoTroiMMO for over a year now. The service
                  is excellent, and the products are always as described. Highly
                  recommended!"
                </p>
              </CardContent>
            </Card>
            {/* Testimonial 2 */}
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user2"
                      alt="User"
                    />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">Seller</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "As a seller, I appreciate how easy it is to list products and
                  manage transactions. The platform is intuitive and the support
                  team is always helpful."
                </p>
              </CardContent>
            </Card>
            {/* Testimonial 3 */}
            <Card className="bg-background">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user3"
                      alt="User"
                    />
                    <AvatarFallback>RJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Robert Johnson</p>
                    <p className="text-sm text-muted-foreground">Customer</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  "The security measures on ChoTroiMMO give me peace of mind
                  when making purchases. I've never had any issues with
                  transactions or product delivery."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join ChoTroiMMO today and discover the best MMO products and
                services
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="secondary">
                Sign Up Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground"
              >
                Become a Seller
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 md:py-24 lg:py-12 border-t">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">ChoTroiMMO</h3>
              <p className="text-sm text-muted-foreground">
                Your trusted marketplace for MMO services and products since
                2023.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Products</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Accounts
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Software
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Currency
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Items
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Guides
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="#" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Press
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-foreground">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2023 ChoTroiMMO. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              Made with ❤️ in Vietnam
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
