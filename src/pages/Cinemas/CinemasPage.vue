<template>
  <div class="cinemas-page">
    <h1>Cinemas</h1>
    <div class="cinemas-page__map">
      <cinemas-map :cinemas="cinemas" />
    </div>
    <div class="cinemas-page__content">
      <cinema-card v-for="cinema in cinemas" :key="cinema.id" :cinema="cinema" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import cinemasApi from '@/api/cinemas/cinemas.api'

const cinemas = ref<any>([
  {
    id: 1,
    preview:
      'https://avatars.dzeninfra.ru/get-zen_doc/3986710/pub_5f541a1bc84c033ffd42ea0a_5f541a46019fb065e71a5b1a/scale_1200',
    title: 'cinema #1',
    phone: '79239999999',
    description: 'Lorem Lorem',
    age_restriction: 'NC-17',
  },
])

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
