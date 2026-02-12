<template>
  <div class="info-card">
    <div class="info-card__header">
      <h2 class="info-card__title">{{ title }}</h2>
      <button class="info-card__copy" @click="copyAllInfo">
        <img src="../assets/images/copy.svg" alt="Copy" />
      </button>
    </div>

    <Listbox
      :options="customerInfo"
      optionLabel="label"
      class="info-card__list"
      listStyle="max-height: 250px"
    >
      <template #option="slotProps">
        <div class="info-card__item">
          <div class="info-card__content">
            <span class="info-card__label">{{ slotProps.option.label }}</span>
            <span class="info-card__value">{{ slotProps.option.value }}</span>
          </div>
          <Divider class="info-card__divider" />
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
.info-card {
  background: var(--color-background);
  border-radius: var(--border-radius-extra);
  padding: 20px;
  box-shadow: var(--shadow-light);
  max-width: 815px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.info-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.info-card__title {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  margin: 0 0 0px 12px;
  color: var(--color-text-primary);
}

.info-card__list {
  border: none;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.info-card__list :deep(.p-listbox-list-wrapper) {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.info-card__list :deep(.p-listbox-list) {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.info-card__list :deep(.p-listbox-item) {
  padding: 0 !important;
  border: none !important;
  display: block;
  margin: 0;
  border-radius: 0;
  cursor: default;
  transition: background-color 0.2s ease;
}

.info-card__item {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Karla', sans-serif;
}

.info-card__content {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  flex-shrink: 0;
}

.info-card__divider {
  margin: 0 !important;
  padding: 0 !important;
  flex-shrink: 0;
}

.info-card__list :deep(.p-divider) {
  margin: 0;
  border-color: var(--color-divider);
}

.info-card__list :deep(.p-divider.p-divider-horizontal) {
  margin: 0;
  border-color: var(--color-divider);
}

.info-card__list :deep(.p-divider.p-divider-horizontal:before) {
  border-top: 1px solid var(--color-divider);
}

.info-card__list :deep(.p-listbox-item:last-child .info-card__divider) {
  display: none;
}

.info-card__list :deep(.p-listbox-list-wrapper::-webkit-scrollbar) {
  width: 6px;
}

.info-card__list :deep(.p-listbox-list-wrapper::-webkit-scrollbar-track) {
  background: #f0f0f0;
  border-radius: 10px;
}

.info-card__list :deep(.p-listbox-list-wrapper::-webkit-scrollbar-thumb) {
  background: var(--color-primary-light) !important;
  border-radius: 10px;
}

.info-card__list :deep(.p-listbox-list-wrapper::-webkit-scrollbar-thumb:hover) {
  background: var(--color-primary-light) !important;
}

.info-card__list :deep(*::-webkit-scrollbar) {
  width: 6px;
}

.info-card__list :deep(*::-webkit-scrollbar-track) {
  background: #f0f0f0;
  border-radius: 10px;
}

.info-card__list :deep(*::-webkit-scrollbar-thumb) {
  background: var(--color-primary-light) !important;
  border-radius: 10px;
}

.info-card__list :deep(*::-webkit-scrollbar-thumb:hover) {
  background: var(--color-primary-light) !important;
}

.info-card__label {
  font-weight: 600;
  color: #4b5563;
  min-width: 200px;
  padding-right: 20px;
  font-size: 16px;
  font-family: 'Karla', sans-serif;
}

.info-card__copy {
  background-color: var(--color-background);
  box-shadow: var(--shadow-medium);
  width: 24px;
  height: 24px;
  border: none;
  padding: 2px;
  border-radius: var(--border-radius-small);
  cursor: pointer;
  transition: background-color 0.2s;
}

.info-card__copy:hover {
  background-color: #f5f5f5;
}

.info-card__copy:active {
  background-color: #e0e0e0;
}

.info-card__value {
  color: #111827;
  font-weight: 400;
  flex: 1;
  text-align: right;
  word-break: break-word;
  font-size: 16px;
  font-family: 'Karla', sans-serif;
}

.info-card__value a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
}

.info-card__value a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .info-card {
    padding: 15px;
    max-width: 100%;
  }

  .info-card__header {
    margin-bottom: 15px;
  }

  .info-card__title {
    font-size: 20px;
  }

  .info-card__content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .info-card__label {
    min-width: auto;
    padding-right: 0;
    font-size: 14px;
    font-weight: 700;
  }

  .info-card__value {
    text-align: left;
    font-size: 14px;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .info-card {
    padding: 10px;
  }

  .info-card__title {
    font-size: 18px;
  }

  .info-card__label,
  .info-card__value {
    font-size: 14px;
  }
}
</style>
