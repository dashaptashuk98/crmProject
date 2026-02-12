import { api } from '.'

export const getMasterInfo = async (id: number): Promise<string[]> => {
  try {
    const { data } = await api.get(`products/${id}`)

    if (!data) {
      console.warn('No product found with ID', id)
      return []
    }
    const infoValues = Object.values(data) as string[]

    console.log('Product info values for ID', id, ':', infoValues)
    return infoValues
  } catch (error) {
    console.error('Error fetching master info:', error)
    throw error
  }
}
