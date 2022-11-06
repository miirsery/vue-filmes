<template>
  <div class="tickets-page w-100">
    <div class="d-flex ai-center jc-between mb-16">
      <h1>Tickets</h1>
      <div class="d-flex ai-center">
        <el-button @click="handleChoosePlaceVisibleChange">Choose place</el-button>
        <el-button type="primary" @click="handleTicketCreateDialogVisibleChange">Create ticket</el-button>
      </div>
    </div>

    <tickets-table
      :tickets="tickets.items"
      :loading="tableLoading"
      @update-table="getTickets"
      @apply-filters="applyFilters"
    />

    <ticket-create-dialog
      :visible="isCreateTicketDialogVisible"
      @close-dialog="handleTicketCreateDialogVisibleChange"
      @update-table="getTickets"
    />

    <choose-place-dialog :visible="isChoosePlaceVisible" @close-dialog="handleChoosePlaceVisibleChange" />

    <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000" />
  </div>
</template>

<script lang="ts" setup>
import TicketsTable from '@/components/tickets/TicketsTable.vue'
import ChoosePlaceDialog from '@/components/hall/HallChoose/ChoosePlaceDialog.vue'
import { onMounted, ref } from 'vue'
import ticketsApi from '@/api/tickets/tickets.api'
import TicketCreateDialog from '@/components/ticket/TicketCreateDialog.vue'

const tableLoading = ref(false)
const isCreateTicketDialogVisible = ref(false)
const isChoosePlaceVisible = ref(false)
const tickets = ref<any>([])

const handleTicketCreateDialogVisibleChange = (): void => {
  isCreateTicketDialogVisible.value = !isCreateTicketDialogVisible.value
}

const handleChoosePlaceVisibleChange = (): void => {
  isChoosePlaceVisible.value = !isChoosePlaceVisible.value
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
