import { ref } from 'vue'
import { defineStore } from 'pinia'
import { authService, type User } from '@/services/auth'
import { AxiosError } from 'axios'

interface ApiError extends Error {
  response?: {
    status?: number
    data?: {
      message?: string
    }
  }
}

interface LoginResult {
  success: boolean
  user?: User
  error?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref(localStorage.getItem('token'))
  const refreshToken = ref(localStorage.getItem('refreshToken'))
  const isAuthenticated = ref(!!localStorage.getItem('token'))
  const isLoading = ref(false)

  async function login(credentials: { username: string; password: string }): Promise<LoginResult> {
    isLoading.value = true

    try {
      const data = await authService.login(credentials)
      const newToken = data.accessToken || data.token || ''
      const newRefreshToken = data.refreshToken || ''

      const { accessToken, token: _, refreshToken: __, ...userData } = data

      token.value = newToken
      refreshToken.value = newRefreshToken
      user.value = userData
      isAuthenticated.value = true

      localStorage.setItem('token', newToken)
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken)
      }

      return {
        success: true,
        user: userData,
      }
    } catch (error) {
      isAuthenticated.value = false

      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data?.message || error.message
          : error instanceof Error
            ? error.message
            : 'Login failed'

      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      isLoading.value = false
    }
  }

  async function refreshAccessToken(): Promise<string> {
    if (!refreshToken.value) throw new Error('No refresh token')

    try {
      const data = await authService.refreshToken(refreshToken.value)

      token.value = data.accessToken
      if (data.refreshToken) {
        refreshToken.value = data.refreshToken
      }

      localStorage.setItem('token', data.accessToken)
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken)
      }

      return data.accessToken
    } catch (error) {
      logout()
      throw error
    }
  }

  async function fetchCurrentUser(): Promise<User | null> {
    if (!token.value) {
      return null
    }

    isLoading.value = true

    try {
      const userData = await authService.getCurrentUser(token.value)
      user.value = userData
      isAuthenticated.value = true

      return userData
    } catch (error: unknown) {
      if (error && typeof error === 'object') {
        const apiError = error as ApiError

        if (apiError.response?.status === 401) {
          try {
            const newToken = await refreshAccessToken()
            const userData = await authService.getCurrentUser(newToken)
            user.value = userData
            isAuthenticated.value = true
            return userData
          } catch {
            logout()
            return null
          }
        }
      }
      return null
    } finally {
      isLoading.value = false
    }
  }

  function logout(): void {
    user.value = null
    token.value = null
    refreshToken.value = null
    isAuthenticated.value = false

    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  }

  const fullName = () => {
    if (!user.value) return ''
    return `${user.value.firstName} ${user.value.lastName}`
  }

  return {
    user,
    token,
    refreshToken,
    isAuthenticated,
    isLoading,
    login,
    refreshAccessToken,
    fetchCurrentUser,
    logout,
    fullName,
  }
})
