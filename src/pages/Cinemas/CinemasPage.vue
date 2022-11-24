<template>
  <div class="cinemas-page">
    <h1>Cinemas</h1>
    <div class="cinemas-page__map">
      <cinemas-map :cinemas="cinemas" />
    </div>
    <div class="cinemas-page__content">
      <cinema-card v-for="cinema in cinemas" :key="cinema.id" :cinema="cinema" @update="getCinemas" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import cinemasApi from '@/api/cinemas/cinemas.api'
import { useUserStore } from '@/stores/user.store'

const useUser = useUserStore()

const userId = ref(0)
const cinemas = ref<any>()

const user = computed(() => useUser.user)

watchEffect(async () => {
  const localUser = user.value

  if (localUser) {
    userId.value = localUser.id

    await getCinemas()
  }
})

const getCinemas = async (): Promise<void> => {
  const [error, data] = await cinemasApi.getCinemas(userId.value)

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
