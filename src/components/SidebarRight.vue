<template>
  <Panel class="sidebar-panelLeft">
    <div class="sidebar-icons">
      <img
        v-if="authStore.user?.image"
        class="sidebar-elementLeft"
        :src="authStore.user.image"
        alt="User avatar"
        width="40"
        height="40"
      />

      <div @click="handleAuthClick">
        <div v-if="!authStore.isAuthenticated" class="auth-item">
          <img
            class="sidebar-el"
            src="../assets/images/user.svg"
            alt="Login"
            width="30"
            height="30"
          />
          <span class="auth-text">Login</span>
        </div>

        <div v-else class="auth-item">
          <img
            class="sidebar-el"
            src="../assets/images/login-svgrepo-com.svg"
            alt="Logout"
            width="30"
            height="30"
          />
          <span class="auth-text">Logout</span>
        </div>
      </div>

      <img class="sidebar-el" src="../assets/images/Vector.svg" alt="" width="30" height="30" />
      <img class="sidebar-el" src="../assets/images/question.svg" alt="" width="30" height="30" />
    </div>
  </Panel>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleAuthClick = () => {
  if (authStore.isAuthenticated) {
    authStore.logout()
  } else {
    console.log('Open login modal')
  }
}
</script>

<style scoped>
.sidebar-panelLeft {
  width: 80px;
  min-height: 100vh;
  border-radius: 10px;
  border-left: 1px solid var(--surface-border);
  background: var(--surface-ground);
  padding: 1rem 0;
  box-shadow: -1px 3px 4.7px 0px #00000040;
  background: #f5f4f8;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
}

.sidebar-panelLeft :deep(.p-panel-header) {
  display: none;
  padding: 0;
}

.sidebar-panelLeft :deep(.p-panel-content) {
  padding: 0;
  border: none;
  background: transparent;
}

.sidebar-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.sidebar-elementLeft {
  border-radius: 50%;
  margin-bottom: 69px;
}

.auth-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.auth-item:hover {
  background-color: #eae8f0;
}

.auth-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

@media (max-width: 1024px) {
  .sidebar-panelLeft {
    width: 60px;
  }
}

@media (max-width: 768px) {
  .sidebar-panelLeft {
    width: 50px;
    padding: 0.5rem 0;
  }

  .sidebar-elementLeft {
    width: 30px;
    height: 30px;
    margin-bottom: 40px;
  }

  .sidebar-el {
    width: 24px !important;
    height: 24px !important;
  }

  .sidebar-icons {
    gap: 0.5rem;
  }

  .auth-text {
    font-size: 10px;
  }
}
</style>
