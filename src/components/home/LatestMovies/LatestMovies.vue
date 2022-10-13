<template>
  <div class="latest-movies d-flex">
    <latest-movie v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import moviesApi from '@/api/movies/movies.api'
import { MovieType } from '@/types/movies.types'

const movies = ref<MovieType[]>([])

const getMovies = async (): Promise<void> => {
  const [error, data] = await moviesApi.getMovies()

  if (!error && data) {
    movies.value = data
  }
}

onMounted(() => {
  getMovies()
})
</script>
