<template>
  <div class="popular-movies">
    <h2 class="mb-16">Popular movies</h2>
    <popular-movies-slider :movies="movies" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import moviesApi from '@/api/movies/movies.api'

const movies = ref<any>([])

const getPopularMovies = async (): Promise<void> => {
  const [error, data] = await moviesApi.getPopularMovies()

  if (!error && data) {
    movies.value = data
  }
}

onMounted(() => {
  getPopularMovies()
})
</script>

<style lang="scss" scoped>
.popular-movies {
  margin-bottom: 50px;
}
</style>
