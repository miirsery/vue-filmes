<template>
  <div class="cinema-page">
    <h1 class="mt-16 mb-16">Cinema: {{ cinema.title }}</h1>
    <div class="cinema-page__content">
      <div class="d-flex ai-center">
        <div class="mr-8"> Расписание на </div>
        <div>
          <el-date-picker v-model="cinema.date" type="date" placeholder="Pick a day" />
        </div>
      </div>
      <cinemas-movie v-for="movie in movies" :key="movie.id" :movie="movie" :cinema="cinema" :sessions="sessions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import cinemasApi from '@/api/cinemas/cinemas.api'

const route = useRoute()
const cinemaId = route.params.id

const cinema = reactive<any>({
  date: '',
})

const movies = ref<any>([])

const sessions = ref<any>([])

onMounted(async () => {
  await getCinema()
})

const getCinema = async (): Promise<void> => {
  const [error, data] = await cinemasApi.getCinema(cinemaId as string)

  if (!error && data) {
    cinema.title = data.title

    cinema.id = data.id

    movies.value = data.movies

    sessions.value = data.sessions
  }
}
</script>
