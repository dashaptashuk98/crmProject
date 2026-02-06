import { api } from '.'
import type { User } from './auth'
export const getCustomersInfo = async (userId: number): Promise<string[]> => {
  const { data } = await api.get('users')

  const user = data.users.find((user: User) => user.id === userId)

  const targetUser = user || data.users[0]

  if (!targetUser) {
    throw new Error('User data not found')
  }

  const infoValues = Object.values(targetUser) as string[]
  return infoValues
}
