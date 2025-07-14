"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Award, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EcoBadge {
  id: number
  name: string
  description: string
  earned: boolean
  icon: string
}

interface EcoBadgeModalProps {
  badge: EcoBadge | undefined
  onClose: () => void
  darkMode: boolean
}

export function EcoBadgeModal({ badge, onClose, darkMode }: EcoBadgeModalProps) {
  if (!badge) return null

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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md"
        >
          <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} overflow-hidden`}>
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white text-center relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-2 right-2 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-6xl mb-4"
                >
                  {badge.icon}
                </motion.div>

                <h2 className="text-2xl font-bold mb-2">Congratulations! 🎉</h2>
                <p className="text-green-100">You've earned a new eco badge!</p>
              </div>

              {/* Badge Details */}
              <div className="p-6 text-center">
                <div className="mb-4">
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {badge.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{badge.description}</p>
                </div>

                {/* Achievement Stars */}
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Reward Info */}
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Award className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-700 dark:text-green-300">+50 Green Points Earned!</span>
                  </div>
                </div>

                <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
