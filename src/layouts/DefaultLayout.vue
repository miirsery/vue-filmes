<template>
  <div>
    header
    <div class="d-flex">
      <the-sidebar />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TheSidebar from '@/components/layouts/DefaultLayout/TheSidebar/TheSidebar.vue'
</script>
