<template>
  <div class="customer-info-container">
    <div class="customer__header">
      <h2 class="customer__title">{{ title }}</h2>
      <button class="copyBtn" @click="copyAllInfo">
        <img src="../assets/images/copy.svg" alt="Copy" />
      </button>
    </div>

    <Listbox
      :options="customerInfo"
      optionLabel="label"
      class="customer-listbox"
      listStyle="max-height: 250px"
    >
      <template #option="slotProps">
        <div class="customer-info-item">
          <div class="info-content">
            <span class="info-label">{{ slotProps.option.label }}</span>
            <span class="info-value">{{ slotProps.option.value }}</span>
          </div>
          <Divider class="item-divider" />
        </div>
      </template>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import Listbox from 'primevue/listbox'
import Divider from 'primevue/divider'
import { computed } from 'vue'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  title: string
  labels: string[]
  values: string[]
}>()

const customerInfo = computed(() => {
  return props.labels.map((label, index) => ({
    label,
    value: props.values[index] || '',
  }))
})

const toast = useToast()
const copyAllInfo = async () => {
  try {
    const textToCopy = customerInfo.value.map((item) => `${item.label}: ${item.value}`).join('\n')

    await navigator.clipboard.writeText(textToCopy)
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Information copied to clipboard!',
      life: 3000,
    })
  } catch (err) {
    console.error('Error copying text:', err)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to copy information',
      life: 3000,
    })
  }
}
</script>

<style scoped>
.customer-info-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  max-width: 815px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.customer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-shrink: 0;
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

.customer-listbox {
  border: none;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.customer-listbox :deep(.p-listbox-list-wrapper) {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.customer-listbox :deep(.p-listbox-list) {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.customer-listbox :deep(.p-listbox-item) {
  padding: 0 !important;
  border: none !important;
  display: block;
  margin: 0;
  border-radius: 0;
  cursor: default;
  transition: background-color 0.2s ease;
}

.customer-info-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Karla', sans-serif;
}

.info-content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  flex-shrink: 0;
}

.item-divider {
  margin: 0 !important;
  padding: 0 !important;
  flex-shrink: 0;
}

.customer-listbox :deep(.p-divider) {
  margin: 0;
  border-color: #eaeaea;
}

.customer-listbox :deep(.p-divider.p-divider-horizontal) {
  margin: 0;
  border-color: #eaeaea;
}

.customer-listbox :deep(.p-divider.p-divider-horizontal:before) {
  border-top: 1px solid #eaeaea;
}

.customer-listbox :deep(.p-listbox-item:last-child .item-divider) {
  display: none;
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

.info-label {
  font-weight: 600;
  color: #4b5563;
  min-width: 200px;
  padding-right: 20px;
  font-size: 16px;
  font-family: 'Karla', sans-serif;
}

.copyBtn {
  background-color: white;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  width: 24px;
  height: 24px;
  border: none;
  padding: 2px;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.copyBtn:hover {
  background-color: #f5f5f5;
}

.copyBtn:active {
  background-color: #e0e0e0;
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

@media (max-width: 768px) {
  .customer-info-container {
    padding: 15px;
    max-width: 100%;
  }

  .customer__header {
    margin-bottom: 15px;
  }

  .customer__title {
    font-size: 20px;
  }

  .info-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .info-label {
    min-width: auto;
    padding-right: 0;
    font-size: 14px;
    font-weight: 700;
  }

  .info-value {
    text-align: left;
    font-size: 14px;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .customer-info-container {
    padding: 10px;
  }

  .customer__title {
    font-size: 18px;
  }

  .info-label,
  .info-value {
    font-size: 14px;
  }
}
</style>
