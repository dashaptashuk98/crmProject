<template>
  <div class="stats-card">
    <div class="stats-card__content">
      <p class="stats-card__title">{{ props.title }}</p>
      <div class="stats-card__value-wrapper">
        <p class="stats-card__value">{{ props.cardNum }}</p>
        <div class="stats-card__change" v-if="props.cardInc">
          <img
            src="../assets/images/arrow.svg"
            alt="arrow"
            class="stats-card__arrow"
            width="12"
            height="15"
          />
          <span class="stats-card__change-value">{{ props.cardInc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  cardNum: string
  cardInc?: string
}

const props = defineProps<Props>()
</script>

<style scoped>
.stats-card {
  background-color: var(--color-background);
  padding: 37.5px 20px;
  border-radius: var(--border-radius-medium);

  box-sizing: border-box;
  overflow: visible;
}

.stats-card__content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
}

.stats-card__title {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin: 0;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.stats-card__value-wrapper {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  flex-grow: 1;
}

.stats-card__value {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 47px;
  margin: 0;
  color: var(--color-text-primary);
  word-break: break-word;
  text-align: center;
}

.stats-card__change {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
}

.stats-card__change-value {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  color: var(--color-success);
}
</style>
