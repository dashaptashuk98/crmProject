<template>
  <div class="charts">
    <div class="charts__header">
      <div class="charts__title-wrapper">
        <h1 class="charts__title">Dashboard</h1>
        <div class="charts__actions">
          <Button
            variant="text"
            icon="pi pi-angle-down"
            iconPos="right"
            label="Actions"
            :style="{ color: 'var(--color-primary)', fontFamily: 'Karla' }"
          />
        </div>
      </div>
    </div>

    <div class="charts__grid">
      <div class="charts__item charts__item--line">
        <Chart
          type="line"
          :data="lineChartData"
          :options="lineChartOptions"
          class="charts__chart"
        />
      </div>

      <div class="charts__sidebar">
        <div class="charts__item charts__item--bar">
          <Chart type="bar" :data="barChartData" :options="barChartOptions" class="charts__chart" />
        </div>

        <div class="charts__item charts__item--doughnut">
          <Chart
            type="doughnut"
            :data="doughnutChartData"
            :options="doughnutChartOptions"
            class="charts__chart"
          />
        </div>
      </div>

      <div class="charts__cards">
        <div class="charts__cards-grid">
          <CardComponent
            v-for="(card, index) in cardsData"
            :key="index"
            :title="card.title"
            :cardNum="card.cardNum"
            :cardInc="card.cardInc"
            :showArrow="!!card.cardInc"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Chart from 'primevue/chart'
import CardComponent from '@/components/CardComponent.vue'
import { ref } from 'vue'
import type { TooltipItem } from 'chart.js'

const cardsData = ref([
  { title: 'Antibiotics', cardNum: '14.7k', cardInc: '2%' },
  { title: 'Antivirals', cardNum: '620', cardInc: '10%' },
  { title: 'Antifungals', cardNum: '530' },
  { title: 'Antiparasitics', cardNum: '12.1k', cardInc: '8%' },
  { title: 'Anesthetics', cardNum: '340', cardInc: '20' },
  { title: 'Analgesics', cardNum: '400' },
])

const lineChartData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Day',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgba(167, 167, 251, 1)',
      tension: 0.4,
    },
    {
      label: 'Mounth',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      borderColor: 'rgba(38, 62, 212, 1)',
      tension: 0.4,
    },
  ],
})

const lineChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#374151',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#6B7280',
      },
      grid: {
        color: '#E5E7EB',
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#6B7280',
        stepSize: 10,
        callback: function (value: number) {
          return value
        },
      },
      grid: {
        color: '#E5E7EB',
      },
    },
  },
})

const barChartData = ref({
  labels: ['California', 'Florida', 'Georgia', 'Indiana', 'Missouri', 'Washington'],
  datasets: [
    {
      label: 'Total sales by region',
      data: [600, 146, 158, 602, 389, 374],
      backgroundColor: 'rgba(143, 106, 254, 0.7)',
      borderColor: 'rgba(143, 106, 254, 1)',
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
})

const barChartOptions = ref({
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#374151',
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: TooltipItem<'bar'>) {
          return `Sales: ${context.raw}`
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        color: '#6B7280',
        callback: function (value: number) {
          return value
        },
      },
      grid: {
        color: '#E5E7EB',
      },
      title: {
        display: true,
        text: 'Sales Amount',
        color: '#6B7280',
      },
    },
    y: {
      ticks: {
        color: '#6B7280',
      },
      grid: {
        color: '#E5E7EB',
      },
    },
  },
})

const doughnutChartData = ref({
  labels: ['Marketing', 'Development', 'Sales', 'Support', 'Operations', 'Other'],
  datasets: [
    {
      data: [300, 200, 150, 100, 80, 70],
      backgroundColor: [
        'rgba(143, 106, 254, 0.8)',
        'rgba(167, 167, 251, 0.8)',
        'rgba(38, 62, 212, 0.8)',
        'rgba(101, 84, 192, 0.8)',
        'rgba(76, 59, 149, 0.8)',
        'rgba(59, 46, 115, 0.8)',
      ],
      borderColor: [
        'rgba(143, 106, 254, 1)',
        'rgba(167, 167, 251, 1)',
        'rgba(38, 62, 212, 1)',
        'rgba(101, 84, 192, 1)',
        'rgba(76, 59, 149, 1)',
        'rgba(59, 46, 115, 1)',
      ],
      borderWidth: 1,
      hoverOffset: 15,
    },
  ],
})

const doughnutChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#374151',
        font: {
          size: 12,
          family: "'Karla', sans-serif",
        },
        padding: 15,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    tooltip: {
      callbacks: {
        label: function (context: TooltipItem<'doughnut'>) {
          const label = context.label || ''
          const value = (context.raw as number) || 0
          const total = (context.dataset.data as number[]).reduce(
            (a: number, b: number) => a + b,
            0,
          )
          const percentage = Math.round((value / total) * 100)
          return `${label}: ${value} (${percentage}%)`
        },
      },
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFont: { size: 12 },
      bodyFont: { size: 12 },
      padding: 10,
    },
    title: {
      display: true,
      text: 'Budget Distribution by Department',
      color: '#374151',
      font: {
        size: 16,
        weight: 'bold',
        family: "'Karla', sans-serif",
      },
      padding: {
        top: 10,
        bottom: 20,
      },
    },
  },
})
</script>

<style scoped>
.charts {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.charts__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
}

.charts__title-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.charts__title {
  font-family: 'Sora';
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 43px;
  margin: 0;
  color: var(--color-primary);
  white-space: nowrap;
}

.charts__actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.charts__grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 562px auto;
  gap: 20px;
  width: 100%;
  max-width: calc(100vw - 160px);
  margin: 0 auto;
}

.charts__item--line {
  grid-column: 1;
  grid-row: 1;
  height: 562px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  overflow: hidden;
}

.charts__sidebar {
  grid-column: 2;
  grid-row: 1 / span 2;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.charts__item--bar {
  flex: 1;
  min-height: 373px;
}

.charts__item--doughnut {
  flex: 1;
  min-height: 433px;
}

.charts__cards {
  grid-column: 1;
  grid-row: 2;
  display: flex;
  flex-direction: column;
}

.charts__cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
}

.charts__cards-grid > * {
  width: 100%;
  min-width: 0;
}

.charts__chart {
  width: 100% !important;
  height: 448px !important;
}

@media (max-width: 1024px) {
  .charts__grid {
    max-width: calc(100vw - 100px);
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    gap: 15px;
  }

  .charts__item--line {
    grid-column: 1;
    grid-row: 1;
    height: 400px;
  }

  .charts__sidebar {
    grid-column: 1;
    grid-row: 2;
    height: auto;
    padding: 15px;
  }

  .charts__item--bar {
    min-height: 300px;
    height: 300px;
  }

  .charts__item--doughnut {
    min-height: 300px;
    height: 300px;
  }

  .charts__cards {
    grid-column: 1;
    grid-row: 3;
  }

  .charts__cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .charts__grid {
    max-width: calc(100vw - 60px);
    gap: 12px;
  }

  .charts__item--line {
    height: 300px;
    padding: 15px;
  }

  .charts__sidebar {
    padding: 12px;
    gap: 15px;
  }

  .charts__item--bar {
    height: 250px;
    min-height: 250px;
  }

  .charts__item--doughnut {
    height: 250px;
    min-height: 250px;
  }

  .charts__cards-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .charts__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 20px;
  }

  .charts__title-wrapper {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .charts__actions {
    width: 100%;
    justify-content: flex-start;
  }

  .charts__title {
    font-size: 30px;
    white-space: normal;
  }
}

@media (max-width: 480px) {
  .charts__grid {
    max-width: calc(100vw - 40px);
    gap: 10px;
  }

  .charts__item--line {
    height: 250px;
    padding: 12px;
  }

  .charts__sidebar {
    padding: 10px;
    gap: 12px;
  }

  .charts__item--bar,
  .charts__item--doughnut {
    height: 200px;
    min-height: 200px;
  }

  .charts__title {
    font-size: 26px;
  }
}

@media (max-width: 375px) {
  .charts__grid {
    max-width: calc(100vw - 30px);
    gap: 8px;
  }

  .charts__item--line {
    height: 220px;
    padding: 10px;
  }

  .charts__sidebar {
    padding: 8px;
    gap: 10px;
  }

  .charts__item--bar,
  .charts__item--doughnut {
    height: 180px;
    min-height: 180px;
  }

  .charts__title {
    font-size: 24px;
  }
}
</style>
