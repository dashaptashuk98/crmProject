<template>
  <div class="main-container">
    <div class="top-section">
      <div class="title-section">
        <h1 class="title">Certificate: 2023/Cert - 001</h1>
        <div class="button__container">
          <Button
            label="Close"
            :style="{ background: '#8F6AFE', borderColor: '#8F6AFE', fontFamily: 'Karla' }"
          />
          <Button
            variant="text"
            icon="pi pi-angle-down"
            iconPos="right"
            label="Operations"
            :style="{ color: '#8F6AFE', fontFamily: 'Karla' }"
          />
        </div>
      </div>
    </div>

    <div class="new__container">
      <div class="con">
        <CustomerInfoCard
          title="Customer information"
          :labels="customerLabels"
          :values="customerData"
        />
      </div>

      <div class="wrapp__spec">
        <div class="wrapp">
          <p class="descNew">Description</p>
          <div class="inner">
            <span class="step">Next steps <span class="spec">(1)</span></span>

            <ul class="list">
              <li class="items">
                <img src="../assets/images/telegram.svg" alt="" class="item__img" />
              </li>
              <li class="items">
                <img src="../assets/images/whatsapp.svg" alt="" class="item__img" />
              </li>
              <li class="items">
                <img src="../assets/images/messenger.svg" alt="" class="item__img" />
              </li>
            </ul>
          </div>
          <div class="ar">
            <img src="../assets/images/arraowUp.svg" alt="" class="arrowUo" />
          </div>
          <div class="mess">
            <p class="comment">We need to prepare all required certification documentation.</p>
            <p class="name">Dasha Krutay</p>
          </div>
        </div>
        <div class="accard">
          <div class="card">
            <Accordion :value="['0']" multiple>
              <AccordionPanel value="0">
                <AccordionHeader class="header__accard"> Header I </AccordionHeader>
                <AccordionContent>
                  <p class="m-0 bgColor">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="1">
                <AccordionHeader class="header__accard">Header II</AccordionHeader>
                <AccordionContent>
                  <p class="m-0 bgColor">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                    voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                    consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                    Consectetur, adipisci velit, sed quia non numquam eius modi.
                  </p>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="2">
                <AccordionHeader class="header__accard">Header III</AccordionHeader>
                <AccordionContent>
                  <p class="m-0 bgColor">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                    praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                    excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                    officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
                    rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis
                    est eligendi optio cumque nihil impedit quo minus.
                  </p>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import CustomerInfoCard from '@/components/CustomerInfoCard.vue'
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

import { onMounted, ref } from 'vue'
import { getCustomersInfo } from '@/services/getCustomersInfo'
import { getMasterInfo } from '@/services/getMasterInfo'

const customerLabels = ref([
  'Number',
  'External number',
  'Type',
  'Date',
  'Status',
  'Valid to',
  'Account',
  'Contact',
])
const customerData = ref<string[]>([])
onMounted(async () => {
  const userData = await getCustomersInfo()
  const userId = Number(userData[0])

  const productData = await getMasterInfo(userId)
  customerData.value = productData
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
  margin: 0 0 20px 0;
  color: #8f6afe;
}

.list {
  list-style-type: none;
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 0;
}

.step {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
}

.inner {
  display: flex;
  gap: 10px;
  align-items: center;
}

.accard {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
}

.spec {
  color: rgba(143, 106, 254, 1);
}

.button__container {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.ar {
  position: relative;
  border-bottom: 1px solid rgba(167, 167, 251, 1);
  margin-bottom: 12px;
}

.con {
  display: flex;
  height: 370px;
}

.arrowUo {
  position: absolute;
  background-color: white;
  top: -7px;
  left: 40px;
}

.wrapp {
  display: flex;
  gap: 14px;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 20px;
  flex: 1;
  background-color: rgba(255, 255, 255, 1);
}

.bgColor {
  background-color: rgba(245, 244, 248, 1);
  padding: 30px 30px 26px;
  border-radius: 10px;

  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  color: #353535;
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

.comment {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin: 0;
  color: #353535;
}

.accard :deep(.p-accordionheader-link) {
  display: flex !important;
  align-items: center !important;
  padding: 1rem !important;
}

.accard :deep(.p-accordionheader) {
  justify-content: start;
}

.accard :deep(.p-accordionheader-toggle-icon) {
  order: -1 !important;
  margin-right: 12px !important;
  background-color: #8f6afe !important;
  color: white !important;
  padding: 6px 4px 7px;
  width: 20px !important;
  height: 20px !important;
  border-radius: 4px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.accard :deep(.p-accordionpanel-active .p-accordionheader-toggle-icon) {
  background-color: #6c4bcc !important;
  transform: rotate(-180deg) !important;
}

.accard :deep(.p-accordionheader-toggle-icon) {
  transition:
    transform 0.3s ease,
    background-color 0.3s ease,
    color 0.3s ease !important;
}

.accard :deep(.p-accordionheader-toggle-icon .p-icon),
.accard :deep(.p-accordionheader-toggle-icon .pi),
.accard :deep(.p-accordionheader-toggle-icon svg) {
  color: white !important;
  fill: white !important;
  stroke: white !important;
}
.name {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin: 0;
  color: #979797;
}

.draft {
  max-width: 440px;
  width: 100%;
  height: 387px;
}

.new__container {
  display: flex;
  gap: 20px;
  margin-bottom: 55px;
}

.draft {
  flex: 0 0 440px;
  max-width: 440px;
}

.wrapp__spec {
  flex: 1;
  min-width: 0;
}

@media (max-width: 1480px) {
  .new__container {
    flex-direction: column;
  }

  .customer-info-container {
    max-width: none;
  }

  .draft {
    flex: none;
    max-width: 100%;
  }

  .wrapp__spec {
    flex: none;
  }
}

@media (max-width: 767px) {
  .title {
    font-size: 28px;
  }

  .top-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .button__container {
    width: 100%;
    justify-content: flex-start;
  }

  .new__container {
    gap: 15px;
  }

  .wrapp {
    padding: 20px;
  }

  .bgColor {
    padding: 20px;
    font-size: 18px;
  }
}

.mess {
  background-color: rgba(245, 244, 248, 1);
  border-radius: 10px;
  margin: -11px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px 11px 23px;
}

.descNew {
  font-family: 'Sora';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 38px;
  color: #ffffff;
  background-color: rgba(167, 167, 251, 1);
  padding: 17px 30px;
  border-radius: 10px;
  margin: -30px;
  margin-bottom: 16px;
}

.accard :deep(.p-accordion) {
  border: none;
}

.header__accard {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  color: #353535;
}

.accard :deep(.p-accordion-header) {
  border: none;
  border-bottom: 1px solid #e5e7eb;
  background: transparent;
}

.accard :deep(.p-accordion-header:not(.p-disabled).p-highlight:hover) {
  background: #f3f4f6;
}

.accard :deep(.p-accordion-header-link) {
  padding: 1rem;
  text-decoration: none;
  color: #374151;
  font-family: 'Karla', sans-serif;
  font-weight: 600;
  font-size: 16px;
}

.accard :deep(.p-accordion-content) {
  border: none;
  background: transparent;
  padding: 1rem;
}

.wrapp__spec {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

@media (max-width: 768px) {
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
