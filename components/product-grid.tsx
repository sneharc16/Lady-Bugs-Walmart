"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { motion } from "framer-motion"
import { Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  isOrganic?: boolean
  isBpaFree?: boolean
  isRecyclable?: boolean
  carbonFootprint?: string
  expiresIn?: number
  sustainabilityScore?: number
}

interface ProductGridProps {
  sustainableMode: boolean
  darkMode: boolean
  onAddToCart: (product: Product) => void
  onEcoDelivery: () => void
  onRecipeClick: () => void
  onEarnPoints: (points: number) => void
  isAuthenticated: boolean
}

export function ProductGrid({
  sustainableMode,
  darkMode,
  onAddToCart,
  onEcoDelivery,
  onRecipeClick,
  onEarnPoints,
  isAuthenticated,
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  const products: Product[] = [
    {
      id: 1,
      name: sustainableMode ? "Organic Bananas (BPA-Free Packaging)" : "Fresh Bananas",
      price: sustainableMode ? 3.99 : 2.99,
      originalPrice: sustainableMode ? undefined : 3.49,
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&bg=white",
      category: "fruits",
      rating: 4.5,
      reviews: 128,
      inStock: true,
      isOrganic: sustainableMode,
      isBpaFree: sustainableMode,
      isRecyclable: sustainableMode,
      carbonFootprint: sustainableMode ? "Low" : undefined,
      expiresIn: 3,
      sustainabilityScore: sustainableMode ? 95 : 60,
    },
    {
      id: 2,
      name: sustainableMode ? "Stainless Steel Water Bottle (BPA-Free)" : "Plastic Water Bottle",
      price: sustainableMode ? 24.99 : 1.99,
      image: sustainableMode
        ? "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&bg=white"
        : "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop&bg=white",
      category: "beverages",
      rating: sustainableMode ? 4.8 : 4.2,
      reviews: sustainableMode ? 89 : 245,
      inStock: true,
      isOrganic: false,
      isBpaFree: sustainableMode,
      isRecyclable: true,
      carbonFootprint: sustainableMode ? "Very Low" : "High",
      sustainabilityScore: sustainableMode ? 98 : 25,
    },
    {
      id: 3,
      name: sustainableMode ? "Organic Greek Yogurt (Glass Container)" : "Greek Yogurt",
      price: sustainableMode ? 5.99 : 4.49,
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop&bg=white",
      category: "dairy",
      rating: 4.6,
      reviews: 156,
      inStock: true,
      isOrganic: sustainableMode,
      isBpaFree: sustainableMode,
      isRecyclable: sustainableMode,
      carbonFootprint: sustainableMode ? "Medium" : undefined,
      expiresIn: 5,
      sustainabilityScore: sustainableMode ? 88 : 55,
    },
    {
      id: 4,
      name: sustainableMode ? "Bamboo Toothbrush Set (Biodegradable)" : "Plastic Toothbrush",
      price: sustainableMode ? 12.99 : 3.99,
      image: sustainableMode
        ? "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop&bg=white"
        : "https://plasticmakers.org/wp-content/uploads/2022/07/c4b6a97918f683f09d5ffb73c81a51a47d39619c-4267x2727-1-scaled.jpg",
      category: "personal-care",
      rating: sustainableMode ? 4.7 : 4.1,
      reviews: sustainableMode ? 67 : 189,
      inStock: true,
      isOrganic: false,
      isBpaFree: sustainableMode,
      isRecyclable: sustainableMode,
      carbonFootprint: sustainableMode ? "Very Low" : "Medium",
      sustainabilityScore: sustainableMode ? 96 : 30,
    },
    {
      id: 5,
      name: sustainableMode ? "Organic Whole Grain Bread (Compostable Wrap)" : "White Bread",
      price: sustainableMode ? 4.99 : 2.99,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop&bg=white",
      category: "bakery",
      rating: 4.4,
      reviews: 203,
      inStock: true,
      isOrganic: sustainableMode,
      isBpaFree: sustainableMode,
      isRecyclable: sustainableMode,
      carbonFootprint: sustainableMode ? "Low" : undefined,
      expiresIn: 4,
      sustainabilityScore: sustainableMode ? 85 : 45,
    },
    {
      id: 6,
      name: sustainableMode ? "Eco-Friendly Cleaning Spray (Refillable)" : "All-Purpose Cleaner",
      price: sustainableMode ? 8.99 : 4.99,
      image: sustainableMode
        ? "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop&bg=white"
        : "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&bg=white",
      category: "household",
      rating: sustainableMode ? 4.9 : 4.3,
      reviews: sustainableMode ? 45 : 167,
      inStock: true,
      isOrganic: sustainableMode,
      isBpaFree: sustainableMode,
      isRecyclable: sustainableMode,
      carbonFootprint: sustainableMode ? "Very Low" : "High",
      sustainabilityScore: sustainableMode ? 94 : 35,
    },
    {
      id: 7,
      name: sustainableMode ? "Organic Cotton T-Shirt (Fair Trade)" : "Cotton T-Shirt",
      price: sustainableMode ? 24.99 : 15.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&bg=white",
      category: "clothing",
      rating: 4.5,
      reviews: 89,
      inStock: true,
      isOrganic: sustainableMode,
      isBpaFree: false,
      isRecyclable: sustainableMode,
      carbonFootprint: sustainableMode ? "Low" : "Medium",
      sustainabilityScore: sustainableMode ? 92 : 50,
    },
    {
      id: 8,
      name: sustainableMode ? "Organic Apples (Local Farm)" : "Red Apples",
      price: sustainableMode ? 4.99 : 3.49,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&bg=white",
      category: "fruits",
      rating: 4.7,
      reviews: 234,
      inStock: true,
      isOrganic: sustainableMode,
      isBpaFree: sustainableMode,
      isRecyclable: sustainableMode,
      carbonFootprint: sustainableMode ? "Very Low" : "Low",
      expiresIn: 7,
      sustainabilityScore: sustainableMode ? 93 : 65,
    },
  ]

  const categories = [
    { id: "all", name: "All Products", count: products.length },
    { id: "fruits", name: "Fruits", count: products.filter((p) => p.category === "fruits").length },
    { id: "dairy", name: "Dairy", count: products.filter((p) => p.category === "dairy").length },
    { id: "beverages", name: "Beverages", count: products.filter((p) => p.category === "beverages").length },
    {
      id: "personal-care",
      name: "Personal Care",
      count: products.filter((p) => p.category === "personal-care").length,
    },
    { id: "bakery", name: "Bakery", count: products.filter((p) => p.category === "bakery").length },
    { id: "household", name: "Household", count: products.filter((p) => p.category === "household").length },
    { id: "clothing", name: "Clothing", count: products.filter((p) => p.category === "clothing").length },
  ]

  const filteredProducts = products.filter(
    (product) => selectedCategory === "all" || product.category === selectedCategory,
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "sustainability":
        return (b.sustainabilityScore || 0) - (a.sustainabilityScore || 0)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? sustainableMode
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                  : ""
              }`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="h-4 w-4" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`px-3 py-2 rounded-lg border text-sm ${
              darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            {sustainableMode && <option value="sustainability">Most Sustainable</option>}
          </select>
        </div>
      </div>

      {/* Sustainability Mode Banner */}
      {sustainableMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-4 rounded-xl border border-green-200 dark:border-green-700"
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🌱</div>
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">Sustainable Mode Active</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Showing eco-friendly products with BPA-free, organic, and recyclable certifications
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Products Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard
              product={product}
              sustainableMode={sustainableMode}
              darkMode={darkMode}
              onAddToCart={onAddToCart}
              onEcoDelivery={onEcoDelivery}
              onRecipeClick={onRecipeClick}
              onEarnPoints={onEarnPoints}
              isAuthenticated={isAuthenticated}
            />
          </motion.div>
        ))}
      </motion.div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  )
}
