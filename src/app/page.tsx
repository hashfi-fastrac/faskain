"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getAllCatalogProducts } from "@/lib/api";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getAllCatalogProducts();
        const shuffled = products.sort(() => 0.5 - Math.random());
        setFeaturedProducts(shuffled.slice(0, 6));
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Fast Checkout",
      description: "Quick & easy purchase process",
      gradient: "bg-primary",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Your data is protected",
      gradient: "bg-primary",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your order quickly",
      gradient: "bg-primary",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Gojek Style */}
      <section className="relative overflow-hidden -mt-16 pt-16 md:-mt-16 md:pt-16 bg-gradient-to-br from-primary/5 via-background to-emerald-500/5 dark:from-primary/10 dark:via-background dark:to-emerald-500/10">
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px]" />

        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="px-4 py-2 text-sm gradient-gojek text-white border-0 gojek-shadow">
              Premium Quality Products
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Belanja Mudah, <span className="gradient-text">Cepat</span>
              <br className="hidden md:block" />& Terpercaya
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Temukan koleksi premium fabric dan tekstil berkualitas tinggi dengan harga
              terbaik. Proses checkout yang mudah dan pengiriman cepat.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
              <Button
                size="lg"
                className="h-12 px-8 text-base gradient-gojek text-white hover:opacity-90 gojek-shadow transition-all hover:scale-105"
                asChild
              >
                <Link href="/products">
                  Lihat Produk
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base border-2 hover:bg-primary/5 hover:border-primary transition-all"
                asChild
              >
                <Link href="/login">Masuk</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 fill-background">
            <path d="M0,64 C360,16 720,96 1440,64 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Features Section - Card Style Gojek */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 gojek-shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-emerald-500/5 dark:from-primary/10 dark:to-emerald-500/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                100+
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Produk Berkualitas
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                24/7
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Customer Support
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                Fast
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Pengiriman Cepat
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Produk Pilihan</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Koleksi terbaik yang dipilih khusus untuk Anda
              </p>
            </div>
            <Button
              variant="ghost"
              asChild
              className="hidden md:flex hover:bg-primary/10 hover:text-primary"
            >
              <Link href="/products">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Button asChild className="gradient-gojek text-white hover:opacity-90">
              <Link href="/products">
                Lihat Semua Produk
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-gojek text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Siap untuk Belanja?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Dapatkan produk berkualitas dengan harga terbaik. Proses checkout mudah dan
              pengiriman cepat ke seluruh Indonesia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 bg-white text-primary hover:bg-white/90 font-semibold"
                asChild
              >
                <Link href="/products">
                  Mulai Belanja
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
