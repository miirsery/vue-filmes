<template>
  <div class="cinema-page">
    <h1>Cinema: {{ cinema.title }}</h1>
    <div class="cinema-page__content">
      Расписание на
      <div>
        <el-date-picker v-model="cinema.date" type="date" placeholder="Pick a day" />
      </div>
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
