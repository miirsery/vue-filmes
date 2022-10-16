<template>
  <el-dialog :model-value="props.visible" title="Edit movie" :before-close="handleCloseDialog">
    <movie-edit-form :movie="props.movie" @close-dialog="handleCloseDialog" @update-table="updateTable" />
  </el-dialog>
</template>

<script lang="ts" setup>
import MovieEditForm from '@/components/movie/MovieEdit/MovieEditForm.vue'

interface IProps {
  visible: boolean
  movie: any
}

interface IEmits {
  (e: 'close-dialog'): void
  (e: 'update-table'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const handleCloseDialog = (): void => {
  emit('close-dialog')
}

const updateTable = (): void => {
  emit('update-table')
}
</script>
