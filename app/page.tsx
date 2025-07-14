"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingHeader } from "@/components/shopping-header"
import { ProductGrid } from "@/components/product-grid"
import { EcoDeliveryModal } from "@/components/eco-delivery-modal"
import { RecipeModal } from "@/components/recipe-modal"
import { TradeInModal } from "@/components/trade-in-modal"
import { ImageUploadModal } from "@/components/image-upload-modal"
import { EcoDashboard } from "@/components/eco-dashboard"
import { SustainabilityToggle } from "@/components/sustainability-toggle"
import { AuthModal } from "@/components/auth-modal"
import { SearchModal } from "@/components/search-modal"
import { EcoBadgeModal } from "@/components/eco-badge-modal"
import { ExpiryNotificationModal } from "@/components/expiry-notification-modal"
import { CheckoutModal } from "@/components/checkout-modal"
import { NotificationToast } from "@/components/notification-toast"
import { CoinNotification } from "@/components/coin-notification"
import { Chatbot } from "@/components/chatbot" // Declare the Chatbot variable

export default function HomePage() {
  const [sustainableMode, setSustainableMode] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showEcoDelivery, setShowEcoDelivery] = useState(false)
  const [showRecipeModal, setShowRecipeModal] = useState(false)
  const [showTradeInModal, setShowTradeInModal] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [showEcoBadgeModal, setShowEcoBadgeModal] = useState(false)
  const [showExpiryModal, setShowExpiryModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showCoinNotification, setShowCoinNotification] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [greenPoints, setGreenPoints] = useState(150)
  const [cartItems, setCartItems] = useState([])
  const [ecoBadges, setEcoBadges] = useState([
    { id: 1, name: "Eco Warrior", description: "Made 10 sustainable purchases", earned: true, icon: "🌱" },
    { id: 2, name: "Waste Reducer", description: "Prevented 5kg of food waste", earned: true, icon: "♻️" },
    { id: 3, name: "Green Shopper", description: "100% sustainable purchases this month", earned: false, icon: "🛒" },
    { id: 4, name: "Planet Protector", description: "Saved 50kg CO₂ emissions", earned: false, icon: "🌍" },
  ])
  const [sustainabilityGoals, setSustainabilityGoals] = useState([
    { id: 1, title: "Zero Food Waste Week", progress: 60, target: 100, reward: 100 },
    { id: 2, title: "Sustainable Shopping Streak", progress: 7, target: 14, reward: 150 },
    { id: 3, title: "Trade-in Champion", progress: 2, target: 5, reward: 200 },
  ])
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "expiry",
      title: "🍌 Bananas Expiring Soon!",
      message: "Your organic bananas expire in 2 days. Get recipe ideas or learn about composting options.",
      date: "Today",
      unread: true,
      action: "expiry-action",
      itemId: 1,
      expiresIn: 2,
    },
    {
      id: 2,
      type: "eco",
      title: "🌱 Eco-Disposal Reminder",
      message:
        "Your Greek yogurt expires tomorrow. Consider composting the container or returning for recycling credits.",
      date: "Today",
      unread: true,
      action: "eco-disposal",
      itemId: 2,
      expiresIn: 1,
    },
    {
      id: 3,
      type: "recipe",
      title: "👨‍🍳 Recipe Suggestion",
      message: "Turn your expiring bread into delicious French toast or breadcrumbs!",
      date: "Today",
      unread: true,
      action: "recipe-suggestion",
      itemId: 3,
    },
    {
      id: 4,
      type: "trade-in",
      title: "♻️ Trade-In Opportunity",
      message: "Earn Green Points by trading in your empty containers and packaging!",
      date: "Yesterday",
      unread: true,
      action: "trade-in",
    },
    {
      id: 5,
      type: "achievement",
      title: "🏆 New Eco Badge Earned!",
      message: "Congratulations! You've earned the 'Waste Reducer' badge for preventing food waste.",
      date: "Yesterday",
      unread: false,
      action: "view-badge",
    },
    {
      id: 6,
      type: "urgent",
      title: "⚠️ Urgent: Food Safety Alert",
      message: "Your dairy products expire today. Use immediately or dispose of safely.",
      date: "Today",
      unread: true,
      action: "urgent-action",
      priority: "high",
    },
  ])
  const [toastNotification, setToastNotification] = useState(null)
  const [expiringItems, setExpiringItems] = useState([
    {
      id: 1,
      name: "Organic Bananas",
      expiresIn: 2,
      category: "fruits",
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      id: 2,
      name: "Greek Yogurt",
      expiresIn: 1,
      category: "dairy",
      image: "/placeholder.svg?height=64&width=64",
    },
    {
      id: 3,
      name: "Whole Grain Bread",
      expiresIn: 3,
      category: "bakery",
      image: "/placeholder.svg?height=64&width=64",
    },
  ])

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    const userData = localStorage.getItem("userData")
    if (authStatus === "true" && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, [])

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Enhanced expiry checking with eco-reminders
  useEffect(() => {
    const checkExpiringItems = () => {
      const now = new Date()

      expiringItems.forEach((item) => {
        const shouldNotify = Math.random() > 0.6 // 40% chance to avoid spam

        if (item.expiresIn <= 1 && shouldNotify) {
          // Urgent expiry notification
          const newNotification = {
            id: Date.now() + Math.random(),
            type: "urgent",
            title: `⚠️ ${item.name} expires today!`,
            message: "Use immediately, get recipes, or learn about safe disposal options.",
            date: "Now",
            unread: true,
            action: "urgent-action",
            itemId: item.id,
          }

          setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 notifications

          showToast({
            type: "warning",
            title: `${item.name} expires today! ⏰`,
            message: "Tap for immediate action options",
          })
        } else if (item.expiresIn <= 3 && shouldNotify) {
          // Eco-reminder notification
          const ecoMessages = [
            `Consider making ${item.category === "fruits" ? "smoothies or fruit salad" : "a delicious recipe"} with your ${item.name}`,
            `Your ${item.name} can be composted if unused - earn Green Points for eco-disposal!`,
            `Trade in your ${item.name} packaging for recycling credits when done`,
          ]

          const randomMessage = ecoMessages[Math.floor(Math.random() * ecoMessages.length)]

          const newNotification = {
            id: Date.now() + Math.random(),
            type: "eco",
            title: `🌱 Eco-Reminder: ${item.name}`,
            message: randomMessage,
            date: "Now",
            unread: true,
            action: "eco-disposal",
            itemId: item.id,
          }

          setNotifications((prev) => [newNotification, ...prev.slice(0, 9)])
        }
      })
    }

    const interval = setInterval(checkExpiringItems, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [expiringItems])

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })

    showToast({
      type: "success",
      title: "Added to Cart! 🛒",
      message: `${product.name} has been added to your cart`,
    })
  }

  const updateCartQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id)
      return
    }

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
    showToast({
      type: "info",
      title: "Item Removed",
      message: "Item has been removed from your cart",
    })
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast({
        type: "warning",
        title: "Cart is Empty",
        message: "Add some items to your cart before checking out",
      })
      return
    }

    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    setShowCheckoutModal(true)
  }

  const handleOrderComplete = (orderData) => {
    // Clear cart after successful order
    setCartItems([])

    showToast({
      type: "success",
      title: "Order Placed Successfully! 🎉",
      message: `Your order has been confirmed. You'll receive updates via email.`,
    })

    // Show additional eco message if eco delivery was chosen
    if (orderData.delivery === "eco") {
      setTimeout(() => {
        showToast({
          type: "success",
          title: "Thank you for choosing eco-delivery! 🌱",
          message: "You've helped reduce carbon emissions and earned bonus points!",
        })
      }, 2000)
    }
  }

  const earnGreenPoints = (points) => {
    setGreenPoints((prev) => prev + points)
    setShowCoinNotification(true)
    setTimeout(() => setShowCoinNotification(false), 3000)

    // Check for goal progress
    updateGoalProgress(points)
  }

  const updateGoalProgress = (points) => {
    setSustainabilityGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === 2) {
          // Sustainable Shopping Streak
          const newProgress = Math.min(goal.progress + 1, goal.target)
          if (newProgress === goal.target && goal.progress < goal.target) {
            earnEcoBadge("Green Shopper")
            showToast({
              type: "success",
              title: "Goal Completed! 🎉",
              message: `You've completed the ${goal.title} goal!`,
            })
          }
          return { ...goal, progress: newProgress }
        }
        return goal
      }),
    )
  }

  const earnEcoBadge = (badgeName) => {
    setEcoBadges((prev) => prev.map((badge) => (badge.name === badgeName ? { ...badge, earned: true } : badge)))
    setShowEcoBadgeModal(true)
    setTimeout(() => setShowEcoBadgeModal(false), 4000)
  }

  const handleEcoDeliveryChoice = () => {
    earnGreenPoints(25)
    setShowEcoDelivery(false)
    showToast({
      type: "success",
      title: "Eco-Delivery Selected! 🌱",
      message: "You earned 25 Green Points for choosing eco-friendly delivery",
    })
  }

  const showToast = (notification) => {
    setToastNotification(notification)
    setTimeout(() => setToastNotification(null), 4000)
  }

  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    setUser(userData)
    setShowAuthModal(false)
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userData", JSON.stringify(userData))
    showToast({
      type: "success",
      title: "Welcome! 👋",
      message: `Hello ${userData.name}, you're now logged in`,
    })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userData")
    showToast({
      type: "info",
      title: "Logged Out",
      message: "You have been successfully logged out",
    })
  }

  const handleNotificationAction = (notification) => {
    // Mark notification as read
    setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, unread: false } : n)))

    switch (notification.action) {
      case "expiry-action":
      case "urgent-action":
        setShowExpiryModal(true)
        break
      case "recipe-suggestion":
        setShowRecipeModal(true)
        break
      case "eco-disposal":
        showToast({
          type: "info",
          title: "Eco-Disposal Guide 🌱",
          message: "Check our comprehensive guide for sustainable disposal options",
        })
        setShowTradeInModal(true)
        break
      case "trade-in":
        setShowTradeInModal(true)
        break
      case "view-badge":
        setShowEcoBadgeModal(true)
        break
      default:
        break
    }
  }

  // Periodic eco-reminders and tips
  useEffect(() => {
    const sendEcoReminders = () => {
      const ecoTips = [
        {
          type: "eco",
          title: "🌱 Daily Eco Tip",
          message: "Did you know? Composting food scraps can reduce household waste by up to 30%!",
          action: "learn-more",
        },
        {
          type: "trade-in",
          title: "♻️ Packaging Reminder",
          message: "Don't forget to trade in your empty containers for Green Points and recycling credits!",
          action: "trade-in",
        },
        {
          type: "recipe",
          title: "👨‍🍳 Reduce Food Waste",
          message: "Transform your leftovers into new meals! Check our recipe suggestions.",
          action: "recipe-suggestion",
        },
        {
          type: "eco",
          title: "🌍 Sustainability Goal",
          message: "You're 3 eco-purchases away from your monthly sustainability goal!",
          action: "view-goals",
        },
      ]

      if (Math.random() > 0.7) {
        // 30% chance
        const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)]
        const newNotification = {
          id: Date.now() + Math.random(),
          ...randomTip,
          date: "Now",
          unread: true,
        }

        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)])

        showToast({
          type: "info",
          title: randomTip.title,
          message: randomTip.message,
        })
      }
    }

    const interval = setInterval(sendEcoReminders, 120000) // Every 2 minutes
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "dark bg-gray-900"
          : sustainableMode
            ? "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100"
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100"
      }`}
    >
      <ShoppingHeader
        sustainableMode={sustainableMode}
        darkMode={darkMode}
        greenPoints={greenPoints}
        cartItems={cartItems}
        notifications={notifications}
        isAuthenticated={isAuthenticated}
        user={user}
        onDashboardClick={() => setShowDashboard(true)}
        onImageUploadClick={() => setShowImageUpload(true)}
        onSearchClick={() => setShowSearchModal(true)}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onDarkModeToggle={() => setDarkMode(!darkMode)}
        onNotificationAction={handleNotificationAction}
        onUpdateCartQuantity={updateCartQuantity}
        onRemoveFromCart={removeFromCart}
      />

      <SustainabilityToggle sustainableMode={sustainableMode} onToggle={setSustainableMode} darkMode={darkMode} />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <AnimatePresence mode="wait">
          {showDashboard ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EcoDashboard
                onClose={() => setShowDashboard(false)}
                onTradeInClick={() => setShowTradeInModal(true)}
                greenPoints={greenPoints}
                user={user}
                darkMode={darkMode}
                ecoBadges={ecoBadges}
                sustainabilityGoals={sustainabilityGoals}
                expiringItems={expiringItems}
                onRecipeClick={() => setShowRecipeModal(true)}
                onExpiryClick={() => setShowExpiryModal(true)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`text-3xl md:text-5xl font-bold mb-4 ${
                    darkMode ? "text-white" : sustainableMode ? "text-green-800" : "text-blue-900"
                  }`}
                >
                  {sustainableMode ? "🌱 EcoMart - Sustainable Living" : "🛍️ Walmart - Smart Shopping"}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`text-lg md:text-xl max-w-2xl mx-auto ${
                    darkMode ? "text-gray-300" : sustainableMode ? "text-green-700" : "text-blue-700"
                  }`}
                >
                  {sustainableMode
                    ? "Discover eco-friendly products with BPA-free, organic, and sustainable certifications"
                    : "Find everything you need at great prices with smart recommendations and fast delivery"}
                </motion.p>
                {isAuthenticated && user && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className={`mt-4 p-4 rounded-xl shadow-lg inline-block backdrop-blur-sm ${
                      sustainableMode ? "bg-green-100/80 dark:bg-green-900/80" : "bg-white/80 dark:bg-gray-800/80"
                    }`}
                  >
                    <p className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                      Welcome back, {user.name}! 👋
                    </p>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      You have {greenPoints} Green Points • {ecoBadges.filter((b) => b.earned).length} Eco Badges
                    </p>
                  </motion.div>
                )}
              </div>

              <ProductGrid
                sustainableMode={sustainableMode}
                darkMode={darkMode}
                onAddToCart={addToCart}
                onEcoDelivery={() => setShowEcoDelivery(true)}
                onRecipeClick={() => setShowRecipeModal(true)}
                onEarnPoints={earnGreenPoints}
                isAuthenticated={isAuthenticated}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showEcoDelivery && (
          <EcoDeliveryModal
            onClose={() => setShowEcoDelivery(false)}
            onChooseEco={handleEcoDeliveryChoice}
            darkMode={darkMode}
          />
        )}

        {showRecipeModal && (
          <RecipeModal onClose={() => setShowRecipeModal(false)} darkMode={darkMode} expiringItems={expiringItems} />
        )}

        {showTradeInModal && (
          <TradeInModal onClose={() => setShowTradeInModal(false)} onEarnPoints={earnGreenPoints} darkMode={darkMode} />
        )}

        {showImageUpload && (
          <ImageUploadModal
            onClose={() => setShowImageUpload(false)}
            onEarnPoints={earnGreenPoints}
            darkMode={darkMode}
          />
        )}

        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} darkMode={darkMode} />
        )}

        {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} darkMode={darkMode} />}

        {showEcoBadgeModal && (
          <EcoBadgeModal
            badge={ecoBadges.find((b) => b.name === "Green Shopper")}
            onClose={() => setShowEcoBadgeModal(false)}
            darkMode={darkMode}
          />
        )}

        {showExpiryModal && (
          <ExpiryNotificationModal
            onClose={() => setShowExpiryModal(false)}
            expiringItems={expiringItems}
            darkMode={darkMode}
            onRecipeClick={() => {
              setShowExpiryModal(false)
              setShowRecipeModal(true)
            }}
            onTradeInClick={() => {
              setShowExpiryModal(false)
              setShowTradeInModal(true)
            }}
          />
        )}

        {showCheckoutModal && (
          <CheckoutModal
            onClose={() => setShowCheckoutModal(false)}
            cartItems={cartItems}
            darkMode={darkMode}
            sustainableMode={sustainableMode}
            onOrderComplete={handleOrderComplete}
            onEarnPoints={earnGreenPoints}
          />
        )}
      </AnimatePresence>

      {/* Notifications */}
      <AnimatePresence>
        {showCoinNotification && <CoinNotification points={25} darkMode={darkMode} />}

        {toastNotification && (
          <NotificationToast notification={toastNotification} onClose={() => setToastNotification(null)} />
        )}
      </AnimatePresence>

      {/* Chatbot */}
      <Chatbot darkMode={darkMode} />
    </div>
  )
}
