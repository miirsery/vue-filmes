<template>
  <div>
    {{ props.id }}
  </div>
</template>

<script lang="ts" setup>
interface IMovie {
  title: string
  id: string | number
}

const props = withDefaults(defineProps<IMovie>(), {})
</script>
