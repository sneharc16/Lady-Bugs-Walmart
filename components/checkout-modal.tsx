"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Truck, Leaf, Clock } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  category: string
  sustainabilityScore?: number
}

interface CheckoutModalProps {
  onClose: () => void
  cartItems: CartItem[]
  darkMode?: boolean
  sustainableMode?: boolean
  onOrderComplete: (orderData: any) => void
  onEarnPoints: (points: number) => void
}

export function CheckoutModal({
  onClose,
  cartItems,
  darkMode = false,
  sustainableMode = false,
  onOrderComplete,
  onEarnPoints,
}: CheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [deliveryOption, setDeliveryOption] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const deliveryFee = deliveryOption === "express" ? 9.99 : 0
  const ecoDiscount = deliveryOption === "eco" ? subtotal * 0.05 : 0 // 5% discount for eco delivery
  const total = subtotal + tax + deliveryFee - ecoDiscount

  const avgSustainabilityScore =
    cartItems.length > 0
      ? cartItems.reduce((sum, item) => sum + (item.sustainabilityScore || 0), 0) / cartItems.length
      : 0

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = () => {
    const orderData = {
      items: cartItems,
      delivery: deliveryOption,
      payment: paymentMethod,
      total,
      customerInfo: formData,
      timestamp: new Date().toISOString(),
    }

    // Award points for eco-friendly choices
    let pointsEarned = 0
    if (deliveryOption === "eco") {
      pointsEarned += 50 // Eco delivery bonus
    }
    if (avgSustainabilityScore > 70) {
      pointsEarned += 25 // Sustainable shopping bonus
    }

    if (pointsEarned > 0) {
      onEarnPoints(pointsEarned)
    }

    onOrderComplete(orderData)
    onClose()
  }

  const renderOrderSummary = () => (
    <Card className={`${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
      <CardContent className="p-4">
        <h3 className={`font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>Order Summary</h3>

        <div className="space-y-2 mb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <span className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {item.name} × {item.quantity}
              </span>
              <span className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-3" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Subtotal ({totalItems} items)</span>
            <span className={darkMode ? "text-white" : "text-gray-900"}>${subtotal.toFixed(2)}</span>
          </div>

          {deliveryFee > 0 && (
            <div className="flex justify-between">
              <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Delivery Fee</span>
              <span className={darkMode ? "text-white" : "text-gray-900"}>${deliveryFee.toFixed(2)}</span>
            </div>
          )}

          {ecoDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Eco Delivery Discount (5%)</span>
              <span>-${ecoDiscount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Tax</span>
            <span className={darkMode ? "text-white" : "text-gray-900"}>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator className="my-3" />

        <div className="flex justify-between font-semibold text-lg">
          <span className={darkMode ? "text-white" : "text-gray-900"}>Total</span>
          <span className={sustainableMode ? "text-green-600" : "text-blue-600"}>${total.toFixed(2)}</span>
        </div>

        {sustainableMode && avgSustainabilityScore > 0 && (
          <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-800 dark:text-green-300">Sustainability Score:</span>
              <Badge className="bg-green-600 text-white">{avgSustainabilityScore.toFixed(0)}%</Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderDeliveryOptions = () => (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Choose Delivery Option</h3>

      <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
        {/* Standard Delivery */}
        <div
          className={`border rounded-lg p-4 cursor-pointer transition-all ${
            deliveryOption === "standard"
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : darkMode
                ? "border-gray-600 hover:border-gray-500"
                : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="standard" id="standard" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Standard Delivery</h4>
                <Badge className="bg-blue-600 text-white">FREE</Badge>
              </div>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Get your items by tomorrow</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">1-2 business days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Eco-Optimized Delivery */}
        <div
          className={`border rounded-lg p-4 cursor-pointer transition-all ${
            deliveryOption === "eco"
              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
              : darkMode
                ? "border-gray-600 hover:border-gray-500"
                : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="eco" id="eco" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <h4 className={`font-semibold text-green-800 dark:text-green-300`}>Eco-Optimized Delivery</h4>
                <Badge className="bg-green-600 text-white">FREE + 5% OFF</Badge>
              </div>
              <p className={`text-sm text-green-700 dark:text-green-400 mb-2`}>
                Grouped with nearby deliveries to reduce CO₂ emissions
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">2-3 business days</span>
                </div>
                <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-medium">
                  +50 Green Points 🪙
                </div>
              </div>
              <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                🌱 Carbon neutral delivery • 5% discount applied • Earn bonus points
              </div>
            </div>
          </div>
        </div>

        {/* Express Delivery */}
        <div
          className={`border rounded-lg p-4 cursor-pointer transition-all ${
            deliveryOption === "express"
              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
              : darkMode
                ? "border-gray-600 hover:border-gray-500"
                : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="express" id="express" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="w-5 h-5 text-purple-600" />
                <h4 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Express Delivery</h4>
                <Badge className="bg-purple-600 text-white">$9.99</Badge>
              </div>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Get your items today</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">Same day delivery</span>
              </div>
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  )

  const renderCustomerInfo = () => (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Delivery Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className={darkMode ? "bg-gray-700 border-gray-600" : ""}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className={darkMode ? "bg-gray-700 border-gray-600" : ""}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={darkMode ? "bg-gray-700 border-gray-600" : ""}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={darkMode ? "bg-gray-700 border-gray-600" : ""}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className={darkMode ? "bg-gray-700 border-gray-600" : ""}
          />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className={darkMode ? "bg-gray-700 border-gray-600" : ""}
          />
        </div>
        <div>
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            className={darkMode ? "bg-gray-700 border-gray-600" : ""}
          />
        </div>
      </div>
    </div>
  )

  const renderPaymentInfo = () => (
    <div className="space-y-4">
      <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Payment Information</h3>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            className={darkMode ? "bg-gray-700 border-gray-600" : ""}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              className={darkMode ? "bg-gray-700 border-gray-600" : ""}
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value)}
              className={darkMode ? "bg-gray-700 border-gray-600" : ""}
            />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className={`max-w-4xl max-h-[90vh] overflow-y-auto ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}
      >
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Checkout
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 1 && renderDeliveryOptions()}
            {currentStep === 2 && renderCustomerInfo()}
            {currentStep === 3 && renderPaymentInfo()}
          </div>

          <div className="lg:col-span-1">{renderOrderSummary()}</div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <div className="flex space-x-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === currentStep
                    ? sustainableMode
                      ? "bg-green-600 text-white"
                      : "bg-blue-600 text-white"
                    : step < currentStep
                      ? "bg-gray-400 text-white"
                      : darkMode
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className={darkMode ? "border-gray-600 text-gray-300" : ""}
              >
                Back
              </Button>
            )}

            {currentStep < 3 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                className={`${
                  sustainableMode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                Continue
              </Button>
            ) : (
              <Button
                onClick={handlePlaceOrder}
                className={`${
                  sustainableMode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                Place Order - ${total.toFixed(2)}
              </Button>
            )}
          </div>
        </div>

        {deliveryOption === "eco" && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-300 text-center">
              🌱 Great choice! Your eco-delivery will save approximately 2.5kg of CO₂ emissions and earn you 50 Green
              Points!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
