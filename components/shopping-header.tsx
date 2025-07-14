"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ShoppingCart, Bell, User, Moon, Sun, Camera, Recycle, BarChart3, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { CartDropdown } from "@/components/cart-dropdown"

interface ShoppingHeaderProps {
  sustainableMode: boolean
  darkMode: boolean
  greenPoints: number
  cartItems: any[]
  notifications: any[]
  isAuthenticated: boolean
  user: any
  onDashboardClick: () => void
  onImageUploadClick: () => void
  onSearchClick: () => void
  onAuthClick: () => void
  onLogout: () => void
  onDarkModeToggle: () => void
  onNotificationAction?: (notification: any) => void
  onUpdateCartQuantity?: (id: number, quantity: number) => void
  onRemoveFromCart?: (id: number) => void
}

export function ShoppingHeader({
  sustainableMode = false,
  darkMode = false,
  greenPoints = 0,
  cartItems = [],
  notifications = [],
  isAuthenticated = false,
  user = null,
  onDashboardClick,
  onImageUploadClick,
  onSearchClick,
  onAuthClick,
  onLogout,
  onDarkModeToggle,
  onNotificationAction,
  onUpdateCartQuantity,
  onRemoveFromCart,
}: ShoppingHeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const unreadCount = notifications?.filter((n) => n.unread)?.length || 0
  const urgentCount = notifications?.filter((n) => n.type === "urgent" && n.unread)?.length || 0
  const cartCount = cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0

  const HeaderButton = ({ children, onClick, className = "", badge = null, urgent = false }) => (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={`relative transition-all duration-200 hover:scale-105 ${
        darkMode
          ? "text-gray-300 hover:text-white hover:bg-gray-700"
          : sustainableMode
            ? "text-green-700 hover:text-green-800 hover:bg-green-100"
            : "text-blue-700 hover:text-blue-800 hover:bg-blue-100"
      } ${className}`}
    >
      {children}
      {badge && (
        <Badge
          className={`absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs ${
            urgent
              ? "bg-red-500 text-white animate-pulse"
              : sustainableMode
                ? "bg-green-600 text-white"
                : "bg-blue-600 text-white"
          }`}
        >
          {badge}
        </Badge>
      )}
    </Button>
  )

  const MobileNavItem = ({ icon: Icon, label, onClick, badge = null, urgent = false }) => (
    <Button
      variant="ghost"
      onClick={() => {
        onClick()
        setShowMobileMenu(false)
      }}
      className={`w-full justify-start relative ${
        darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon className="h-4 w-4 mr-3" />
      {label}
      {badge && (
        <Badge className={`ml-auto ${urgent ? "bg-red-500 animate-pulse" : "bg-blue-600"} text-white`}>{badge}</Badge>
      )}
    </Button>
  )

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        darkMode
          ? "bg-gray-900/90 border-gray-700"
          : sustainableMode
            ? "bg-green-50/90 border-green-200"
            : "bg-white/90 border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                sustainableMode ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              <span className="text-white font-bold text-lg">{sustainableMode ? "🌱" : "🛒"}</span>
            </div>
            <div>
              <h1
                className={`text-xl font-bold ${
                  darkMode ? "text-white" : sustainableMode ? "text-green-800" : "text-blue-800"
                }`}
              >
                {sustainableMode ? "EcoMart" : "Walmart"}
              </h1>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-400" : sustainableMode ? "text-green-600" : "text-blue-600"
                }`}
              >
                {sustainableMode ? "Sustainable Living" : "Save Money. Live Better."}
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <HeaderButton onClick={onSearchClick}>
              <Search className="h-5 w-5" />
            </HeaderButton>

            <HeaderButton onClick={onImageUploadClick}>
              <Camera className="h-5 w-5" />
            </HeaderButton>

            <HeaderButton
              onClick={() => setShowCart(!showCart)}
              badge={cartCount > 0 ? cartCount : null}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
            </HeaderButton>

            <HeaderButton
              onClick={() => setShowNotifications(!showNotifications)}
              badge={unreadCount > 0 ? unreadCount : null}
              urgent={urgentCount > 0}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {/* Add pulsing animation for urgent notifications */}
              {urgentCount > 0 && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                />
              )}
            </HeaderButton>

            <HeaderButton onClick={onDarkModeToggle}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </HeaderButton>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-4">
                {/* Green Points Display */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"
                  }`}
                >
                  🪙 {greenPoints.toLocaleString()}
                </motion.div>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback className={sustainableMode ? "bg-green-600" : "bg-blue-600"}>
                          {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email || "user@example.com"}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onDashboardClick}>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {}}>
                      <Recycle className="mr-2 h-4 w-4" />
                      <span>Trade-In</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                onClick={onAuthClick}
                className={`ml-4 ${
                  sustainableMode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}

            {/* Dropdowns */}
            {showNotifications && (
              <NotificationDropdown
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
                onNotificationAction={onNotificationAction}
                darkMode={darkMode}
              />
            )}

            {showCart && (
              <CartDropdown
                cartItems={cartItems}
                onClose={() => setShowCart(false)}
                onCartClick={() => console.log("Navigate to checkout")}
                onUpdateQuantity={onUpdateCartQuantity || (() => {})}
                onRemoveItem={onRemoveFromCart || (() => {})}
                darkMode={darkMode}
                sustainableMode={sustainableMode}
              />
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className={darkMode ? "bg-gray-900" : "bg-white"}>
                <div className="flex flex-col space-y-4 mt-8">
                  <MobileNavItem icon={Search} label="Search" onClick={onSearchClick} />
                  <MobileNavItem icon={Camera} label="Upload Image" onClick={onImageUploadClick} />
                  <MobileNavItem
                    icon={ShoppingCart}
                    label="Cart"
                    onClick={() => setShowCart(true)}
                    badge={cartCount > 0 ? cartCount : null}
                  />
                  <MobileNavItem
                    icon={Bell}
                    label="Notifications"
                    onClick={() => setShowNotifications(true)}
                    badge={unreadCount > 0 ? unreadCount : null}
                    urgent={urgentCount > 0}
                  />
                  <MobileNavItem
                    icon={darkMode ? Sun : Moon}
                    label={darkMode ? "Light Mode" : "Dark Mode"}
                    onClick={onDarkModeToggle}
                  />

                  {isAuthenticated ? (
                    <>
                      <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                        <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {user?.name || "User"}
                        </p>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          🪙 {greenPoints.toLocaleString()} Green Points
                        </p>
                      </div>
                      <MobileNavItem icon={BarChart3} label="Dashboard" onClick={onDashboardClick} />
                      <MobileNavItem icon={Recycle} label="Trade-In" onClick={() => {}} />
                      <MobileNavItem icon={LogOut} label="Log Out" onClick={onLogout} />
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        onAuthClick()
                        setShowMobileMenu(false)
                      }}
                      className={`w-full ${
                        sustainableMode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
