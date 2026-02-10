<template>
  <div class="draft">
    <div class="draft__header">
      <div class="draft__title-wrapper">
        <h1 class="draft__title">Certificate: 2023/Cert - 001</h1>
        <div class="draft__actions">
          <Button
            label="Close"
            :style="{
              background: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              fontFamily: 'Karla',
            }"
          />
          <Button
            variant="text"
            icon="pi pi-angle-down"
            iconPos="right"
            label="Operations"
            :style="{ color: 'var(--color-primary)', fontFamily: 'Karla' }"
          />
        </div>
      </div>
    </div>

    <div class="draft__content">
      <div class="draft__left-column">
        <div class="draft__info">
          <CustomerInfoCard
            title="Certificate info"
            :labels="customerStore.customerLabels"
            :values="customerStore.customerValues"
          />
        </div>
        <SimpleChat />
      </div>

      <div class="draft__right-column">
        <div class="draft__details">
          <div class="draft__description">
            <p class="draft__description-title">Description</p>
            <div class="draft__next-steps">
              <span class="draft__next-steps-title"
                >Next steps <span class="draft__next-steps-count">(1)</span></span
              >

              <ul class="draft__messengers">
                <li class="draft__messenger-item">
                  <img src="../assets/images/telegram.svg" alt="" class="draft__messenger-icon" />
                </li>
                <li class="draft__messenger-item">
                  <img src="../assets/images/whatsapp.svg" alt="" class="draft__messenger-icon" />
                </li>
                <li class="draft__messenger-item">
                  <img src="../assets/images/messenger.svg" alt="" class="draft__messenger-icon" />
                </li>
              </ul>
            </div>
            <div class="draft__arrow-wrapper">
              <img src="../assets/images/arraowUp.svg" alt="" class="draft__arrow" />
            </div>
            <div class="draft__message">
              <p class="draft__message-text">
                We need to prepare all required certification documentation.
              </p>
              <p class="draft__message-author">{{ authStore.user?.firstName }}</p>
            </div>
          </div>

          <div class="draft__accordion">
            <div class="draft__accordion-card">
              <Accordion :value="['0']" multiple>
                <AccordionPanel value="0">
                  <AccordionHeader class="draft__accordion-header"> Document name </AccordionHeader>
                  <AccordionContent>
                    <p class="draft__accordion-content">
                      {{
                        (authStore.user?.firstName || '') + ' ' + (authStore.user?.lastName || '')
                      }}
                    </p>
                  </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="1">
                  <AccordionHeader class="draft__accordion-header"
                    >Attachments and notes</AccordionHeader
                  >
                  <AccordionContent>
                    <p class="draft__accordion-content">
                      {{ authStore.user?.email }}
                    </p>
                  </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="2">
                  <AccordionHeader class="draft__accordion-header">Discription</AccordionHeader>
                  <AccordionContent>
                    <p class="draft__accordion-content">
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                      praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                      excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                      officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum
                      quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum
                      soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                  </AccordionContent>
                </AccordionPanel>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import CustomerInfoCard from '@/components/CustomerInfoCard.vue'
import SimpleChat from '@/components/SimpleChat.vue'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'
import { onMounted, watch } from 'vue'
import { useCustomerStore } from '@/stores/customer'
import { useAuthStore } from '@/stores/auth'

const customerStore = useCustomerStore()
const authStore = useAuthStore()

async function loadData() {
  try {
    const userId = authStore.user?.id || 1
    await customerStore.fetchCustomerData(userId)
  } catch (err) {
    console.error('Error loading customer data:', err)
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
.draft {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
}

.draft__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.draft__title-wrapper {
  flex: 1;
}

.draft__title {
  font-family: 'Sora';
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 43px;
  margin: 0 0 20px 0;
  color: var(--color-primary);
  white-space: normal;
  word-break: break-word;
}

.draft__content {
  display: flex;
  gap: 20px;
  margin-bottom: 55px;
}

.draft__left-column {
  flex: 0 0 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.draft__right-column {
  flex: 1;
  min-width: 0;
}

.draft__info {
  display: flex;
  height: 370px;
}

.draft__details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.draft__messengers {
  list-style-type: none;
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 0;
}

.draft__next-steps-title {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
}

.draft__next-steps {
  display: flex;
  gap: 10px;
  align-items: center;
}

.draft__accordion {
  background-color: var(--color-background);
  border-radius: var(--border-radius-large);
}

.draft__next-steps-count {
  color: var(--color-primary);
}

.draft__actions {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.draft__arrow-wrapper {
  position: relative;
  border-bottom: 1px solid var(--color-primary-light);
  margin-bottom: 12px;
}

.draft__arrow {
  position: absolute;
  background-color: var(--color-background);
  top: -7px;
  left: 40px;
}

.draft__description {
  display: flex;
  gap: 14px;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 20px;
  flex: 1;
  background-color: var(--color-background);
}

.draft__accordion-content {
  background-color: var(--color-background-secondary);
  padding: 30px 30px 26px;
  border-radius: var(--border-radius-large);

  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  color: var(--color-text-primary);
}

.draft__message-text {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin: 0;
  color: var(--color-text-primary);
}

.draft__accordion :deep(.p-accordionheader-link) {
  display: flex !important;
  align-items: center !important;
  padding: 1rem !important;
}

.draft__accordion :deep(.p-accordionheader) {
  justify-content: start;
}

.draft__accordion :deep(.p-accordionheader-toggle-icon) {
  order: -1 !important;
  margin-right: 12px !important;
  background-color: var(--color-primary) !important;
  color: var(--color-text-inverse) !important;
  padding: 6px 4px 7px;
  width: 20px !important;
  height: 20px !important;
  border-radius: var(--border-radius-small) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.draft__accordion :deep(.p-accordionheader-toggle-icon .pi) {
  color: var(--color-text-inverse) !important;
  font-size: 14px !important;
  transition: none !important;
  transform: rotate(0deg) !important;
}

.draft__accordion :deep(.p-accordionpanel-active .p-accordionheader-toggle-icon) {
  background-color: var(--color-primary-dark) !important;
}

.draft__accordion :deep(.p-accordionpanel-active .p-accordionheader-toggle-icon .pi) {
  transform: rotate(-180deg) !important;
}

.draft__accordion :deep(.p-accordionheader-toggle-icon) {
  transition:
    transform 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease !important;
}

.draft__accordion :deep(.p-accordionheader-toggle-icon .p-icon),
.draft__accordion :deep(.p-accordionheader-toggle-icon .pi),
.draft__accordion :deep(.p-accordionheader-toggle-icon svg) {
  color: var(--color-text-inverse) !important;
  fill: var(--color-text-inverse) !important;
  stroke: var(--color-text-inverse) !important;
}

.draft__message-author {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin: 0;
  color: var(--color-text-secondary);
}

.draft__message {
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-large);
  margin: -11px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px 11px 23px;
}

.draft__description-title {
  font-family: 'Sora';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  color: var(--color-text-inverse);
  background-color: var(--color-primary-light);
  padding: 17px 30px;
  border-radius: var(--border-radius-large);
  margin: -30px;
  margin-bottom: 16px;
}

.draft__accordion :deep(.p-accordion) {
  border: none;
}

.draft__accordion-header {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  color: var(--color-text-primary);
}

.draft__accordion :deep(.p-accordion-header) {
  border: none;
  border-bottom: 1px solid var(--color-border);
  background: transparent;
}

.draft__accordion :deep(.p-accordion-header:not(.p-disabled).p-highlight:hover) {
  background: #f3f4f6;
}

.draft__accordion :deep(.p-accordion-header-link) {
  padding: 1rem;
  text-decoration: none;
  color: #374151;
  font-family: 'Karla', sans-serif;
  font-weight: 600;
  font-size: 16px;
}

.draft__accordion :deep(.p-accordion-content) {
  border: none;
  background: transparent;
  padding: 1rem;
}

@media (max-width: 1024px) {
  .draft__content {
    flex-direction: column;
    gap: 30px;
  }

  .draft__left-column {
    flex: none;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  .draft__right-column {
    width: 100%;
  }

  .draft__title {
    font-size: 30px;
    line-height: 38px;
  }
}

@media (max-width: 768px) {
  .draft__title {
    font-size: 18px;
    line-height: 32px;
    margin-bottom: 15px;
  }

  .draft__header {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }

  .draft__title-wrapper {
    width: 100%;
  }

  .draft__actions {
    width: 100%;
    justify-content: flex-start;
  }

  .draft__content {
    gap: 20px;
    margin-bottom: 30px;
  }

  .draft__left-column {
    max-width: 100%;
  }

  .draft__description {
    padding: 20px;
  }

  .draft__accordion-content {
    padding: 20px;
    font-size: 16px;
    line-height: 20px;
  }

  .draft__message-text,
  .draft__message-author,
  .draft__next-steps-title {
    font-size: 16px;
    line-height: 20px;
  }

  .draft__description-title {
    font-size: 24px;
    line-height: 30px;
    padding: 15px 20px;
    margin: -20px;
    margin-bottom: 16px;
  }

  .draft__messengers {
    gap: 8px;
  }

  .draft__next-steps {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .draft__arrow {
    left: 20px;
  }

  .draft__message {
    padding: 20px 10px 15px;
    gap: 12px;
  }

  .draft__accordion :deep(.p-accordion-header-link) {
    padding: 0.75rem !important;
    font-size: 14px !important;
  }

  .draft__accordion :deep(.p-accordionheader-toggle-icon) {
    width: 18px !important;
    height: 18px !important;
    margin-right: 10px !important;
  }
}
</style>
