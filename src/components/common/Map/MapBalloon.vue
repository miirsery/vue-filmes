<template>
  <div class="map-balloon">
    <div>{{ title }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  title: string
  phone: string
}

defineProps<IProps>()
</script>
