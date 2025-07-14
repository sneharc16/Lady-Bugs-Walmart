"use client"

import { motion } from "framer-motion"

interface CoinNotificationProps {
  points: number
}

export function CoinNotification({ points }: CoinNotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.5 }}
      className="fixed bottom-20 right-4 z-50"
    >
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-4 rounded-full shadow-lg flex items-center gap-3">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: 2 }} className="text-2xl">
          🪙
        </motion.div>
        <div>
          <p className="font-bold">+{points} Green Points!</p>
          <p className="text-sm opacity-90">Great eco-choice!</p>
        </div>
      </div>
    </motion.div>
  )
}
