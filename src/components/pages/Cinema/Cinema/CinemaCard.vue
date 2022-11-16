<template>
  <div class="cinema-card">
    <div class="d-flex mb-16">
      <div class="cinema-card__image">
        <img :src="props.cinema.image" alt="image" />
      </div>
      <div class="cinema-card__info">
        <div>ID: №{{ props.cinema.id }}</div>
        <div class="cinema-card__title"> {{ props.cinema.title }} </div>
      </div>
    </div>
    <router-link class="cinema-card__link link" :to="`/cinemas/${props.cinema.id}`">Check</router-link>
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
  padding-bottom: 18px;
  margin-bottom: 16px;

  &__title {
    font-size: 18px;
    line-height: 22px;
  }

  &__image {
    width: 100px;
    height: 100px;
    margin-right: 16px;

    img {
      height: 100%;
      object-fit: cover;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid $color--border;
  }
}
</style>
