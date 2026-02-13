import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getMasterInfo } from '@/services/getMasterInfo'

export const useMasterStore = defineStore('master', () => {
  const masterValues = ref<string[]>([])

  const masterLabels = [
    'Lead ID',
    'Company name',
    'Contact name',
    'Position',
    'Phone',
    'Additional phone',
    'Email',
    'City',
  ]

  async function fetchMasterData(userId: number): Promise<string[]> {
    try {
      const masterData = await getMasterInfo(userId)
      masterValues.value = masterData
      return masterData
    } catch (error) {
      console.error('Error fetching master data:', error)
      throw error
    }
  }

  return {
    masterValues,
    masterLabels,
    fetchMasterData,
  }
})
