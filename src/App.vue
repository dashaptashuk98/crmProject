<template>
  <div class="app-container">
    <SidebarLeft />

    <main class="main-content">
      <AuthModal v-if="!authStore.isAuthenticated" @login="handleLogin" />

      <Toast />
      <RouterView />
    </main>

    <SidebarRight />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import SidebarLeft from '@/components/SidebarLeft.vue'
import SidebarRight from '@/components/SidebarRight.vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import AuthModal from '@/components/AuthModal.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const toast = useToast()

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    authStore.fetchCurrentUser().then((user) => {
      if (user) {
        showLoginSuccessToast(user.username)
      }
    })
  }
})

watch(
  () => authStore.isAuthenticated,
  (isAuthenticated, wasAuthenticated) => {
    if (isAuthenticated && !wasAuthenticated) {
      showLoginSuccessToast(authStore.user?.username || 'User')
    } else if (!isAuthenticated && wasAuthenticated) {
      showLogoutToast()
    }
  },
)

async function handleLogin(loginData: { username: string; password: string }) {
  const result = await authStore.login(loginData)

  if (!result.success) {
    toast.add({
      severity: 'error',
      summary: 'Login Failed',
      detail: result.error || 'Login failed. Please try again.',
      life: 3000,
    })
  }
}

function showLoginSuccessToast(username: string) {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: `Welcome, ${username}! You have successfully logged in.`,
    life: 3000,
  })
}

function showLogoutToast() {
  toast.add({
    severity: 'info',
    summary: 'Logged Out',
    detail: 'You have successfully logged out.',
    life: 3000,
  })
}
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f5f4f8;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  order: 2;
  margin-left: 80px;
  margin-right: 80px;
}

@media (max-width: 1024px) {
  .main-content {
    padding: 1rem;
    margin-left: 60px;
    margin-right: 60px;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
    margin-left: 50px;
    margin-right: 50px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.5rem;
    margin-left: 50px;
    margin-right: 50px;
  }
}
</style>
