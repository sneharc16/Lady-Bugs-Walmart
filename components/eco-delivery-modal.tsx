"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Truck, Leaf, Clock } from "lucide-react"

interface EcoDeliveryModalProps {
  onClose: () => void
  onChooseEco: () => void
}

export function EcoDeliveryModal({ onClose, onChooseEco }: EcoDeliveryModalProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Your Delivery Option</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Standard Delivery</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">Get your items by tomorrow</p>
            <p className="text-lg font-bold">FREE</p>
          </div>

          <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Eco-Optimized Delivery</h3>
            </div>
            <p className="text-sm text-green-700 mb-2">Grouped with nearby deliveries to reduce CO₂ emissions</p>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm">2-3 business days</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-green-800">FREE</p>
              <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-sm font-medium">
                +25 Green Points 🪙
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Standard Delivery
          </Button>
          <Button onClick={onChooseEco} className="flex-1 bg-green-600 hover:bg-green-700">
            Choose Eco-Delivery
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
