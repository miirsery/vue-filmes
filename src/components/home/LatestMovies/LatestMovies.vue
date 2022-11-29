<template>
  <div class="latest-movies">
    <h2>Latest added movies</h2>
    <div class="latest-movies__content">
      <latest-movie v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
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

<style lang="scss" scoped>
.latest-movies__content {
  display: flex;
  flex-wrap: wrap;
}
</style>
