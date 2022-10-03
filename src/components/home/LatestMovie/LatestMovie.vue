<template>
  <div class="latest-movie d-flex">
    <div class="latest-movie__info">
      <div class="latest-movie__title">
        {{ movie.title }}
      </div>
      <div class="latest-movie__release-date">
        {{ movie.release_date }}
      </div>
    </div>
    <div class="latest-movie__image">
      <img :src="movie.preview" :alt="movie.title" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'

interface IMovieProps {
  id: number
  title: string
  description?: string
  preview?: string
  release_date: string
}

defineProps({
  movie: {
    type: Object as PropType<IMovieProps>,
    required: true,
  },
})
</script>
