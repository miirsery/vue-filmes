<template>
  <svg class="app-icon" :class="iconClass" :width="props.width" :height="props.height" aria-hidden="true">
    <use :href="symbolId" :fill="props.color" :stroke="props.strokeColor" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
  name: string
  prefix?: string
  color?: string
  width?: string
  height?: string
  reverse?: boolean
  strokeColor?: string
}

const props = withDefaults(defineProps<IProps>(), {
  prefix: 'icon',
  color: '#333',
  width: '23px',
  height: '24px',
  reverse: false,
  strokeColor: '#fff',
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

const iconClass = computed(() => {
  return [{ 'reversed-icon': props.reverse }, `app-icon--${props.name}`]
})
</script>

<style scoped>
.app-icon {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
}

.reversed-icon {
  transform: rotate(180deg);
}
</style>
