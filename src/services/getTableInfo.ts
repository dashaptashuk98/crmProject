import { api } from '.'

export interface Recipe {
  id: number
  name: string
  userId: number
  cookTimeMinutes: number
  rating: number
  prepTimeMinutes: number
  difficulty: string
}

export interface TableRecipe {
  createDate: string
  product: string
  quantity: number
  amount: string
  paid: string
  pending: string
  status: string
}

export const getRecipes = async (limit: number = 30, skip: number = 0): Promise<TableRecipe[]> => {
  try {
    const { data } = await api.get(`recipes?limit=${limit}&skip=${skip}`)

    console.log('Recipes API response:', data)

    if (!data || !data.recipes || !Array.isArray(data.recipes)) {
      console.warn('No recipes data received')
      return []
    }

    const tableRecipes: TableRecipe[] = data.recipes.map((recipe: Recipe) => ({
      createDate: String(recipe.id),
      product: recipe.name,
      quantity: recipe.userId,
      amount: String(recipe.cookTimeMinutes),
      paid: String(recipe.rating),
      pending: String(recipe.prepTimeMinutes),
      status: recipe.difficulty,
    }))

    return tableRecipes
  } catch (error) {
    console.error('Error fetching recipes:', error)
    throw error
  }
}
