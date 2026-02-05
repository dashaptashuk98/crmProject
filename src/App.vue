<template>
  <div class="app-container">
    <SidebarLeft />

    <main class="main-content">
      <AuthModal />
      <Toast />
      <RouterView />
    </main>

    <SidebarRight />
  </div>
</template>

<script setup lang="ts">
import SidebarLeft from '@/components/SidebarLeft.vue'
import SidebarRight from '@/components/SidebarRight.vue'
import Toast from 'primevue/toast'
import AuthModal from '@/components/AuthModal.vue'
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

/* Адаптивность */
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
