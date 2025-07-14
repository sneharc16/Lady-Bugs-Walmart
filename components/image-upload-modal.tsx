"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Camera, X, CheckCircle, Package, Shirt, Smartphone, Utensils, Lightbulb, Recycle } from "lucide-react"

interface ImageUploadModalProps {
  onClose: () => void
  onEarnPoints: (points: number) => void
}

const categories = [
  {
    id: "packaging",
    name: "Packaging Material",
    icon: Package,
    color: "bg-blue-500",
    description: "Cardboard, plastic containers, bubble wrap",
    points: 10,
  },
  {
    id: "clothing",
    name: "Clothing & Textiles",
    icon: Shirt,
    color: "bg-purple-500",
    description: "Shirts, pants, shoes, fabric items",
    points: 15,
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Smartphone,
    color: "bg-green-500",
    description: "Phones, laptops, cables, batteries",
    points: 25,
  },
  {
    id: "kitchen",
    name: "Kitchen Items",
    icon: Utensils,
    color: "bg-orange-500",
    description: "Utensils, containers, small appliances",
    points: 12,
  },
  {
    id: "household",
    name: "Household Items",
    icon: Lightbulb,
    color: "bg-yellow-500",
    description: "Light bulbs, decorations, tools",
    points: 8,
  },
  {
    id: "mixed",
    name: "Mixed Materials",
    icon: Recycle,
    color: "bg-gray-500",
    description: "Multiple materials or unclear category",
    points: 5,
  },
]

export function ImageUploadModal({ onClose, onEarnPoints }: ImageUploadModalProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectedCategory, setDetectedCategory] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        analyzeImage()
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]
      setDetectedCategory(randomCategory.id)
      setConfidence(Math.floor(Math.random() * 20) + 80) // 80-99% confidence
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleCategoryConfirm = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    if (category) {
      onEarnPoints(category.points)
      onClose()
    }
  }

  const getDetectedCategoryInfo = () => {
    return categories.find((c) => c.id === detectedCategory)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Camera className="w-6 h-6" />
            Scan & Categorize Your Item
          </DialogTitle>
          <p className="text-gray-600">
            Upload a photo of your item and we'll help categorize it for proper recycling or donation
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          {!uploadedImage && (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upload Item Photo</h3>
                  <p className="text-gray-600 mb-4">Take a clear photo of the item you want to recycle or donate</p>
                  <Button onClick={() => fileInputRef.current?.click()} className="bg-green-600 hover:bg-green-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Choose Photo
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Image Analysis Section */}
          {uploadedImage && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Uploaded Image */}
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Uploaded item"
                    className="w-full h-64 object-cover rounded-xl border"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => {
                      setUploadedImage(null)
                      setDetectedCategory(null)
                      setIsAnalyzing(false)
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {isAnalyzing && (
                  <div className="text-center py-4">
                    <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-gray-600">Analyzing your item...</p>
                  </div>
                )}
              </div>

              {/* Analysis Results */}
              <div className="space-y-4">
                {detectedCategory && !isAnalyzing && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-green-800">Analysis Complete!</h3>
                      </div>
                      <p className="text-green-700 text-sm">Confidence: {confidence}% • AI-powered categorization</p>
                    </div>

                    <Card className="border-2 border-green-200">
                      <CardContent className="p-4">
                        {(() => {
                          const categoryInfo = getDetectedCategoryInfo()
                          if (!categoryInfo) return null
                          const Icon = categoryInfo.icon
                          return (
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-10 h-10 ${categoryInfo.color} rounded-lg flex items-center justify-center`}
                                >
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-semibold">{categoryInfo.name}</h4>
                                  <p className="text-sm text-gray-600">{categoryInfo.description}</p>
                                </div>
                              </div>
                              <Badge className="bg-yellow-100 text-yellow-800">
                                +{categoryInfo.points} Green Points
                              </Badge>
                            </div>
                          )
                        })()}
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Button
                        onClick={() => handleCategoryConfirm(detectedCategory)}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Confirm Category & Earn Points
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        Not correct? Choose a different category below
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Manual Category Selection */}
          {uploadedImage && !isAnalyzing && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Or Choose Category Manually:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Card
                      key={category.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        detectedCategory === category.id ? "ring-2 ring-green-500 bg-green-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleCategoryConfirm(category.id)}
                    >
                      <CardContent className="p-4 text-center space-y-2">
                        <div
                          className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-medium text-sm">{category.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          +{category.points} pts
                        </Badge>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">📸 Photo Tips for Better Results:</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Take photos in good lighting</li>
              <li>• Show the entire item clearly</li>
              <li>• Include any labels or brand markings</li>
              <li>• Avoid blurry or dark images</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
