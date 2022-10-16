<template>
  <div class="ticket-create-dialog">
    <el-dialog title="Ticket create" :model-value="props.visible" :before-close="handleCloseDialog">
      <ticket-create-form @close-dialog="handleCloseDialog" @update-table="updateTable" />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import TicketCreateForm from '@/components/ticket/TicketCreateForm.vue'

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
