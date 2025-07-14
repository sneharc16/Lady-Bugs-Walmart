"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, X, Filter, Star, Leaf, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface SearchModalProps {
  onClose: () => void
  darkMode: boolean
}

export function SearchModal({ onClose, darkMode }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState(0)
  const [searchResults, setSearchResults] = useState([])

  const categories = [
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "clothing", name: "Clothing", icon: "👕" },
    { id: "home", name: "Home & Garden", icon: "🏠" },
    { id: "food", name: "Food & Grocery", icon: "🍎" },
    { id: "beauty", name: "Beauty", icon: "💄" },
    { id: "sports", name: "Sports", icon: "⚽" },
  ]

  const mockResults = [
    {
      id: 1,
      name: "Eco-Friendly Bamboo Phone Case",
      price: 24.99,
      rating: 4.8,
      image: "/placeholder.svg",
      category: "electronics",
      sustainable: true,
      inStock: true,
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 35.0,
      rating: 4.6,
      image: "/placeholder.svg",
      category: "clothing",
      sustainable: true,
      inStock: true,
    },
    {
      id: 3,
      name: "Solar-Powered Garden Lights",
      price: 89.99,
      rating: 4.9,
      image: "/placeholder.svg",
      category: "home",
      sustainable: true,
      inStock: false,
    },
  ]

  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate search with delay
      const timer = setTimeout(() => {
        setSearchResults(
          mockResults.filter(
            (item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.category.includes(searchQuery.toLowerCase()),
          ),
        )
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: -50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: -50 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-4xl mt-8 rounded-2xl shadow-2xl ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>🔍 Search Products</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={darkMode ? "text-gray-400 hover:text-white" : ""}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 h-12 text-lg ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`${darkMode ? "border-gray-600 text-gray-300 hover:bg-gray-700" : ""}`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              {(selectedCategories.length > 0 || selectedRating > 0) && (
                <Badge className="ml-2 bg-blue-500">{selectedCategories.length + (selectedRating > 0 ? 1 : 0)}</Badge>
              )}
            </Button>

            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {searchResults.length} results found
            </p>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`p-6 border-b ${darkMode ? "border-gray-700 bg-gray-900/50" : "border-gray-200 bg-gray-50"}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Categories */}
              <div>
                <h3 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCategory(category.id)}
                      className={`w-full justify-start ${
                        darkMode && !selectedCategories.includes(category.id)
                          ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                          : ""
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>Price Range</h3>
                <div className="space-y-4">
                  <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="w-full" />
                  <div className="flex items-center justify-between text-sm">
                    <span className={darkMode ? "text-gray-400" : "text-gray-600"}>${priceRange[0]}</span>
                    <span className={darkMode ? "text-gray-400" : "text-gray-600"}>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>Minimum Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <Button
                      key={rating}
                      variant={selectedRating === rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                      className={`w-full justify-start ${
                        darkMode && selectedRating !== rating ? "border-gray-600 text-gray-300 hover:bg-gray-700" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        {Array.from({ length: rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-2">& up</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {searchQuery.length <= 2 ? (
            <div className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Start typing to search products...</p>
              <p className="text-sm mt-2">Try searching for "bamboo", "organic", or "solar"</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              <p className="text-lg">No products found</p>
              <p className="text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`hover:shadow-lg transition-shadow ${darkMode ? "bg-gray-700 border-gray-600" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-600 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-4xl">📦</span>
                      </div>

                      <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-lg font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}>
                          ${product.price}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className={`text-sm ml-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {product.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {product.sustainable && (
                            <Badge className="bg-green-500 text-white">
                              <Leaf className="w-3 h-3 mr-1" />
                              Eco
                            </Badge>
                          )}
                          {product.inStock ? (
                            <Badge className="bg-blue-500 text-white">In Stock</Badge>
                          ) : (
                            <Badge className="bg-red-500 text-white">
                              <Clock className="w-3 h-3 mr-1" />
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
