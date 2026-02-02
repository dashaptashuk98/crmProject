<script setup lang="ts">
import Panel from 'primevue/panel'
import router from './router'
import chartIcon from '@/assets/images/icons/chart.svg'
import homeIcon from '@/assets/images/icons/home.svg'
import moneyIcon from '@/assets/images/icons/money.svg'
import plusIcon from '@/assets/images/icons/plus.svg'
import tableIcon from '@/assets/images/icons/table.svg'
import Button from 'primevue/button'
import Listbox from 'primevue/listbox'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { ref } from 'vue'

const menuItems = [
  { icon: homeIcon, name: 'home', to: '/home' },
  { icon: tableIcon, name: 'table', to: '/table' },
  { icon: chartIcon, name: 'chart', to: '/' },
  { icon: moneyIcon, name: 'money', to: '/finance' },
  { icon: plusIcon, name: 'plus', to: '/add' },
]

const customerInfo = ref([
  { label: 'Name', value: 'Palma Pvt Ltd' },
  { label: 'Address', value: '548 Orn Isle, West Marline, NV 14898-4576' },
  { label: 'Board line number', value: '0192330076' },
  { label: 'Phone', value: '0192330076' },
  { label: 'City', value: 'West Marline' },
  { label: 'State', value: 'Nevada' },
  { label: 'Website', value: 'www.palma.com' },
])

const products = ref(['vghjk', 'dfvgh', 'xcvb'])

const selectedInfo = ref(null)

const navigateTo = (path: string) => {
  console.log('Переход на:', path)
  router.push(path)
}
</script>

<template>
  <div class="app-container">
    <Panel class="sidebar-panel">
      <div class="sidebar-icons">
        <img
          class="sidebar-element"
          src="../src/assets/images/icons/top.svg"
          alt=""
          width="40"
          height="40"
        />
        <div
          v-for="item in menuItems"
          :key="item.name"
          class="icon-wrapper"
          @click="navigateTo(item.to)"
          :title="item.name"
        >
          <img :src="item.icon" :alt="item.name" class="icon-image" />
        </div>
      </div>
    </Panel>

    <main class="main-content">
      <div class="main-container">
        <div class="top-section">
          <div class="title-section">
            <h1 class="title">Customer information</h1>
            <p class="description">Customer ID: 455123</p>
          </div>
          <div class="button__container">
            <Button
              label="Send email"
              :style="{ background: '#8F6AFE', borderColor: '#8F6AFE', fontFamily: 'Karla' }"
            />
            <Button
              icon="pi pi-angle-down"
              iconPos="right"
              label="Customize"
              :style="{ background: '#8F6AFE', borderColor: '#8F6AFE', fontFamily: 'Karla' }"
            />
          </div>
        </div>

        <div class="new__container">
          <div class="customer-info-container">
            <div class="customer__header">
              <h2 class="customer__title">Customer information</h2>
              <img src="../src/assets/images/copy.svg" alt="" />
            </div>

            <Listbox
              v-model="selectedInfo"
              :options="customerInfo"
              optionLabel="label"
              class="customer-listbox"
              listStyle="max-height: 250px"
            >
              <template #option="slotProps">
                <div class="customer-info-item">
                  <span class="info-label">{{ slotProps.option.label }}</span>
                  <span class="info-value">{{ slotProps.option.value }}</span>
                </div>
              </template>
            </Listbox>
          </div>
          <div class="customer-info-container">
            <div class="customer__header">
              <h2 class="customer__title">Customer information</h2>
              <img src="../src/assets/images/copy.svg" alt="" />
            </div>

            <Listbox
              v-model="selectedInfo"
              :options="customerInfo"
              optionLabel="label"
              class="customer-listbox"
              listStyle="max-height: 250px"
            >
              <template #option="slotProps">
                <div class="customer-info-item">
                  <span class="info-label">{{ slotProps.option.label }}</span>
                  <span class="info-value">{{ slotProps.option.value }}</span>
                </div>
              </template>
            </Listbox>
          </div>
        </div>
        <div class="button-wrapper">
          <Button
            icon="pi pi-angle-down"
            iconPos="right"
            label="Add"
            class="addBtn"
            :style="{ background: '#8F6AFE', borderColor: '#8F6AFE', fontFamily: 'Karla' }"
          />
        </div>
        <div class="wrapp">
          <img src="../src/assets/images/desc.svg" alt="" class="descImg" />
          <p class="descNew">Description</p>
        </div>
        <DataTable :value="products" tableStyle="min-width: 50rem">
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </div>
    </main>

    <Panel class="sidebar-panelLeft">
      <div class="sidebar-icons">
        <img
          class="sidebar-elementLeft"
          src="../src/assets/images/ca99c14197b2ade5241f70ab7bcb5bc558b84c81.jpg"
          alt=""
          width="40"
          height="40"
        />
        <img
          class="sidebar-el"
          src="../src/assets/images/login-svgrepo-com.svg"
          alt=""
          width="30"
          height="30"
        />
        <img class="sidebar-el" src="../src/assets/images/user.svg" alt="" width="30" height="30" />
        <img
          class="sidebar-el"
          src="../src/assets/images/Vector.svg"
          alt=""
          width="30"
          height="30"
        />
        <img
          class="sidebar-el"
          src="../src/assets/images/question.svg"
          alt=""
          width="30"
          height="30"
        />
      </div>
    </Panel>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f5f4f8;
}

.main-container {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.title-section {
  flex: 1;
  min-width: 300px;
}

.customer__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.customer__title {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  margin: 0 0 0px 12px;
  color: #353535;
}

.title {
  font-family: 'Sora';
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 43px;
  margin: 0 0 8px 0;
  color: #8f6afe;
}

.description {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #353535;
  margin: 0;
}

.button__container {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.customer-info-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-width: 815px;
  width: 100%;
}

.customer-listbox {
  border: none;
  flex: 1;
  min-height: 0;
}

.customer-listbox :deep(.p-listbox-list-wrapper) {
  height: 100%;
  overflow: auto;
}

.customer-listbox :deep(.p-listbox-list-wrapper::-webkit-scrollbar) {
  width: 6px;
}

.customer-listbox :deep(.p-listbox-list-wrapper::-webkit-scrollbar-track) {
  background: #f0f0f0;
  border-radius: 10px;
}

.customer-listbox :deep(.p-listbox-list-wrapper::-webkit-scrollbar-thumb) {
  background: rgba(167, 167, 251, 1) !important;
  border-radius: 10px;
}

.customer-listbox :deep(.p-listbox-list-wrapper::-webkit-scrollbar-thumb:hover) {
  background: rgba(167, 167, 251, 1) !important;
}

.customer-listbox :deep(*::-webkit-scrollbar) {
  width: 6px;
}

.customer-listbox :deep(*::-webkit-scrollbar-track) {
  background: #f0f0f0;
  border-radius: 10px;
}

.customer-listbox :deep(*::-webkit-scrollbar-thumb) {
  background: rgba(167, 167, 251, 1) !important;
  border-radius: 10px;
}

.customer-listbox :deep(*::-webkit-scrollbar-thumb:hover) {
  background: rgba(167, 167, 251, 1) !important;
}

.customer-listbox :deep(.p-listbox-item) {
  padding: 18px 24px;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  border-radius: 0;
  cursor: default;
  transition: background-color 0.2s ease;
}

.wrapp {
  display: flex;
  gap: 14px;
  background-color: rgba(143, 106, 254, 1);
  padding: 17px;
  border-radius: 10px;
}

.addBtn {
  margin-left: auto;
  align-self: flex-end;
  margin-bottom: 20px;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.new__container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 55px;
}

.customer-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-family: 'Karla', sans-serif;
}

.info-label {
  font-weight: 600;
  color: #4b5563;
  min-width: 200px;
  padding-right: 20px;
  font-size: 16px;
  font-family: 'Karla', sans-serif;
}

.info-value {
  color: #111827;
  font-weight: 400;
  flex: 1;
  text-align: right;
  word-break: break-word;
  font-size: 16px;
  font-family: 'Karla', sans-serif;
}

.info-value a {
  color: #8f6afe;
  text-decoration: none;
  font-weight: 500;
}

.info-value a:hover {
  text-decoration: underline;
}

.sidebar-panel {
  width: 80px;
  min-height: 100vh;
  border-radius: 10px;
  border-right: 1px solid var(--surface-border);
  background: var(--surface-ground);
  padding: 1rem 0;
  background-color: #8f6afe;
}

.descNew {
  font-family: 'Sora';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  color: #ffffff;
  margin: 0;
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
  border-radius: 8px;
  margin: 0 0.5rem;
}

.icon-wrapper:hover {
  background-color: rgba(255, 255, 255, 0.1);
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

.icon-wrapper.active {
  background-color: var(--primary-color);
}

.icon-wrapper.active .icon-image {
  filter: brightness(0) invert(1);
  opacity: 1;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.sidebar-panelLeft {
  width: 80px;
  min-height: 100vh;
  border-radius: 10px;
  border-left: 1px solid var(--surface-border);
  background: var(--surface-ground);
  padding: 1rem 0;
  box-shadow: -1px 3px 4.7px 0px #00000040;
  background: #f5f4f8;
}

.sidebar-panelLeft :deep(.p-panel-header) {
  display: none;
  padding: 0;
}

.sidebar-elementLeft {
  border-radius: 50%;
  margin-bottom: 69px;
}

.sidebar-panelLeft :deep(.p-panel-content) {
  padding: 0;
  border: none;
  background: transparent;
}

/* Адаптивность */
@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
    align-items: stretch;
  }

  .button__container {
    justify-content: flex-start;
  }

  .customer-info-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .info-label {
    min-width: auto;
    padding-right: 0;
  }

  .info-value {
    text-align: left;
    width: 100%;
  }
}
</style>
