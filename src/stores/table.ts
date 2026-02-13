import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getRecipes, type TableRecipe } from '@/services/getTableInfo'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref<TableRecipe[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalRecords = ref(0)

  async function fetchRecipes(page: number = 1, rows: number = 5) {
    loading.value = true
    error.value = null

    try {
      const skip = (page - 1) * rows
      console.log(`Fetching page ${page}, rows ${rows}, skip ${skip}`)

      const { recipes: recipesData, total } = await getRecipes(rows, skip)
      recipes.value = recipesData
      totalRecords.value = total
      return recipesData
    } catch (err) {
      error.value = 'Failed to load recipes'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    recipes,
    loading,
    error,
    totalRecords,
    fetchRecipes,
  }
})
