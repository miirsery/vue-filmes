<template>
  <div class="cinema-card">
    <div class="d-flex">
      <!--      <img :src="props.cinema.image" alt="image" />-->
    </div>
    <div class="cinema-card__info">
      <div>ID: №{{ props.cinema.id }}</div>
      <div class="cinema-card__title"> {{ props.cinema.title }} </div>
    </div>
    <router-link :to="`/cinemas/${props.cinema.id}`">Check</router-link>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  cinema: any
}
const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
.cinema-card {
  border-bottom: 1px solid $color--bg;
  padding-bottom: 18px;

  &__title {
    font-size: 18px;
    line-height: 22px;
  }
}
</style>
