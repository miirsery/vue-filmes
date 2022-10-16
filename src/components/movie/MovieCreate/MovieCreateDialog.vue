<template>
  <div class="movie-create-dialog">
    <el-dialog title="Movie create" :model-value="props.visible" :before-close="handleCloseDialog">
      <movie-create-form @close-dialog="handleCloseDialog" @update-table="updateTable" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import MovieCreateForm from '@/components/movie/MovieCreate/MovieCreateForm.vue'

interface IProps {
  visible: boolean
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
