"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Smartphone, Shirt, Home, Car, Apple, HelpCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TradeInModalProps {
  onClose: () => void
  onEarnPoints: (points: number) => void
  darkMode: boolean
}

export function TradeInModal({ onClose, onEarnPoints, darkMode }: TradeInModalProps) {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedItem, setSelectedItem] = useState("")
  const [tradeReason, setTradeReason] = useState("")
  const [condition, setCondition] = useState("")
  const [description, setDescription] = useState("")
  const [estimatedValue, setEstimatedValue] = useState(0)

  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      icon: Smartphone,
      items: ["Smartphone", "Laptop", "Tablet", "Smart Watch", "Headphones", "Gaming Console"],
    },
    {
      id: "clothing",
      name: "Clothing & Accessories",
      icon: Shirt,
      items: ["Shirts", "Pants", "Shoes", "Bags", "Jewelry", "Watches"],
    },
    {
      id: "home",
      name: "Home & Garden",
      icon: Home,
      items: ["Furniture", "Appliances", "Tools", "Garden Equipment", "Decor", "Kitchen Items"],
    },
    {
      id: "automotive",
      name: "Automotive",
      icon: Car,
      items: ["Car Parts", "Tires", "Accessories", "Tools", "Electronics", "Fluids"],
    },
    {
      id: "food",
      name: "Food & Grocery",
      icon: Apple,
      items: ["Canned Goods", "Packaged Foods", "Beverages", "Snacks", "Condiments", "Spices"],
    },
  ]

  const tradeReasons = [
    "Upgrading to newer model",
    "No longer needed",
    "Duplicate item",
    "Wrong size/fit",
    "Damaged/broken",
    "Expired/near expiry",
    "Environmental responsibility",
    "Space constraints",
    "Other",
  ]

  const conditions = [
    { value: "excellent", label: "Excellent", multiplier: 1.0, description: "Like new, no visible wear" },
    { value: "good", label: "Good", multiplier: 0.8, description: "Minor signs of use, fully functional" },
    { value: "fair", label: "Fair", multiplier: 0.6, description: "Noticeable wear, works properly" },
    { value: "poor", label: "Poor", multiplier: 0.4, description: "Heavy wear or minor issues" },
    { value: "broken", label: "Broken/Parts", multiplier: 0.2, description: "Not working, for parts only" },
  ]

  const calculateEstimatedValue = (category: string, item: string, condition: string) => {
    const baseValues = {
      electronics: {
        Smartphone: 200,
        Laptop: 300,
        Tablet: 150,
        "Smart Watch": 100,
        Headphones: 50,
        "Gaming Console": 250,
      },
      clothing: { Shirts: 15, Pants: 20, Shoes: 30, Bags: 40, Jewelry: 50, Watches: 80 },
      home: { Furniture: 100, Appliances: 150, Tools: 40, "Garden Equipment": 60, Decor: 25, "Kitchen Items": 30 },
      automotive: { "Car Parts": 80, Tires: 120, Accessories: 30, Tools: 50, Electronics: 70, Fluids: 10 },
      food: { "Canned Goods": 2, "Packaged Foods": 3, Beverages: 1, Snacks: 2, Condiments: 1, Spices: 2 },
    }

    const baseValue = baseValues[category as keyof typeof baseValues]?.[item as keyof any] || 0
    const conditionMultiplier = conditions.find((c) => c.value === condition)?.multiplier || 0.5
    return Math.round(baseValue * conditionMultiplier)
  }

  const handleConditionChange = (value: string) => {
    setCondition(value)
    if (selectedCategory && selectedItem) {
      const value_estimate = calculateEstimatedValue(selectedCategory, selectedItem, value)
      setEstimatedValue(value_estimate)
    }
  }

  const handleSubmit = () => {
    const points = Math.max(estimatedValue * 2, 50) // Minimum 50 points
    onEarnPoints(points)
    onClose()
  }

  const openConditionAssessment = () => {
    // This would open an AI-powered condition assessment tool
    alert("AI Condition Assessment tool would open here - analyzing photos and providing detailed condition evaluation")
  }

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
                <CardTitle className={`${darkMode ? "text-white" : "text-gray-900"}`}>
                  Trade-In Program - Step {step} of 4
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Category Selection */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                  <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Select Category
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {categories.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            selectedCategory === category.id
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : darkMode
                                ? "border-gray-600 bg-gray-700 hover:bg-gray-600"
                                : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-6 w-6 text-green-600" />
                            <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                              {category.name}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedCategory}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Continue
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Item Selection & Reason */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Select Specific Item
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {categories
                        .find((c) => c.id === selectedCategory)
                        ?.items.map((item) => (
                          <button
                            key={item}
                            onClick={() => setSelectedItem(item)}
                            className={`p-3 rounded-lg border text-sm transition-all ${
                              selectedItem === item
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                                : darkMode
                                  ? "border-gray-600 bg-gray-700 hover:bg-gray-600 text-white"
                                  : "border-gray-200 bg-white hover:bg-gray-50 text-gray-900"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Reason for Trade-In
                    </h3>
                    <RadioGroup value={tradeReason} onValueChange={setTradeReason}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {tradeReasons.map((reason) => (
                          <div key={reason} className="flex items-center space-x-2">
                            <RadioGroupItem value={reason} id={reason} />
                            <Label htmlFor={reason} className="text-sm cursor-pointer">
                              {reason}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!selectedItem || !tradeReason}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Continue
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Condition Assessment */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Assess Item Condition
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={openConditionAssessment}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent"
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Help Assess Condition
                      </Button>
                    </div>

                    <RadioGroup value={condition} onValueChange={handleConditionChange}>
                      <div className="space-y-3">
                        {conditions.map((cond) => (
                          <div
                            key={cond.value}
                            className={`p-3 rounded-lg border transition-all ${
                              condition === cond.value
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                : darkMode
                                  ? "border-gray-600 bg-gray-700"
                                  : "border-gray-200 bg-white"
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value={cond.value} id={cond.value} />
                              <div className="flex-1">
                                <Label htmlFor={cond.value} className="font-medium cursor-pointer">
                                  {cond.label}
                                </Label>
                                <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                  {cond.description}
                                </p>
                              </div>
                              <Badge variant="secondary">{Math.round(cond.multiplier * 100)}% value</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Additional Description (Optional)
                    </Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe any specific details about the item's condition..."
                      className="mt-2"
                    />
                  </div>

                  {estimatedValue > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                        Estimated Trade-In Value
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">${estimatedValue}</span>
                        <span className="text-sm text-green-600">+ {estimatedValue * 2} Green Points</span>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(4)}
                      disabled={!condition}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Continue
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Trade-In Summary
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            Category:
                          </span>
                          <p className={darkMode ? "text-white" : "text-gray-900"}>
                            {categories.find((c) => c.id === selectedCategory)?.name}
                          </p>
                        </div>
                        <div>
                          <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Item:</span>
                          <p className={darkMode ? "text-white" : "text-gray-900"}>{selectedItem}</p>
                        </div>
                        <div>
                          <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            Condition:
                          </span>
                          <p className={darkMode ? "text-white" : "text-gray-900"}>
                            {conditions.find((c) => c.value === condition)?.label}
                          </p>
                        </div>
                        <div>
                          <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Reason:</span>
                          <p className={darkMode ? "text-white" : "text-gray-900"}>{tradeReason}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-green-700 dark:text-green-300">Trade-In Value:</span>
                        <span className="text-xl font-bold text-green-600">${estimatedValue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-green-700 dark:text-green-300">Green Points Reward:</span>
                        <span className="text-lg font-bold text-green-600">+{estimatedValue * 2}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={() => setStep(3)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                      Complete Trade-In
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
