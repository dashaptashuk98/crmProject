import { api } from '.'

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

type LoginResponse = User & {
  accessToken?: string
  token?: string
  refreshToken?: string
}

type TokenResponse = {
  accessToken: string
  refreshToken?: string
}

export const authService = {
  async login(credentials: { username: string; password: string }) {
    const { data } = await api.post<LoginResponse>('auth/login', credentials)
    return data
  },

  async refreshToken(refreshToken: string) {
    const { data } = await api.post<TokenResponse>('auth/refresh', {
      refreshToken,
      expiresInMins: 30,
    })
    return data
  },

  async getCurrentUser(token: string) {
    const { data } = await api.get<User>('auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  },
}
