"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, ChefHat, Recycle, AlertTriangle, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExpiringItem {
  id: number
  name: string
  expiresIn: number
  category: string
  image: string
}

interface ExpiryNotificationModalProps {
  onClose: () => void
  expiringItems?: ExpiringItem[]
  darkMode?: boolean
  onRecipeClick: () => void
  onTradeInClick: () => void
}

export function ExpiryNotificationModal({
  onClose,
  expiringItems = [],
  darkMode = false,
  onRecipeClick,
  onTradeInClick,
}: ExpiryNotificationModalProps) {
  const urgentItems = expiringItems?.filter((item) => item.expiresIn <= 2) || []
  const soonItems = expiringItems?.filter((item) => item.expiresIn > 2 && item.expiresIn <= 5) || []

  const getDisposalTips = (category: string) => {
    const tips = {
      fruits: ["Compost banana peels", "Make smoothies with overripe fruit", "Freeze for future baking"],
      dairy: ["Check smell before discarding", "Use in cooking/baking", "Recycle containers properly"],
      bakery: ["Make breadcrumbs", "French toast with stale bread", "Compost if moldy"],
      default: ["Check local recycling guidelines", "Consider composting", "Donate if still good"],
    }
    return tips[category as keyof typeof tips] || tips.default
  }

  // Default items if none provided
  const defaultItems = [
    {
      id: 1,
      name: "Organic Bananas",
      expiresIn: 2,
      category: "fruits",
      image: "/images/bananas.jpg",
    },
    {
      id: 2,
      name: "Greek Yogurt",
      expiresIn: 1,
      category: "dairy",
      image: "/images/greek-yogurt.jpg",
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      expiresIn: 3,
      category: "bakery",
      image: "/images/bread.jpg",
    },
  ]

  const itemsToShow = expiringItems.length > 0 ? expiringItems : defaultItems
  const urgentToShow = itemsToShow.filter((item) => item.expiresIn <= 2)
  const soonToShow = itemsToShow.filter((item) => item.expiresIn > 2 && item.expiresIn <= 5)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className={`flex items-center space-x-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span>Food Expiry Alert</span>
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Urgent Items */}
              {urgentToShow.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <h3 className={`font-semibold text-red-600 dark:text-red-400`}>
                      Expires Very Soon ({urgentToShow.length} items)
                    </h3>
                  </div>
                  <div className="grid gap-3">
                    {urgentToShow.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                      >
                        <img
                          src={item.image || "/placeholder.svg?height=48&width=48"}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{item.name}</h4>
                          <Badge variant="destructive" className="text-xs">
                            {item.expiresIn} day{item.expiresIn === 1 ? "" : "s"} left
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Soon to Expire Items */}
              {soonToShow.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <h3 className={`font-semibold text-orange-600 dark:text-orange-400`}>
                      Expires Soon ({soonToShow.length} items)
                    </h3>
                  </div>
                  <div className="grid gap-3">
                    {soonToShow.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800"
                      >
                        <img
                          src={item.image || "/placeholder.svg?height=48&width=48"}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{item.name}</h4>
                          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                            {item.expiresIn} days left
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={onRecipeClick} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                  <ChefHat className="h-4 w-4 mr-2" />
                  Get Recipe Ideas
                </Button>
                <Button onClick={onTradeInClick} variant="outline" className="flex-1 bg-transparent">
                  <Recycle className="h-4 w-4 mr-2" />
                  Eco Disposal Guide
                </Button>
              </div>

              {/* Eco Tips */}
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-green-600" />
                  <h4 className="font-semibold text-green-700 dark:text-green-300">Eco-Friendly Tips</h4>
                </div>
                <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                  <li>• Use overripe fruits in smoothies or baking</li>
                  <li>• Compost food scraps to reduce waste</li>
                  <li>• Check our recipe suggestions for creative uses</li>
                  <li>• Consider donating unopened items to food banks</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
