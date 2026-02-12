import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCustomersInfo } from '@/services/getCustomersInfo'

export const useCustomerStore = defineStore('customer', () => {
  const customerValues = ref<string[]>([])
  const customerLabels = ref([
    'Name',
    'Address',
    'Board line number',
    'Phone',
    'City',
    'State',
    'Website',
  ])

  async function fetchCustomerData(id: number): Promise<string[]> {
    try {
      const userData = await getCustomersInfo(id)
      customerValues.value = userData.slice(1, customerLabels.value.length + 1)
      return userData
    } catch (error) {
      console.error('Error fetching customer data:', error)
      throw error
    }
  }

  return { customerValues, customerLabels, fetchCustomerData }
})
