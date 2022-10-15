<template>
  <el-dialog :model-value="props.visible" title="Редактирование фильма" :before-close="handleCloseDialog">
    <h2>Dialog</h2>
    <el-button @click="handleCloseDialog">close</el-button>
  </el-dialog>
</template>

<script lang="ts" setup>
interface IProps {
  visible: boolean
}

interface IEmits {
  (e: 'close-dialog'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const handleCloseDialog = (): void => {
  emit('close-dialog')
}
</script>
