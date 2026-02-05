<template>
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
      <CustomerInfoCard
        title="Customer information"
        :labels="customerLabels"
        :values="customerValues"
      />
      <CustomerInfoCard
        title="Customer information"
        :labels="masterLabels"
        :values="masterValues"
      />
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

    <DataTable
      :value="products"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      showGridlines
      tableStyle="min-width: 50rem"
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
import { ref, onMounted } from 'vue'
import { getCustomersInfo } from '@/services/getCustomersInfo'
import { getMasterInfo } from '@/services/getMasterInfo'
import { getRecipes, type TableRecipe } from '@/services/getTableInfo'

const customerValuesNew = ref<string[]>([])
const customerValues = ref<string[]>([])
const masterValues = ref<string[]>([])
const products = ref<TableRecipe[]>([])

const customerLabels = ref([
  'Name',
  'Address',
  'Board line number',
  'Phone',
  'City',
  'State',
  'Website',
])

const masterLabels = ref([
  'Lead ID',
  'Company name',
  'Contact name',
  'Position',
  'Phone',
  'Additional phone',
  'Email',
  'City',
])

onMounted(async () => {
  try {
    const userData = await getCustomersInfo()
    customerValues.value = userData.slice(1, customerLabels.value.length + 1)
    customerValuesNew.value = userData
    const userId = Number(userData[0])
    const productData = await getMasterInfo(userId)
    masterValues.value = productData
    const recipesData = await getRecipes()
    products.value = recipesData
  } catch (err) {
    console.error('Error loading customer data:', err)
  }
})
</script>

<style scoped>
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

.wrapp {
  display: flex;
  gap: 14px;
  background-color: rgba(143, 106, 254, 1);
  padding: 17px;
  border-radius: 10px;
  margin-bottom: 20px;
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
  margin-bottom: 20px;
}

.new__container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 55px;
  gap: 20px;
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

@media (max-width: 940px) {
  .top-section {
    flex-direction: column;
    align-items: stretch;
  }

  .button__container {
    justify-content: flex-start;
  }

  .new__container {
    flex-direction: column;
  }
}
</style>
