"use client"

import { useEffect, useRef } from "react"
import { X, Clock, Award, AlertTriangle, Bell, Leaf, ChefHat, Recycle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NotificationDropdownProps {
  notifications: any[]
  onClose: () => void
  onNotificationAction?: (notification: any) => void
  darkMode?: boolean
}

export function NotificationDropdown({
  notifications,
  onClose,
  onNotificationAction,
  darkMode = false,
}: NotificationDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const getIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "eco":
        return <Leaf className="w-4 h-4 text-green-500" />
      case "achievement":
        return <Award className="w-4 h-4 text-purple-500" />
      case "expiry":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "recipe":
        return <ChefHat className="w-4 h-4 text-blue-500" />
      case "trade-in":
        return <Recycle className="w-4 h-4 text-emerald-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getBackgroundColor = (type: string, unread: boolean) => {
    if (!unread) return darkMode ? "bg-gray-800" : "bg-gray-50"
    switch (type) {
      case "urgent":
      case "expiry":
        return darkMode ? "bg-red-900/20 border-l-4 border-red-500" : "bg-red-50 border-l-4 border-red-500"
      case "eco":
        return darkMode ? "bg-green-900/20 border-l-4 border-green-500" : "bg-green-50 border-l-4 border-green-500"
      case "achievement":
        return darkMode ? "bg-purple-900/20 border-l-4 border-purple-500" : "bg-purple-50 border-l-4 border-purple-500"
      case "recipe":
        return darkMode ? "bg-blue-900/20 border-l-4 border-blue-500" : "bg-blue-50 border-l-4 border-blue-500"
      default:
        return darkMode ? "bg-gray-800" : "bg-gray-50"
    }
  }

  const handleNotificationClick = (notification: any) => {
    if (onNotificationAction && notification.action) {
      onNotificationAction(notification)
    }
  }

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-full mt-3 w-80 sm:w-96 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-xl border z-50 max-h-96 overflow-hidden`}
    >
      <div
        className={`flex items-center justify-between p-4 border-b ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"} rounded-t-xl`}
      >
        <h3 className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Notifications</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className={`p-6 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`p-4 border-b last:border-b-0 hover:bg-opacity-80 transition-colors cursor-pointer ${getBackgroundColor(notification.type, notification.unread)} ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-start gap-3">
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {notification.title}
                    </h4>
                    {notification.unread && <Badge className="h-2 w-2 p-0 bg-blue-500 rounded-full" />}
                  </div>
                  <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{notification.date}</p>
                    {notification.action && (
                      <Badge variant="outline" className="text-xs">
                        Tap to act
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
