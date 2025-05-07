import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;
