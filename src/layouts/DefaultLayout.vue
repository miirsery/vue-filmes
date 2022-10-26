<template>
  <div class="default-layout">
    <div class="default-layout__container">
      <header>Movie Dashboard</header>
      <div class="d-flex jc-between">
        <the-sidebar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TheSidebar from '@/components/layouts/DefaultLayout/TheSidebar/TheSidebar.vue'
</script>

<style lang="scss" scoped>
header {
  padding: 40px 0;
}

.default-layout {
  &__container {
    max-width: 1840px;
    padding: 0 20px;
    margin: 0 auto;
  }
}
</style>
