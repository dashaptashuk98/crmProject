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

export const getRecipes = async (limit: number = 5, skip: number = 0) => {
  try {
    const { data } = await api.get(`recipes?limit=${limit}&skip=${skip}`)

    const tableRecipes: TableRecipe[] = data.recipes.map((recipe: Recipe) => ({
      createDate: String(recipe.id),
      product: recipe.name,
      quantity: recipe.userId,
      amount: String(recipe.cookTimeMinutes),
      paid: String(recipe.rating),
      pending: String(recipe.prepTimeMinutes),
      status: recipe.difficulty,
    }))

    return {
      recipes: tableRecipes,
      total: 30,
    }
  } catch (error) {
    console.error('Error fetching recipes:', error)
    throw error
  }
}
