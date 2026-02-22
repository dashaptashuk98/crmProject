<template>
  <div class="inProgress">
    <InProgressAnimation />
    <Button
          label="Main page"
          @click="$router.push('/')""
          :style="{
            background: 'var(--color-primary)',
            borderColor: 'var(--color-primary)',
            fontFamily: 'Karla',
          }"
        />
  </div>
</template>

<script setup lang="ts">
import InProgressAnimation from '@/components/InProgressAnimation.vue'
import Button from 'primevue/button'
</script>

<style scoped>
.inProgress {
  max-width: 1920px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: auto 0;
}
</style>
