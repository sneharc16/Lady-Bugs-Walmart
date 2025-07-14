"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ChatbotProps {
  darkMode?: boolean
}

export function Chatbot({ darkMode = false }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = () => {
    if (!isOpen) {
      setIsLoading(true)
      setIsOpen(true)
      // Simulate loading time for iframe
      setTimeout(() => setIsLoading(false), 1500)
    } else {
      setIsOpen(false)
      setIsMinimized(false)
      setIsLoading(false)
    }
  }

  const handleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={handleToggle}
              className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>

              {/* Pulse animation */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card
              className={`w-80 shadow-2xl border-2 ${
                darkMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-200"
              }`}
            >
              {/* Header */}
              <div
                className={`flex items-center justify-between p-4 border-b ${
                  darkMode ? "border-gray-600 bg-gray-700" : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <h3 className={`font-semibold text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                    EcoMart Assistant
                  </h3>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleMinimize}
                    className={`h-6 w-6 ${
                      darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleToggle}
                    className={`h-6 w-6 ${
                      darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Chat Content */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "400px", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {isLoading ? (
                      <div
                        className={`h-full flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-white"}`}
                      >
                        <div className="text-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className={`w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2`}
                          />
                          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Loading assistant...
                          </p>
                        </div>
                      </div>
                    ) : (
                      <iframe
                        src="https://www.chatbase.co/chatbot-iframe/PPOms_w3fbqLv0E--lLdG"
                        width="100%"
                        height="400"
                        frameBorder="0"
                        className="rounded-b-lg"
                        title="EcoMart Assistant"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
