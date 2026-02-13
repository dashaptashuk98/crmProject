<template>
  <div class="customer">
    <LoaderComponent :isLoading="isLoading" fullscreen text="Loading..." />
    <div class="customer__header">
      <div class="customer__title-wrapper">
        <h1 class="customer__title">Customer information</h1>
        <p class="customer__subtitle">Customer ID: 455123</p>
      </div>
      <div class="customer__actions">
        <Button
          label="Send email"
          :style="{
            background: 'var(--color-primary)',
            borderColor: 'var(--color-primary)',
            fontFamily: 'Karla',
          }"
        />

        <Button
          icon="pi pi-angle-down"
          iconPos="right"
          label="Customize"
          :style="{
            background: 'var(--color-primary)',
            borderColor: 'var(--color-primary)',
            fontFamily: 'Karla',
          }"
        />
      </div>
    </div>

    <div class="customer__info-grid">
      <CustomerInfoCard
        title="Customer information"
        :labels="customerStore.customerLabels"
        :values="customerStore.customerValues"
      />
      <CustomerInfoCard
        title="Master contact detail"
        :labels="masterStore.masterLabels"
        :values="masterStore.masterValues"
      />
    </div>

    <div class="customer__add-button">
      <Button
        icon="pi pi-angle-down"
        iconPos="right"
        label="Add"
        class="customer__add-btn"
        :style="{
          background: 'var(--color-primary)',
          borderColor: 'var(--color-primary)',
          fontFamily: 'Karla',
        }"
      />
    </div>

    <div class="customer__description">
      <img src="../assets/images/desc.svg" alt="" class="customer__description-icon" />
      <p class="customer__description-text">Description</p>
    </div>

    <DataTable
      :key="recipesStore.recipes.length"
      :value="recipesStore.recipes"
      :loading="recipesStore.loading"
      paginator
      lazy
      :rows="currentRows"
      :rowsPerPageOptions="[5, 10]"
      :totalRecords="recipesStore.totalRecords"
      @page="onPage"
      @update:rows="onRowsChange"
      showGridlines
      tableStyle="min-width: 50rem"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    >
      <Column field="createDate" header="Create date"></Column>
      <Column field="product" header="Product"></Column>
      <Column field="quantity" header="Quantity"></Column>
      <Column field="amount" header="Product amount"></Column>
      <Column field="paid" header="Total paid"></Column>
      <Column field="pending" header="Pending amount"></Column>
      <Column field="status" header="Order status"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import CustomerInfoCard from '@/components/CustomerInfoCard.vue'
import { ref, onMounted, watch } from 'vue'
import LoaderComponent from '@/components/LoaderComponent.vue'
import { useCustomerStore } from '@/stores/customer'
import { useMasterStore } from '@/stores/master'
import { useRecipesStore } from '@/stores/table'
import type { DataTablePageEvent } from 'primevue/datatable'

import { useAuthStore } from '@/stores/auth'

const recipesStore = useRecipesStore()
const customerStore = useCustomerStore()
const masterStore = useMasterStore()
const authStore = useAuthStore()
const isLoading = ref(false)

const currentPage = ref(1)
const currentRows = ref(5)

function onPage(event: DataTablePageEvent) {
  const page = event.page + 1
  const rows = event.rows || currentRows.value
  currentPage.value = page
  currentRows.value = rows
  recipesStore.fetchRecipes(page, rows)
}

function onRowsChange(rows: number) {
  currentPage.value = 1
  currentRows.value = rows
  recipesStore.fetchRecipes(1, rows)
}

async function loadData() {
  isLoading.value = true
  try {
    const userId = authStore.user?.id || 1
    await customerStore.fetchCustomerData(userId)
    await masterStore.fetchMasterData(userId)
    await recipesStore.fetchRecipes(currentPage.value, currentRows.value)
  } catch (err) {
    console.error('Error loading customer data:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadData()
})

watch(
  () => authStore.user,
  () => {
    loadData()
  },
)
</script>
<style scoped>
.customer {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
}

.customer__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.customer__title-wrapper {
  flex: 1;
  min-width: 300px;
}

.customer__title {
  font-family: 'Sora';
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 43px;
  margin: 0 0 8px 0;
  color: var(--color-primary);
}

.customer__subtitle {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: var(--color-text-primary);
  margin: 0;
}

.customer__actions {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.customer__description {
  display: flex;
  gap: 14px;
  background-color: var(--color-primary);
  padding: 17px;
  border-radius: var(--border-radius-large);
  margin-bottom: 20px;
}

.customer__add-btn {
  margin-left: auto;
  align-self: flex-end;
  margin-bottom: 20px;
}

.customer__add-button {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 20px;
}

.customer__info-grid {
  display: flex;
  justify-content: space-between;
  margin-bottom: 55px;
  gap: 20px;
}

.customer__description-text {
  font-family: 'Sora';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  color: var(--color-text-inverse);
  margin: 0;
}

@media (max-width: 940px) {
  .customer__header {
    flex-direction: column;
    align-items: stretch;
  }

  .customer__actions {
    justify-content: flex-start;
  }

  .customer__info-grid {
    flex-direction: column;
  }
}
</style>
