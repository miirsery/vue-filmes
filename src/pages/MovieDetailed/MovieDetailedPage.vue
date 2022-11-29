<template>
  <div class="movie-detailed-page">
    <div class="movie-detailed-page__title">
      {{ movie.title }}
    </div>
    <div>
      {{ movie.studio }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user.store'
import { useMovieStore } from '@/stores/movie.store'

const route = useRoute()
const useUser = useUserStore()
const useMovie = useMovieStore()

const movieId = route.params.id

const user = computed(() => useUser.user)
const movie = computed(() => useMovie.movie)

onMounted(() => {
  useMovie.getDetailedMove(movieId as string, user.value.id || 1)
})
</script>
