"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Phone, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthModalProps {
  onClose: () => void
  onLogin: (userData: any) => void
  darkMode: boolean
}

export function AuthModal({ onClose, onLogin, darkMode }: AuthModalProps) {
  const [step, setStep] = useState<"phone" | "otp" | "profile">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) return

    setIsLoading(true)
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true)
      setStep("otp")
      setIsLoading(false)
    }, 2000)
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) return

    setIsLoading(true)
    // Simulate OTP verification
    setTimeout(() => {
      if (otp === "123456") {
        setStep("profile")
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleCompleteProfile = () => {
    if (!name) return

    const userData = {
      name,
      phone: phoneNumber,
      id: Date.now().toString(),
      joinDate: new Date().toISOString(),
    }

    onLogin(userData)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <Card className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"} shadow-2xl`}>
          <CardHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={`absolute right-2 top-2 ${darkMode ? "text-gray-400 hover:text-white" : ""}`}
            >
              <X className="w-4 h-4" />
            </Button>
            <CardTitle className={`text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
              {step === "phone" && "📱 Login with Phone"}
              {step === "otp" && "🔐 Verify OTP"}
              {step === "profile" && "👤 Complete Profile"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === "phone" && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                <div className="text-center">
                  <Phone className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Enter your phone number to get started
                  </p>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                  />
                </div>

                <Button
                  onClick={handleSendOTP}
                  disabled={!phoneNumber || phoneNumber.length < 10 || isLoading}
                  className="w-full h-12 text-lg font-semibold"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </motion.div>
            )}

            {step === "otp" && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                <div className="text-center">
                  <Shield className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Enter the 6-digit code sent to</p>
                  <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{phoneNumber}</p>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    OTP Code
                  </label>
                  <Input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className={`text-center text-2xl tracking-widest ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                    maxLength={6}
                  />
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Demo: Use 123456 as OTP</p>
                </div>

                <Button
                  onClick={handleVerifyOTP}
                  disabled={otp.length !== 6 || isLoading}
                  className="w-full h-12 text-lg font-semibold"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setStep("phone")}
                  className={`w-full ${darkMode ? "text-gray-400 hover:text-white" : ""}`}
                >
                  ← Back to Phone Number
                </Button>
              </motion.div>
            )}

            {step === "profile" && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                <div className="text-center">
                  <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Phone verified! Complete your profile
                  </p>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                  />
                </div>

                <Button
                  onClick={handleCompleteProfile}
                  disabled={!name}
                  className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700"
                >
                  Complete Setup 🎉
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
