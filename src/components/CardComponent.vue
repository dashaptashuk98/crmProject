<template>
  <div class="card__item">
    <div class="card__wrapper">
      <p class="title">{{ props.title }}</p>
      <div class="card__number">
        <p class="card__num">{{ props.cardNum }}</p>
        <div class="inner__num">
          <img
            v-if="props.cardInc"
            src="../assets/images/arrow.svg"
            alt="arrow"
            class="num"
            width="12"
            height="15"
          />
          <span class="num__increase">{{ props.cardInc }}</span>
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
.card__item {
  background-color: rgba(255, 255, 255, 1);
  padding: 37.5px 20px;
  border-radius: 7px;

  box-sizing: border-box;
  overflow: visible;
}

.card__wrapper {
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
}

.title {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin: 0;
  color: #979797;
  flex-shrink: 0;
}

.card__number {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  flex-grow: 1;
}

.card__num {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  line-height: 47px;
  margin: 0;
  color: #353535;
  word-break: break-word;
  text-align: center;
}

.inner__num {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
}

.num__increase {
  font-family: 'Karla';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;
  color: #45b73b;
}
</style>
