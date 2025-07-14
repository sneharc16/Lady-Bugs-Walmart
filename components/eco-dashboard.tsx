"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Leaf, Recycle, Droplets, Award, TrendingUp, Calendar, Target, Zap } from "lucide-react"

interface EcoDashboardProps {
  onClose: () => void
  onTradeInClick: () => void
  greenPoints: number
}

// Mock data for charts and analytics
const monthlyData = [
  { month: "Jan", co2: 15, plastic: 1.2, water: 80, points: 45 },
  { month: "Feb", co2: 22, plastic: 2.1, water: 120, points: 68 },
  { month: "Mar", co2: 35, plastic: 3.5, water: 200, points: 95 },
  { month: "Apr", co2: 48, plastic: 4.8, water: 280, points: 125 },
  { month: "May", co2: 67, plastic: 6.2, water: 350, points: 180 },
  { month: "Jun", co2: 127.5, plastic: 8.2, water: 450, points: 250 },
]

const weeklyActivity = [
  { day: "Mon", actions: 3, points: 15 },
  { day: "Tue", actions: 5, points: 25 },
  { day: "Wed", actions: 2, points: 10 },
  { day: "Thu", actions: 7, points: 35 },
  { day: "Fri", actions: 4, points: 20 },
  { day: "Sat", actions: 6, points: 30 },
  { day: "Sun", actions: 8, points: 40 },
]

export function EcoDashboard({ onClose, onTradeInClick, greenPoints }: EcoDashboardProps) {
  const impactData = {
    co2Saved: 127.5,
    plasticAvoided: 8.2,
    waterPreserved: 450,
    treesEquivalent: 3.2,
    rank: 156,
    totalUsers: 50000,
  }

  const badges = [
    { name: "Conscious Consumer", icon: "🌱", earned: true, date: "May 15" },
    { name: "Recycling Champion", icon: "♻️", earned: true, date: "June 2" },
    { name: "Carbon Saver", icon: "🌍", earned: false, progress: 85 },
    { name: "Plastic-Free Hero", icon: "🚫", earned: false, progress: 65 },
  ]

  const milestones = [
    { name: "100kg CO₂ Saved", progress: 127.5, target: 100, completed: true },
    { name: "10kg Plastic Avoided", progress: 8.2, target: 10, completed: false },
    { name: "500L Water Preserved", progress: 450, target: 500, completed: false },
    { name: "1000 Green Points", progress: greenPoints, target: 1000, completed: false },
  ]

  const getMaxValue = (data: any[], key: string) => {
    return Math.max(...data.map((item) => item[key]))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onClose}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Shopping
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-green-800">Your Eco Impact Dashboard</h1>
          <p className="text-gray-600">Track your environmental impact and sustainability journey</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Points Summary */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Green Points Balance</h2>
                  <p className="text-4xl font-bold">{greenPoints} 🪙</p>
                  <p className="text-green-100 mt-2">
                    Rank #{impactData.rank} of {impactData.totalUsers.toLocaleString()} users
                  </p>
                </div>
                <div className="text-right">
                  <Award className="w-16 h-16 opacity-80 mb-2" />
                  <Badge className="bg-white/20 text-white">Top 1%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  CO₂ Saved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <span className="text-3xl font-bold text-green-600">{impactData.co2Saved}kg</span>
                  <p className="text-xs text-gray-500">≈ {impactData.treesEquivalent} trees planted</p>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    +15% this month
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Recycle className="w-4 h-4" />
                  Plastic Avoided
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <span className="text-3xl font-bold text-blue-600">{impactData.plasticAvoided}kg</span>
                  <p className="text-xs text-gray-500">≈ 164 plastic bottles</p>
                  <div className="flex items-center gap-1 text-xs text-blue-600">
                    <TrendingUp className="w-3 h-3" />
                    +8% this month
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-cyan-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Droplets className="w-4 h-4" />
                  Water Preserved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <span className="text-3xl font-bold text-cyan-600">{impactData.waterPreserved}L</span>
                  <p className="text-xs text-gray-500">≈ 3 days drinking water</p>
                  <div className="flex items-center gap-1 text-xs text-cyan-600">
                    <TrendingUp className="w-3 h-3" />
                    +12% this month
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Eco Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <span className="text-3xl font-bold text-orange-600">12 days</span>
                  <p className="text-xs text-gray-500">Personal best: 18 days</p>
                  <div className="flex items-center gap-1 text-xs text-orange-600">
                    <TrendingUp className="w-3 h-3" />
                    Keep it up!
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Recycle className="w-5 h-5" />
                  Trade In Items
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Turn your old items into Green Points with AI-powered condition assessment
                </p>
                <Button onClick={onTradeInClick} className="w-full">
                  Start Trade-In
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Redeem Points
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Use your Green Points for discounts and charitable donations
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  View Rewards
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Monthly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Monthly Environmental Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* CO2 Chart */}
                <div>
                  <h4 className="font-medium mb-3 text-green-700">CO₂ Saved (kg)</h4>
                  <div className="space-y-2">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="w-8 text-xs text-gray-600">{data.month}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(data.co2 / getMaxValue(monthlyData, "co2")) * 100}%` }}
                          />
                        </div>
                        <span className="w-12 text-xs text-gray-600 text-right">{data.co2}kg</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plastic Chart */}
                <div>
                  <h4 className="font-medium mb-3 text-blue-700">Plastic Avoided (kg)</h4>
                  <div className="space-y-2">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="w-8 text-xs text-gray-600">{data.month}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(data.plastic / getMaxValue(monthlyData, "plastic")) * 100}%` }}
                          />
                        </div>
                        <span className="w-12 text-xs text-gray-600 text-right">{data.plastic}kg</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Points Chart */}
                <div>
                  <h4 className="font-medium mb-3 text-purple-700">Green Points Earned</h4>
                  <div className="space-y-2">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="w-8 text-xs text-gray-600">{data.month}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(data.points / getMaxValue(monthlyData, "points")) * 100}%` }}
                          />
                        </div>
                        <span className="w-12 text-xs text-gray-600 text-right">{data.points}pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-gray-600 mb-2">{day.day}</div>
                    <div
                      className="bg-green-500 rounded-lg mx-auto transition-all duration-300 hover:bg-green-600"
                      style={{
                        height: `${Math.max(20, (day.actions / 8) * 60)}px`,
                        width: "100%",
                      }}
                    />
                    <div className="text-xs text-gray-500 mt-2">{day.actions}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">Eco-friendly actions per day</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Your Eco Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`text-center p-6 rounded-xl border-2 transition-all ${
                      badge.earned ? "bg-green-50 border-green-200 shadow-md" : "bg-gray-50 border-gray-200 opacity-70"
                    }`}
                  >
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <p className="font-medium text-sm mb-2">{badge.name}</p>
                    {badge.earned ? (
                      <div>
                        <Badge className="bg-green-500 mb-2">Earned</Badge>
                        <p className="text-xs text-gray-500">on {badge.date}</p>
                      </div>
                    ) : (
                      <div>
                        <Progress value={badge.progress} className="h-2 mb-2" />
                        <p className="text-xs text-gray-500">{badge.progress}% complete</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Impact Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{milestone.name}</span>
                    <span className="text-sm text-gray-600">
                      {milestone.progress}/{milestone.target}
                    </span>
                  </div>
                  <Progress value={(milestone.progress / milestone.target) * 100} className="h-3" />
                  <div className="flex justify-between items-center">
                    {milestone.completed ? (
                      <Badge className="bg-green-500">Completed! 🎉</Badge>
                    ) : (
                      <span className="text-sm text-gray-500">
                        {Math.round(milestone.target - milestone.progress)} more to go
                      </span>
                    )}
                    <span className="text-sm font-medium">
                      {Math.round((milestone.progress / milestone.target) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Goal Setting */}
          <Card>
            <CardHeader>
              <CardTitle>Set New Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                  <Leaf className="w-6 h-6 mb-2 text-green-600" />
                  <span>Reduce CO₂ by 50kg</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                  <Recycle className="w-6 h-6 mb-2 text-blue-600" />
                  <span>Recycle 20 items</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                  <Droplets className="w-6 h-6 mb-2 text-cyan-600" />
                  <span>Save 1000L water</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center bg-transparent">
                  <Award className="w-6 h-6 mb-2 text-purple-600" />
                  <span>Earn 500 points</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
