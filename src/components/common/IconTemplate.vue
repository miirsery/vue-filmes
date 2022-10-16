<template>
  <svg :width="width" :height="height" aria-hidden="true">
    <use :href="symbolId" :fill="color" :stroke="strokeColor" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
  strokeColor: {
    type: String,
    default: '#333',
  },
  width: {
    type: String,
    default: '23px',
  },
  height: {
    type: String,
    default: '24px',
  },
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style scoped>
.app-icon {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
}
</style>
