"use client"

import { useEffect, useRef } from "react"
import { X, ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  category: string
  sustainabilityScore?: number
}

interface CartDropdownProps {
  cartItems: CartItem[]
  onClose: () => void
  onCartClick?: () => void
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  darkMode?: boolean
  sustainableMode?: boolean
}

export function CartDropdown({
  cartItems,
  onClose,
  onCartClick,
  onUpdateQuantity,
  onRemoveItem,
  darkMode = false,
  sustainableMode = false,
}: CartDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const avgSustainabilityScore =
    cartItems.length > 0
      ? cartItems.reduce((sum, item) => sum + (item.sustainabilityScore || 0), 0) / cartItems.length
      : 0

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-full mt-3 w-96 rounded-xl shadow-xl border z-50 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div
        className={`flex items-center justify-between p-4 border-b rounded-t-xl ${
          darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
        }`}
      >
        <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Shopping Cart ({totalItems})</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="font-medium mb-1">Your cart is empty</p>
            <p className="text-sm">Add some products to get started!</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${
                  darkMode ? "border-gray-600 bg-gray-700/50" : "border-gray-200 bg-gray-50"
                }`}
              >
                <img
                  src={item.image || "/placeholder.svg?height=48&width=48"}
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />

                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium text-sm truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {item.name}
                  </h4>
                  <p className={`text-sm ${sustainableMode ? "text-green-600" : "text-blue-600"} font-semibold`}>
                    ${item.price.toFixed(2)}
                  </p>
                  {sustainableMode && item.sustainabilityScore && (
                    <Badge className="bg-green-600 text-white text-xs mt-1">{item.sustainabilityScore}% Eco</Badge>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 bg-transparent"
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <span className={`w-8 text-center text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {item.quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 bg-transparent"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className={`border-t p-4 space-y-3 ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
          {/* Sustainability Score */}
          {sustainableMode && avgSustainabilityScore > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Avg. Sustainability Score:</span>
              <Badge className="bg-green-600 text-white">{avgSustainabilityScore.toFixed(0)}%</Badge>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Total: ${totalPrice.toFixed(2)}
            </span>
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Checkout Button */}
          <Button
            className={`w-full h-11 ${
              sustainableMode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
            onClick={() => {
              onCartClick?.()
              onClose()
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Proceed to Checkout
          </Button>

          {/* Eco Message */}
          {sustainableMode && (
            <p className="text-xs text-center text-green-600 dark:text-green-400">
              🌱 Great choices! You're supporting sustainable shopping.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
