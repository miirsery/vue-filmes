<template>
  <div class="user-create-dialog">
    <el-dialog title="User create" :model-value="props.visible" :before-close="handleCloseDialog" width="550px">
      <user-create-form @close-dialog="handleCloseDialog" @update-table="updateTable" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import UserCreateForm from '@/components/user/UserCreate/UserCreateForm.vue'

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
