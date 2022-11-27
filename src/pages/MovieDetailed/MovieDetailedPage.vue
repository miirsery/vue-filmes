<template>
  <div class="the-movie"> Детальное аниме </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import moviesApi from '@/api/movies/movies.api'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user.store'

const route = useRoute()
const useUser = useUserStore()

const movie = ref({})
const userId = ref(0)

const movieId = route.params.id

const user = computed(() => useUser.user)

const getMovie = async (): Promise<void> => {
  const [error, data] = await moviesApi.getMovie(movieId as string, userId.value)

  if (!error && data) {
    movie.value = data
  }
}

// watchEffect(async () => {
//   const localUser = user.value
//
//   if (localUser) {
//     userId.value = localUser.id
//
//     await getMovie()
//   }
// }

onMounted(async () => {
  userId.value = useUser.user.id

  await getMovie()
})
</script>
