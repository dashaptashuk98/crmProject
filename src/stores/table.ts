// stores/recipes.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRecipes, type TableRecipe } from '@/services/getTableInfo'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref<TableRecipe[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRecipes(): Promise<TableRecipe[]> {
    loading.value = true
    error.value = null

    try {
      const recipesData = await getRecipes()
      recipes.value = recipesData
      return recipesData
    } catch (err) {
      error.value = 'Failed to load recipes'
      console.error('Error fetching recipes:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    recipes,
    loading,
    error,
    fetchRecipes,
  }
})
