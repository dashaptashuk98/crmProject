<template>
  <Panel class="sidebar-panel">
    <div class="sidebar-icons">
      <img
        class="sidebar-element"
        src="../assets/images/icons/top.svg"
        alt=""
        width="40"
        height="40"
      />
      <div
        v-for="item in menuItems"
        :key="item.name"
        class="icon-wrapper"
        :class="{ active: isActive(item.to) }"
        @click="navigateTo(item.to)"
        :title="item.name"
      >
        <img :src="item.icon" :alt="item.name" class="icon-image" />
      </div>
    </div>
  </Panel>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel'
import { useRouter, useRoute } from 'vue-router'
import chartIcon from '@/assets/images/icons/chart.svg'
import homeIcon from '@/assets/images/icons/home.svg'
import moneyIcon from '@/assets/images/icons/money.svg'
import plusIcon from '@/assets/images/icons/plus.svg'
import tableIcon from '@/assets/images/icons/table.svg'

const router = useRouter()
const route = useRoute()

const menuItems = [
  { icon: homeIcon, name: 'home', to: '/' },
  { icon: tableIcon, name: 'table', to: '/draft' },
  { icon: chartIcon, name: 'chart', to: '/charts' },
  { icon: moneyIcon, name: 'money', to: '/finance' },
  { icon: plusIcon, name: 'plus', to: '/add' },
]

// Функция проверки активного маршрута
const isActive = (path: string) => {
  return route.path === path
}

// Функция навигации с проверкой
const navigateTo = (path: string) => {
  if (route.path !== path) {
    // Переходим только если уже не на этой странице
    console.log('Переход на:', path)
    router.push(path)
  } else {
    console.log('Уже на странице:', path)
  }
}
</script>

<style scoped>
.sidebar-panel {
  width: 80px;
  min-height: 100vh;
  border-radius: 10px;
  border-right: 1px solid var(--surface-border);
  background: var(--surface-ground);
  padding: 1rem 0;
  background-color: #8f6afe;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .sidebar-panel {
    width: 60px;
  }
}

@media (max-width: 768px) {
  .sidebar-panel {
    width: 50px;
    padding: 0.5rem 0;
  }

  .sidebar-element {
    width: 30px;
    height: 30px;
    padding: 8px 4px 7px 5px;
  }

  .icon-image {
    width: 24px;
    height: 24px;
  }

  .sidebar-icons {
    gap: 0.5rem;
  }
}

.sidebar-element {
  background-color: #545eba;
  padding: 10px 5px 9px 6px;
  border-radius: 50%;
}

.sidebar-panel :deep(.p-panel-header) {
  display: none;
  padding: 0;
}

.sidebar-panel :deep(.p-panel-content) {
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

.icon-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 0;
  cursor: pointer;
  transition: all 0.2s ease;

  margin: 0 0.5rem;
}

.icon-wrapper:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.icon-wrapper.active {
  background-color: rgba(149, 157, 232, 1);

  border-left: 4px solid rgba(97, 108, 204, 1);
}

.icon-wrapper.active .icon-image {
  opacity: 1;
  filter: brightness(0) invert(1); /* Делаем иконку белой */
}

.icon-image {
  width: 30px;
  height: 30px;
  object-fit: contain;
  transition: transform 0.2s ease;
  opacity: 0.7;
}

.icon-wrapper:hover .icon-image {
  transform: scale(1.1);
  opacity: 1;
}
</style>
