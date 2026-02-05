import { api } from '.'

export const getCustomersInfo = async (): Promise<string[]> => {
  const { data } = await api.get('users')
  const info = data.users[0]
  const infoValues = Object.values(info) as string[]
  console.log(infoValues)
  return infoValues
}
