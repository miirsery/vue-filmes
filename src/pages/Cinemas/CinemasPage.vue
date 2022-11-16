<template>
  <div class="cinemas-page">
    <h1>Cinemas</h1>
    <div class="cinemas-page__map"> This is map :) </div>
    <div class="cinemas-page__content">
      <cinema-card v-for="cinema in cinemas" :key="cinema.id" :cinema="cinema" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import cinemasApi from '@/api/cinemas/cinemas.api'

const cinemas = ref<any>([])

// const cinemas = [
//   {
//     id: 1,
//     image: 'https://wallpapersmug.com/download/1024x768/955152/dark-anime-girl-ruby-rose.jpg',
//     title: 'Cinema title',
//   },
//   {
//     id: 2,
//     image: 'https://wallpapersmug.com/download/1024x768/955152/dark-anime-girl-ruby-rose.jp',
//     title: 'Cinema title #2',
//   },
// ]

onMounted(async () => {
  await getCinemas()
})

const getCinemas = async (): Promise<void> => {
  const [error, data] = await cinemasApi.getCinemas()

  if (!error && data) {
    cinemas.value = data
  }
}
</script>

<style lang="scss" scoped>
.cinemas-page {
  width: 100%;

  &__map {
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>
