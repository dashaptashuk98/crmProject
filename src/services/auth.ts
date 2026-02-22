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
  // LOGIN - создание новой сессии/токена
  async login(credentials: { username: string; password: string }) {
    const { data } = await api.post<LoginResponse>('auth/login', credentials)
    //                      ^^^^ POST - отправляем данные для создания
    return data
  },

  // REFRESH TOKEN - обновление существующего токена
  async refreshToken(refreshToken: string) {
    const { data } = await api.post<TokenResponse>('auth/refresh', {
      //                      ^^^^ POST - отправляем refresh token для получения нового
      refreshToken,
      expiresInMins: 30,
    })
    return data
  },

  // GET CURRENT USER - получение данных
  async getCurrentUser(token: string) {
    const { data } = await api.get<User>('auth/me', {
      //                      ^^^ GET - просто запрашиваем данные
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  },
}