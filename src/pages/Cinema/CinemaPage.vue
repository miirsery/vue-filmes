<template>
  <div class="cinema-page">
    <h1 class="mt-16 mb-16">Cinema: {{ cinema.title }}</h1>
    <div class="cinema-page__content">
      <div class="d-flex ai-center">
        <div class="mr-8"> Расписание на </div>
        <div>
          <el-date-picker
            v-model="cinema.date"
            format="DD-MM-YYYY"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="Pick a day"
            @change="getCinema"
          />
        </div>
      </div>
      <cinemas-movie v-for="movie in movies" :key="movie.id" :movie="movie" :cinema="cinema" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import cinemasApi from '@/api/cinemas/cinemas.api'
import moment from 'moment'

const route = useRoute()
const cinemaId = route.params.id

const cinema = reactive<any>({
  date: moment(new Date()).format('YYYY-MM-DD'),
})

const movies = ref<any>([])
const sessions = ref<any>([])

const getCinema = async (): Promise<void> => {
  const [error, data] = await cinemasApi.getCinema({
    id: cinemaId,
    date: cinema.date,
  })

  if (!error && data) {
    cinema.title = data.title

    cinema.id = data.id

    cinema.address = data.address

    movies.value = data.movies

    sessions.value = data.sessions
  }
}

onMounted(async () => {
  await getCinema()
})
</script>
