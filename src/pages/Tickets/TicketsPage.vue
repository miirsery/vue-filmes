<template>
  <div class="tickets-page w-100">
    <div class="d-flex ai-center jc-between mb-16">
      <h1>Tickets</h1>
      <el-button type="primary" @click="handleTicketCreateDialogVisibleChange">Create ticket</el-button>
    </div>

    <tickets-table
      :tickets="tickets"
      :loading="tableLoading"
      @update-table="getTickets"
      @apply-filters="applyFilters"
    />

    <ticket-create-dialog
      :visible="isCreateTicketDialogVisible"
      @close-dialog="handleTicketCreateDialogVisibleChange"
      @update-table="getTickets"
    />
  </div>
</template>

<script lang="ts" setup>
import TicketsTable from '@/components/tickets/TicketsTable.vue'
import { onMounted, ref } from 'vue'
import ticketsApi from '@/api/tickets/tickets.api'
import TicketCreateDialog from '@/components/ticket/TicketCreateDialog.vue'

const tableLoading = ref(false)
const isCreateTicketDialogVisible = ref(false)
const tickets = ref<any>([])

const handleTicketCreateDialogVisibleChange = (): void => {
  isCreateTicketDialogVisible.value = !isCreateTicketDialogVisible.value
}

const applyFilters = async (filters: any): Promise<void> => {
  await getTickets(filters)
}

const getTickets = async (filters?: any): Promise<void> => {
  tableLoading.value = true

  const [error, data] = await ticketsApi.getTickets(filters)

  if (!error && data) {
    tickets.value = data
  }

  tableLoading.value = false
}

onMounted(() => {
  getTickets()
})
</script>
