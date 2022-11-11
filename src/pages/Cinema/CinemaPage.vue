<template>
  <div class="cinema-page">
    <h1>Cinema: {{ cinema.title }}</h1>
    <div class="cinema-page__content">
      Расписание на
      <div>
        <el-date-picker v-model="cinema.date" type="date" placeholder="Pick a day" />
      </div>
      <cinemas-movie v-for="movie in movies" :key="movie.id" :movie="movie" :sessions="sessions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import cinemasApi from '@/api/cinemas/cinemas.api'

const route = useRoute()
const cinemaId = route.params.id

const cinema = reactive<any>({
  date: '',
})

const movies = [
  {
    id: 1,
    genre: 'comedy',
    title: 'Title #1',
    studio: 'Studio #1',
    duration: '1h 30m',
    image: 'https://wallpapersmug.com/download/1024x768/955152/dark-anime-girl-ruby-rose.jpg',
  },
  {
    id: 2,
    genre: 'comedy',
    title: 'Title #2',
    studio: 'Studio #2',
    duration: '1h 45m',
    image: 'https://wallpapersmug.com/download/1024x768/955152/dark-anime-girl-ruby-rose.jpg',
  },
]

const sessions = [
  {
    id: 1,
    time: '11:50',
  },
  {
    ID: 2,
    time: '12:10',
  },
]

onMounted(async () => {
  await getCinema()
})

const getCinema = async (): Promise<void> => {
  const [error, data] = await cinemasApi.getCinema(cinemaId as string)

  if (!error && data) {
    cinema.title = data.title
  }
}
</script>
