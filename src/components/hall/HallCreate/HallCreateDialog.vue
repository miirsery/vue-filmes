<template>
  <div class="hall-create-dialog">
    <el-dialog title="Hall create" :model-value="props.visible" :before-close="handleCloseDialog">
      <hall-create-form
        @close-dialog="handleCloseDialog"
        @update-table="updateTable"
        @choose-place-visible-change="handleChoosePlaceOpen"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import HallCreateForm from '@/components/hall/HallCreate/HallCreateForm.vue'

interface IProps {
  visible: boolean
}

interface IEmits {
  (e: 'close-dialog'): void
  (e: 'update-table'): void
  (e: 'choose-place-visible-change'): void
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const handleChoosePlaceOpen = (): void => {
  emit('choose-place-visible-change')
}

const updateTable = (): void => {
  emit('update-table')
}

const handleCloseDialog = (): void => {
  emit('close-dialog')
}
</script>
