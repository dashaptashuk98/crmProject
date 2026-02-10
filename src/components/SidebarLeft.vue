<template>
  <Panel class="sidebar sidebar--left">
    <div class="sidebar__icons">
      <img
        class="sidebar__logo"
        src="../assets/images/icons/top.svg"
        alt=""
        width="40"
        height="40"
      />
      <div
        v-for="item in menuItems"
        :key="item.name"
        class="sidebar__item"
        :class="{ 'sidebar__item--active': isActive(item.to) }"
        @click="navigateTo(item.to)"
        :title="item.name"
      >
        <img :src="item.icon" :alt="item.name" class="sidebar__icon" />
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

const isActive = (path: string) => {
  return route.path === path
}

const navigateTo = (path: string) => {
  if (route.path !== path) {
    console.log('Переход на:', path)
    router.push(path)
  } else {
    console.log('Уже на странице:', path)
  }
}
</script>

<style scoped>
.sidebar--left {
  width: var(--sidebar-width);
  min-height: 100vh;
  border-radius: var(--border-radius-large);
  border-right: 1px solid var(--surface-border);
  background: var(--surface-ground);
  padding: 1rem 0;
  background-color: var(--color-primary);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .sidebar--left {
    width: var(--sidebar-width-tablet);
  }
}

@media (max-width: 768px) {
  .sidebar--left {
    width: var(--sidebar-width-mobile);
    padding: 0.5rem 0;
  }

  .sidebar__logo {
    width: 30px;
    height: 30px;
    padding: 8px 4px 7px 5px;
  }

  .sidebar__icon {
    width: 24px;
    height: 24px;
  }

  .sidebar__icons {
    gap: 0.5rem;
  }
}

.sidebar__logo {
  background-color: var(--color-background-accent);
  padding: 10px 5px 9px 6px;
  border-radius: 50%;
}

.sidebar--left :deep(.p-panel-header) {
  display: none;
  padding: 0;
}

.sidebar--left :deep(.p-panel-content) {
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

.sidebar__item {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 0;
  cursor: pointer;
  transition: all 0.2s ease;

  margin: 0 0.5rem;
}

.sidebar__item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar__item--active {
  background-color: rgba(149, 157, 232, 1);

  border-left: 4px solid rgba(97, 108, 204, 1);
}

.sidebar__item--active .sidebar__icon {
  opacity: 1;
  filter: brightness(0) invert(1);
}

.sidebar__icon {
  width: 30px;
  height: 30px;
  object-fit: contain;
  transition: transform 0.2s ease;
  opacity: 0.7;
}

.sidebar__item:hover .sidebar__icon {
  transform: scale(1.1);
  opacity: 1;
}
</style>
