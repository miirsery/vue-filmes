<template>
  <div class="the-search-movie">
    <router-link :to="`/movie/${props.movie.id}`" class="d-flex">
      <div class="the-search-movie__image">
        <img :src="props.movie.preview" alt="movie" />
      </div>
      <div>
        <div>{{ props.movie.title }}</div>
        <div>{{ props.movie.studio }}</div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  movie: any
}

const props = withDefaults(defineProps<IProps>(), {})
</script>

<style lang="scss" scoped>
.the-search-movie {
  padding: 8px;

  &__image {
    width: 40px;
    height: 40px;
    margin-right: 16px;

    img {
      object-fit: cover;
    }
  }
}
</style>
