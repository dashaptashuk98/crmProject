<template>
  <div class="main-container">
    <div class="top-section">
      <div class="title-section">
        <h1 class="title">Dashboard</h1>
        <div class="button__container">
          <Button
            variant="text"
            icon="pi pi-angle-down"
            iconPos="right"
            label="Actions"
            :style="{ color: '#8F6AFE', fontFamily: 'Karla' }"
          />
        </div>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="chart-left">
        <Chart type="line" :data="lineChartData" :options="lineChartOptions" class="chart" />
      </div>

      <div class="right-container">
        <div class="chart-right">
          <Chart type="bar" :data="barChartData" :options="barChartOptions" class="chart" />
        </div>

        <div class="chart-bottom">
          <Chart
            type="doughnut"
            :data="doughnutChartData"
            :options="doughnutChartOptions"
            class="chart"
          />
        </div>
      </div>

      <div class="cards-container">
        <div class="cards-grid">
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
        label: function (context: any) {
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
        label: function (context: any) {
          const label = context.label || ''
          const value = context.raw || 0
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
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
.main-container {
  width: 100%;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.top-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.title {
  font-family: 'Sora';
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 43px;
  margin: 0;
  color: #8f6afe;
  white-space: nowrap;
}

.button__container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 562px auto;
  gap: 20px;
  width: 100%;
  max-width: calc(100vw - 160px);
  margin: 0 auto;
}

.chart-left {
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

.right-container {
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

.chart-right {
  flex: 1;
  min-height: 373px;
}

.chart-bottom {
  flex: 1;
  min-height: 433px;
}

.cards-container {
  grid-column: 1;
  grid-row: 2;
  display: flex;
  flex-direction: column;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
}

.cards-grid > * {
  width: 100%;
  min-width: 0;
}

.chart {
  width: 100% !important;
  height: 448px !important;
}

@media (max-width: 1024px) {
  .dashboard-grid {
    max-width: calc(100vw - 100px);
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    gap: 15px;
  }

  .chart-left {
    grid-column: 1;
    grid-row: 1;
    height: 400px;
  }

  .right-container {
    grid-column: 1;
    grid-row: 2;
    height: auto;
    padding: 15px;
  }

  .chart-right {
    min-height: 300px;
    height: 300px;
  }

  .chart-bottom {
    min-height: 300px;
    height: 300px;
  }

  .cards-container {
    grid-column: 1;
    grid-row: 3;
  }

  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .dashboard-grid {
    max-width: calc(100vw - 60px);
    gap: 12px;
  }

  .chart-left {
    height: 300px;
    padding: 15px;
  }

  .right-container {
    padding: 12px;
    gap: 15px;
  }

  .chart-right {
    height: 250px;
    min-height: 250px;
  }

  .chart-bottom {
    height: 250px;
    min-height: 250px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .top-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 20px;
  }

  .title-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .button__container {
    width: 100%;
    justify-content: flex-start;
  }

  .title {
    font-size: 30px;
    white-space: normal;
  }
}

@media (max-width: 480px) {
  .dashboard-grid {
    max-width: calc(100vw - 40px);
    gap: 10px;
  }

  .chart-left {
    height: 250px;
    padding: 12px;
  }

  .right-container {
    padding: 10px;
    gap: 12px;
  }

  .chart-right,
  .chart-bottom {
    height: 200px;
    min-height: 200px;
  }

  .title {
    font-size: 26px;
  }
}

@media (max-width: 375px) {
  .dashboard-grid {
    max-width: calc(100vw - 30px);
    gap: 8px;
  }

  .chart-left {
    height: 220px;
    padding: 10px;
  }

  .right-container {
    padding: 8px;
    gap: 10px;
  }

  .chart-right,
  .chart-bottom {
    height: 180px;
    min-height: 180px;
  }

  .title {
    font-size: 24px;
  }
}
</style>
