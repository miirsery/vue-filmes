<template>
  <div class="default-layout">
    <div class="default-layout__container">
      <the-header />
      <div class="d-flex jc-between">
        <the-sidebar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TheSidebar from '@/components/layouts/DefaultLayout/TheSidebar/TheSidebar.vue'
import TheHeader from '@/components/layouts/DefaultLayout/TheHeader/TheHeader.vue'
import { useUserStore } from '@/stores/user.store'
import { onMounted } from 'vue'

const useUser = useUserStore()

const getSelf = async (): Promise<void> => {
  await useUser.getSelf()
}

onMounted(() => {
  getSelf()
})
</script>

<style lang="scss" scoped>
.default-layout {
  &__container {
    max-width: 1840px;
    padding: 0 20px;
    margin: 0 auto;
  }
}
</style>
