<template>
  <div class="hall-delete-dialog">
    <el-dialog title="Hall delete" :model-value="props.visible" :before-close="handleCloseDialog">
      <hall-delete-form @close-dialog="handleCloseDialog" @update-table="updateTable" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import HallDeleteForm from '@/components/hall/HallDelete/HallDeleteForm.vue'

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
