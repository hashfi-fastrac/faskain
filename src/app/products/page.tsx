"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllCatalogProducts } from "@/lib/api";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/types";
import { debounce, formatCurrency } from "@/lib/utils";
import { CATEGORIES, SORT_OPTIONS } from "@/constants";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000000;
    return Math.max(...products.map((p) => p.price));
  }, [products]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await getAllCatalogProducts();
        setProducts(data);
        const max = Math.max(...data.map((p) => p.price));
        setPriceRange([0, max]);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query)
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategories, priceRange, minRating, sortBy]);

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setMinRating(0);
    setSortBy("newest");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice ||
    minRating > 0 ||
    sortBy !== "newest";

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    selectedCategories.length +
    (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section with Image - STYLE YANG LAMA */}
      <div className="relative -mt-16 pt-16 ">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background opacity-30" />
            <Image
              src="/hero5.jpg"
              alt="Products Background"
              fill
              className="object-cover object-top opacity-40"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />

            <div className="relative py-16 md:py-20 px-4 md:px-8">
              <div className="max-w-3xl mx-auto text-center space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  Semua Produk
                </h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Temukan produk berkualitas tinggi dengan harga terbaik
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search & Filter Bar */}
        <div className="mb-3 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari produk..."
                defaultValue={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 h-12 text-base rounded-xl border-border/50 focus-visible:ring-primary"
              />
            </div>

            {/* Mobile Filter Button */}
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="md:hidden h-12 px-4 rounded-xl border-border/50 relative"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs gradient-gojek text-white border-2 border-background">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle className="text-xl">Filter & Urutkan</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6 overflow-y-auto h-[calc(90vh-140px)] pb-4">
                  <FilterContent
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    maxPrice={maxPrice}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                </div>
                <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="flex-1 h-12 rounded-xl"
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={() => setShowFilters(false)}
                      className="flex-1 h-12 rounded-xl gradient-gojek text-white"
                    >
                      Terapkan
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Desktop Sort */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="hidden md:flex h-12 px-4 rounded-xl border-border/50 gap-2"
                >
                  <span className="text-sm">
                    {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="end" sideOffset={8}>
                <RadioGroup value={sortBy} onValueChange={setSortBy}>
                  {SORT_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 rounded-lg p-3 hover:bg-secondary/50 cursor-pointer"
                      onClick={() => setSortBy(option.value)}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </PopoverContent>
            </Popover>

            {/* Desktop Filter Button */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="hidden md:flex h-12 px-4 rounded-xl border-border/50 gap-2 relative"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="text-sm">Filter</span>
                  {activeFiltersCount > 0 && (
                    <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs gradient-gojek text-white">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
                <div className="max-h-[43vh] overflow-y-auto p-4">
                  <FilterContent
                    selectedCategories={selectedCategories}
                    toggleCategory={toggleCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    maxPrice={maxPrice}
                    minRating={minRating}
                    setMinRating={setMinRating}
                  />
                </div>
                <div className="p-4 border-t flex gap-2 bg-background">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="flex-1"
                    size="sm"
                  >
                    Reset
                  </Button>
                  <Button className="flex-1 gradient-gojek text-white" size="sm">
                    Terapkan
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Filter aktif:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  Pencarian: &apos;{searchQuery}&apos;
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 hover:text-foreground rounded-full hover:bg-background p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {selectedCategories.map((cat) => (
                <Badge key={cat} variant="secondary" className="gap-1 pr-1">
                  {CATEGORIES.find((c) => c.value === cat)?.label}
                  <button
                    onClick={() => toggleCategory(cat)}
                    className="ml-1 hover:text-foreground rounded-full hover:bg-background p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                  <button
                    onClick={() => setPriceRange([0, maxPrice])}
                    className="ml-1 hover:text-foreground rounded-full hover:bg-background p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {minRating > 0 && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  Rating ≥ {minRating}★
                  <button
                    onClick={() => setMinRating(0)}
                    className="ml-1 hover:text-foreground rounded-full hover:bg-background p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 px-2 text-xs hover:text-primary"
              >
                Hapus semua
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Menampilkan{" "}
            <span className="font-semibold text-foreground">
              {filteredProducts.length}
            </span>{" "}
            produk
          </p>
        </div>

        {/* Products Grid */}
        <ProductGrid products={filteredProducts} isLoading={isLoading} />
      </div>
    </div>
  );
}

function FilterContent({
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  maxPrice,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
}: {
  selectedCategories: string[];
  toggleCategory: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  maxPrice: number;
  minRating: number;
  setMinRating: (rating: number) => void;
  sortBy?: string;
  setSortBy?: (sort: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Sort (Mobile Only) */}
      {sortBy && setSortBy && (
        <>
          <div>
            <h3 className="font-semibold mb-3">Urutkan</h3>
            <RadioGroup value={sortBy} onValueChange={setSortBy}>
              {SORT_OPTIONS.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 rounded-lg p-3 hover:bg-secondary/50"
                >
                  <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                  <Label
                    htmlFor={`sort-${option.value}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Separator />
        </>
      )}

      {/* Category */}
      <div>
        <h3 className="font-semibold mb-3">Kategori</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.value}
              className="flex items-center space-x-3 rounded-lg p-3 hover:bg-secondary/50"
            >
              <Checkbox
                id={cat.value}
                checked={selectedCategories.includes(cat.value)}
                onCheckedChange={() => toggleCategory(cat.value)}
              />
              <Label htmlFor={cat.value} className="flex-1 cursor-pointer">
                {cat.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Rentang Harga</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={maxPrice}
            step={10000}
            className="my-4"
          />
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground mb-1">Min</Label>
              <div className="text-sm font-semibold">{formatCurrency(priceRange[0])}</div>
            </div>
            <div className="text-muted-foreground">-</div>
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground mb-1">Max</Label>
              <div className="text-sm font-semibold">{formatCurrency(priceRange[1])}</div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-3">Rating Minimum</h3>
        <RadioGroup
          value={minRating.toString()}
          onValueChange={(v) => setMinRating(Number(v))}
        >
          {[0, 4, 4.5].map((rating) => (
            <div
              key={rating}
              className="flex items-center space-x-3 rounded-lg p-3 hover:bg-secondary/50"
            >
              <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`} className="flex-1 cursor-pointer">
                {rating === 0 ? "Semua Rating" : `${rating}★ ke atas`}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
