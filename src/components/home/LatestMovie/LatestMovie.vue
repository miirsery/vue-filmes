<template>
  <div class="latest-movie d-flex fd-column">
    <div class="latest-movie__image">
      <img :src="movie.preview" :alt="movie.title" />
    </div>
    <div class="latest-movie__info">
      <div class="latest-movie__title">
        {{ movie.title }}
      </div>
      <div class="latest-movie__release-date">
        {{ movie.release_date }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MovieType } from '@/types/movies.types'

interface IMovieProps {
  movie: MovieType
}

defineProps<IMovieProps>()
</script>

<style lang="scss" scoped>
.latest-movie {
  width: 160px;
  height: 250px;
  margin-right: 16px;

  &__image {
    height: 100%;

    img {
      object-fit: cover;
    }
  }
}
</style>
