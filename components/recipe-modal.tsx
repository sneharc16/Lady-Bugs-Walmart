"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Users, ChefHat, X, ArrowLeft } from "lucide-react"

interface Recipe {
  id: number
  name: string
  image: string
  cookTime: string
  servings: number
  difficulty: string
  ingredients: string[]
  instructions: string[]
  category: string
  expiringItem?: string
}

interface RecipeModalProps {
  onClose: () => void
  darkMode?: boolean
  expiringItems?: Array<{
    id: number
    name: string
    category: string
    expiresIn: number
  }>
}

export function RecipeModal({ onClose, darkMode = false, expiringItems = [] }: RecipeModalProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  const recipes: Recipe[] = [
    {
      id: 1,
      name: "Banana Sour Cream Bread",
      image:
        "https://www.allrecipes.com/thmb/kcdxlIXhpJJUY08OMgsE1yLpX6U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6984-banana-sour-cream-bread-DDMFS-4x3-42e521007c6241ca9db1a870f93d70b4.jpg",
      cookTime: "1 hour 15 mins",
      servings: 8,
      difficulty: "Easy",
      category: "fruits",
      expiringItem: "Organic Bananas",
      ingredients: [
        "3 ripe bananas, mashed",
        "1/2 cup sour cream",
        "1/3 cup melted butter",
        "3/4 cup sugar",
        "1 egg, beaten",
        "1 teaspoon vanilla extract",
        "1 teaspoon baking soda",
        "Pinch of salt",
        "1 1/2 cups all-purpose flour",
      ],
      instructions: [
        "Preheat oven to 350°F (175°C). Grease a 9x5 inch loaf pan.",
        "In a large bowl, mix together mashed bananas, sour cream, and melted butter.",
        "Stir in sugar, beaten egg, and vanilla extract.",
        "Mix in baking soda and salt, then gradually add flour until just combined.",
        "Pour batter into prepared loaf pan.",
        "Bake for 60-65 minutes or until a toothpick inserted in center comes out clean.",
        "Cool in pan for 10 minutes, then turn out onto wire rack.",
      ],
    },
    {
      id: 2,
      name: "Greek Yogurt Parfait",
      image: "https://tealnotes.com/wp-content/uploads/2023/05/Greek-Yogurt-Parfait-1.jpg",
      cookTime: "10 mins",
      servings: 2,
      difficulty: "Easy",
      category: "dairy",
      expiringItem: "Greek Yogurt",
      ingredients: [
        "2 cups Greek yogurt",
        "1/4 cup honey",
        "1 cup mixed berries",
        "1/2 cup granola",
        "2 tablespoons chopped nuts",
        "1 teaspoon vanilla extract",
      ],
      instructions: [
        "Mix Greek yogurt with honey and vanilla extract.",
        "In glasses or bowls, layer yogurt mixture with berries.",
        "Add a layer of granola for crunch.",
        "Repeat layers as desired.",
        "Top with chopped nuts and extra berries.",
        "Serve immediately or chill for later.",
      ],
    },
    {
      id: 3,
      name: "Protein Berry Smoothie Bowl",
      image: "https://beginwithbalance.com/wp-content/uploads/2023/03/Protein-Berry-Smoothie-Bowl-1.jpg",
      cookTime: "5 mins",
      servings: 1,
      difficulty: "Easy",
      category: "fruits",
      expiringItem: "Organic Bananas",
      ingredients: [
        "1 frozen banana",
        "1/2 cup mixed berries",
        "1/2 cup Greek yogurt",
        "1 scoop protein powder",
        "1/4 cup almond milk",
        "Toppings: granola, coconut flakes, fresh berries",
      ],
      instructions: [
        "Add frozen banana, berries, yogurt, and protein powder to blender.",
        "Pour in almond milk gradually while blending.",
        "Blend until thick and creamy consistency.",
        "Pour into a bowl.",
        "Add your favorite toppings like granola and fresh berries.",
        "Enjoy immediately!",
      ],
    },
    {
      id: 4,
      name: "Classic French Toast",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpI0SLnPMEb4yObKtSq_y6Oi3N6e5GZ14sGw&s",
      cookTime: "20 mins",
      servings: 4,
      difficulty: "Easy",
      category: "bakery",
      expiringItem: "Whole Grain Bread",
      ingredients: [
        "8 slices bread (preferably day-old)",
        "4 large eggs",
        "1/2 cup milk",
        "2 tablespoons sugar",
        "1 teaspoon vanilla extract",
        "1/2 teaspoon cinnamon",
        "Pinch of salt",
        "Butter for cooking",
      ],
      instructions: [
        "Whisk together eggs, milk, sugar, vanilla, cinnamon, and salt.",
        "Heat butter in a large skillet over medium heat.",
        "Dip each bread slice in egg mixture, coating both sides.",
        "Cook in skillet for 2-3 minutes per side until golden brown.",
        "Serve hot with maple syrup, fresh fruit, or powdered sugar.",
        "Enjoy your delicious French toast!",
      ],
    },
    {
      id: 5,
      name: "Banana Smoothie",
      image: "https://www.allrecipes.com/thmb/t_riPnZmebKHytGtcoN8qeTmO_Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/221261-Peanut-Butter-Banana-Smoothie-DDMFS-4x3-79533eeb04c84b42aae440d643fc9a31.jpg",
      cookTime: "5 mins",
      servings: 2,
      difficulty: "Easy",
      category: "fruits",
      expiringItem: "Organic Bananas",
      ingredients: [
        "2 ripe bananas",
        "1 cup milk of choice",
        "1 tablespoon honey",
        "1/2 teaspoon vanilla",
        "Ice cubes",
        "Cinnamon for garnish",
      ],
      instructions: [
        "Peel and slice bananas.",
        "Add all ingredients to blender.",
        "Blend until smooth and creamy.",
        "Add ice for desired consistency.",
        "Pour into glasses and sprinkle with cinnamon.",
        "Serve immediately.",
      ],
    },
    {
      id: 6,
      name: "Bread Pudding",
      image: "https://realhousemoms.com/wp-content/uploads/Bread-Pudding-Recipe-with-Vanilla-Caramel-Sauce-RECIPE-CARD.jpg",
      cookTime: "45 mins",
      servings: 6,
      difficulty: "Medium",
      category: "bakery",
      expiringItem: "Whole Grain Bread",
      ingredients: [
        "6 cups cubed stale bread",
        "2 cups milk",
        "3 eggs",
        "1/2 cup sugar",
        "1 teaspoon vanilla",
        "1/2 teaspoon cinnamon",
        "1/4 cup raisins (optional)",
      ],
      instructions: [
        "Preheat oven to 350°F (175°C).",
        "Place bread cubes in greased baking dish.",
        "Whisk together milk, eggs, sugar, vanilla, and cinnamon.",
        "Pour mixture over bread and let soak for 15 minutes.",
        "Sprinkle with raisins if using.",
        "Bake for 35-40 minutes until set and golden.",
        "Serve warm with cream or ice cream.",
      ],
    },
  ]

  const getRelevantRecipes = () => {
    if (expiringItems.length === 0) return recipes

    return recipes.filter((recipe) =>
      expiringItems.some((item) => recipe.category === item.category || recipe.expiringItem === item.name),
    )
  }

  const relevantRecipes = getRelevantRecipes()

  if (selectedRecipe) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent
          className={`max-w-2xl max-h-[90vh] overflow-y-auto ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}
        >
          <DialogHeader>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRecipe(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Recipes
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="relative">
              <img
                src={selectedRecipe.image || "/placeholder.svg"}
                alt={selectedRecipe.name}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=256&width=400"
                }}
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-green-600 text-white">Uses: {selectedRecipe.expiringItem}</Badge>
              </div>
            </div>

            <div>
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                {selectedRecipe.name}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedRecipe.cookTime}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {selectedRecipe.servings} servings
                </div>
                <div className="flex items-center gap-1">
                  <ChefHat className="h-4 w-4" />
                  {selectedRecipe.difficulty}
                </div>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>Ingredients</h3>
              <ul className="space-y-2">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className={`flex items-start gap-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <span className="text-green-600 mt-1">•</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Instructions
              </h3>
              <ol className="space-y-3">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index} className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        className={`max-w-4xl max-h-[90vh] overflow-y-auto ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}
      >
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            🍳 Recipe Suggestions
          </DialogTitle>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Turn your expiring ingredients into delicious meals!
          </p>
        </DialogHeader>

        {expiringItems.length > 0 && (
          <div className="mb-6">
            <h3 className={`text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Your expiring items:
            </h3>
            <div className="flex flex-wrap gap-2">
              {expiringItems.map((item) => (
                <Badge key={item.id} variant="outline" className="text-orange-600 border-orange-300">
                  {item.name} (expires in {item.expiresIn} day{item.expiresIn !== 1 ? "s" : ""})
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relevantRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                darkMode ? "bg-gray-700 border-gray-600 hover:bg-gray-600" : "bg-white hover:bg-gray-50"
              }`}
              onClick={() => setSelectedRecipe(recipe)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.name}
                    className="w-full h-40 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=160&width=240"
                    }}
                  />
                  {recipe.expiringItem && (
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">
                      Uses: {recipe.expiringItem}
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{recipe.name}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {recipe.cookTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {recipe.servings}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {recipe.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={onClose}
            className={`${
              darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
            } text-gray-700 dark:text-gray-300`}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
