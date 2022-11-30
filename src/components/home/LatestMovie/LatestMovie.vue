<template>
  <div class="latest-movie d-flex fd-column">
    <router-link :to="`/movie/${props.movie.id}`">
      <div class="latest-movie__image">
        <img :src="movie.preview" :alt="movie.title" />
      </div>
      <div class="latest-movie__info">
        <div class="latest-movie__title mb-8 mt-8">
          {{ movie.title }}
        </div>
        <div class="latest-movie__release-date">
          {{ movie.release_date }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { MovieType } from '@/types/movies.types'

interface IMovieProps {
  movie: MovieType
}

const props = defineProps<IMovieProps>()
</script>

<style lang="scss" scoped>
.latest-movie {
  width: 160px;
  height: 250px;
  margin-right: 16px;

  &__image {
    height: 310px;

    img {
      object-fit: cover;
    }
  }
}
</style>
