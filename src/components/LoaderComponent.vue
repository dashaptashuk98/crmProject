<template>
  <div v-if="isLoading" class="loader-container" :class="{ fullscreen: fullscreen }">
    <Vue3Lottie
      :animationData="JSONData"
      :height="height"
      :width="width"
      :loop="true"
      :autoPlay="true"
    />
    <p v-if="text" class="loader-text">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import JSONData from '../assets/animation.json'

interface Props {
  isLoading: boolean
  height?: number
  width?: number
  fullscreen?: boolean
  text?: string
}

withDefaults(defineProps<Props>(), {
  height: 200,
  width: 200,
  fullscreen: false,
  text: 'Загрузка...',
})
</script>

<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(3px);
  z-index: 9999;
}

.loader-text {
  margin-top: 16px;
  font-size: 16px;
  color: #666;
}
</style>
