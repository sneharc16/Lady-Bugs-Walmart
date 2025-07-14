"use client"

import { motion } from "framer-motion"
import { Leaf, ShoppingBag } from "lucide-react"
import { Switch } from "@/components/ui/switch"

interface SustainabilityToggleProps {
  sustainableMode: boolean
  onToggle: (enabled: boolean) => void
  darkMode: boolean
}

export function SustainabilityToggle({ sustainableMode, onToggle, darkMode }: SustainabilityToggleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-20 right-4 z-40"
    >
      <div
        className={`flex items-center space-x-3 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${
          sustainableMode
            ? "bg-green-100/90 border border-green-200 dark:bg-green-900/90 dark:border-green-700"
            : "bg-blue-100/90 border border-blue-200 dark:bg-blue-900/90 dark:border-blue-700"
        }`}
      >
        <div className="flex items-center space-x-2">
          <ShoppingBag
            className={`h-4 w-4 transition-colors ${
              !sustainableMode ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
            }`}
          />
          <Switch checked={sustainableMode} onCheckedChange={onToggle} className="data-[state=checked]:bg-green-600" />
          <Leaf
            className={`h-4 w-4 transition-colors ${
              sustainableMode ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-gray-500"
            }`}
          />
        </div>
        <span
          className={`text-sm font-medium transition-colors ${
            darkMode ? "text-white" : sustainableMode ? "text-green-800" : "text-blue-800"
          }`}
        >
          {sustainableMode ? "Eco Mode" : "Standard"}
        </span>
      </div>
    </motion.div>
  )
}
