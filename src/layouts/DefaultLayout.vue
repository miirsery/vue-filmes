<template>
  <div class="default-layout">
    <div class="default-layout__container">
      <header>header</header>
      <div class="d-flex">
        <the-sidebar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TheSidebar from '@/components/layouts/DefaultLayout/TheSidebar/TheSidebar.vue'
</script>
