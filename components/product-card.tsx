"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, Clock, Leaf, Recycle, Award, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

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

interface ProductCardProps {
  product: Product
  sustainableMode: boolean
  darkMode: boolean
  onAddToCart: (product: Product) => void
  onEcoDelivery: () => void
  onRecipeClick: () => void
  onEarnPoints: (points: number) => void
  isAuthenticated: boolean
}

export function ProductCard({
  product,
  sustainableMode,
  darkMode,
  onAddToCart,
  onEcoDelivery,
  onRecipeClick,
  onEarnPoints,
  isAuthenticated,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(product)
    if (sustainableMode && product.sustainabilityScore && product.sustainabilityScore > 80) {
      onEarnPoints(10)
    }
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const getCarbonFootprintColor = (footprint?: string) => {
    switch (footprint) {
      case "Very Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card
        className={`h-full overflow-hidden transition-all duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } ${isHovered ? "shadow-xl" : "shadow-md"}`}
      >
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleWishlist}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </Button>

            {/* Sustainability Score */}
            {sustainableMode && product.sustainabilityScore && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-green-600 text-white">
                  <Leaf className="h-3 w-3 mr-1" />
                  {product.sustainabilityScore}%
                </Badge>
              </div>
            )}

            {/* Expiry Warning */}
            {product.expiresIn && product.expiresIn <= 3 && (
              <div className="absolute bottom-2 left-2">
                <Badge variant="destructive" className="text-xs animate-pulse">
                  <Clock className="h-3 w-3 mr-1" />
                  {product.expiresIn}d left
                </Badge>
              </div>
            )}

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            {/* Sustainability Tags */}
            {sustainableMode && (
              <div className="flex flex-wrap gap-1">
                {product.isOrganic && (
                  <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                    Organic
                  </Badge>
                )}
                {product.isBpaFree && (
                  <Badge variant="outline" className="text-xs border-blue-500 text-blue-600">
                    BPA-Free
                  </Badge>
                )}
                {product.isRecyclable && (
                  <Badge variant="outline" className="text-xs border-emerald-500 text-emerald-600">
                    <Recycle className="h-3 w-3 mr-1" />
                    Recyclable
                  </Badge>
                )}
              </div>
            )}

            {/* Product Name */}
            <h3 className={`font-semibold text-sm line-clamp-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium ml-1">{product.rating}</span>
              </div>
              <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>({product.reviews})</span>
            </div>

            {/* Carbon Footprint */}
            {sustainableMode && product.carbonFootprint && (
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium">Carbon Impact:</span>
                <Badge className={`text-xs ${getCarbonFootprintColor(product.carbonFootprint)}`}>
                  {product.carbonFootprint}
                </Badge>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-2">
              <span className={`text-lg font-bold ${sustainableMode ? "text-green-600" : "text-blue-600"}`}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full ${
                  sustainableMode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>

              {/* Food-specific actions */}
              {(product.category === "fruits" || product.category === "dairy" || product.category === "bakery") && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={onRecipeClick} className="flex-1 bg-transparent">
                    <ChefHat className="h-3 w-3 mr-1" />
                    Recipe
                  </Button>
                  {product.expiresIn && product.expiresIn <= 3 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onEcoDelivery}
                      className="flex-1 text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                    >
                      <Recycle className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Sustainability Achievement */}
            {sustainableMode && product.sustainabilityScore && product.sustainabilityScore > 90 && (
              <div className="flex items-center justify-center space-x-1 text-xs text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                <Award className="h-3 w-3" />
                <span>Eco Champion Product</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
