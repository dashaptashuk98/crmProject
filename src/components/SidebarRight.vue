<template>
  <Panel class="sidebar sidebar--right">
    <div class="sidebar__icons">
      <img
        v-if="authStore.user?.image"
        class="sidebar__avatar"
        :src="authStore.user.image"
        alt="User avatar"
        width="40"
        height="40"
      />

      <div @click="handleAuthClick" class="sidebar__auth">
        <div v-if="!authStore.isAuthenticated" class="sidebar__auth-item">
          <img
            class="sidebar__auth-icon"
            src="../assets/images/user.svg"
            alt="Login"
            width="30"
            height="30"
          />
          <span class="sidebar__auth-text">Login</span>
        </div>

        <div v-else class="sidebar__auth-item">
          <img
            class="sidebar__auth-icon"
            src="../assets/images/login-svgrepo-com.svg"
            alt="Logout"
            width="30"
            height="30"
          />
          <span class="sidebar__auth-text">Logout</span>
        </div>
      </div>

      <img class="sidebar__icon" src="../assets/images/Vector.svg" alt="" width="30" height="30" />
      <img
        class="sidebar__icon"
        src="../assets/images/question.svg"
        alt=""
        width="30"
        height="30"
      />
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
.sidebar--right {
  width: var(--sidebar-width);
  min-height: 100vh;
  border-radius: var(--border-radius-large);
  border-left: 1px solid var(--surface-border);
  background: var(--surface-ground);
  padding: 1rem 0;
  box-shadow: -1px 3px 4.7px 0px #00000040;
  background: var(--color-background-secondary);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
}

.sidebar--right :deep(.p-panel-header) {
  display: none;
  padding: 0;
}

.sidebar--right :deep(.p-panel-content) {
  padding: 0;
  border: none;
  background: transparent;
}

.sidebar__icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.sidebar__avatar {
  border-radius: 50%;
  margin-bottom: 69px;
}

.sidebar__auth-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.sidebar__auth-item:hover {
  background-color: #eae8f0;
}

.sidebar__auth-text {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: var(--color-text-light);
  font-weight: 500;
}

@media (max-width: 1024px) {
  .sidebar--right {
    width: var(--sidebar-width-tablet);
  }
}

@media (max-width: 768px) {
  .sidebar--right {
    width: var(--sidebar-width-mobile);
    padding: 0.5rem 0;
  }

  .sidebar__avatar {
    width: 30px;
    height: 30px;
    margin-bottom: 40px;
  }

  .sidebar__icon {
    width: 24px !important;
    height: 24px !important;
  }

  .sidebar__icons {
    gap: 0.5rem;
  }

  .sidebar__auth-text {
    font-size: 10px;
  }
}
</style>
