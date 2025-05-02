import React from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartPopup from "@/components/cart/CartPopup";

interface MainLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    role: "admin" | "collaborator" | "customer" | "guest";
    avatar?: string;
  };
}

const MainLayout = ({ children, user = null }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const categories = [
    { name: "Software", href: "/category/software" },
    { name: "Accounts", href: "/category/accounts" },
    { name: "Services", href: "/category/services" },
    { name: "Tutorials", href: "/category/tutorials" },
  ];

  const footerLinks = [
    { title: "About Us", href: "/about" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Contact", href: "/contact" },
    { title: "FAQ", href: "/faq" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Cart Popup */}
      <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">ChoTroiMMO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:flex w-full max-w-sm items-center space-x-2 mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative"
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                2
              </span>
            </button>

            {user ? (
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                <div className="flex flex-col space-y-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">Menu</span>
                  </div>

                  {/* Mobile Search */}
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full pl-8"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.href}
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Auth Buttons */}
                  {!user && (
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" asChild>
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button asChild>
                        <Link to="/register">Register</Link>
                      </Button>
                    </div>
                  )}

                  {user && (
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {user.role}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Company Info */}
            <div>
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-primary">
                  ChoTroiMMO
                </span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Your trusted marketplace for MMO services, software, and online
                accounts.
              </p>
              <div className="mt-4 flex space-x-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold">Resources</h3>
                <ul className="mt-4 space-y-2">
                  {footerLinks.slice(0, 3).map((link) => (
                    <li key={link.title}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold">Support</h3>
                <ul className="mt-4 space-y-2">
                  {footerLinks.slice(3).map((link) => (
                    <li key={link.title}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold">Contact Us</h3>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="text-sm text-muted-foreground">
                    Email: support@chotroimmo.com
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-sm text-muted-foreground">
                    Phone: +84 123 456 789
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-sm text-muted-foreground">
                    Hours: 24/7 Support
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <p className="text-center text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ChoTroiMMO. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
