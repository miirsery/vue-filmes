<template>
  <div class="halls-page w-100">
    <div class="halls-page__header d-flex ai-center jc-between">
      <h1>Halls</h1>
      <div class="d-flex ai-center">
        <el-button type="success" @click="handleDeleteModalVisibleChange">Delete hall</el-button>
        <el-button type="primary" @click="handleCreateModalVisibleChange">Create hall</el-button>
      </div>
    </div>

    <halls-table
      :halls="halls"
      :loading="tableLoading"
      @open-edit-dialog="handleEditModalVisibleChange"
      @update-table="getHalls"
    />

    <hall-delete-dialog
      :visible="isRemoveDialogVisible"
      @close-dialog="handleDeleteModalVisibleChange"
      @update-table="getHalls"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import HallsTable from '@/components/halls/HallsTable.vue'
import hallsApi from '@/api/halls/halls.api'
import HallDeleteDialog from '@/components/hall/HallDelete/HallDeleteDialog.vue'

const isCreateDialogVisible = ref(false)
const isRemoveDialogVisible = ref(false)
const tableLoading = ref(false)
const halls = ref<any>([])

const handleDeleteModalVisibleChange = (): void => {
  isRemoveDialogVisible.value = !isRemoveDialogVisible.value
}

const handleCreateModalVisibleChange = (): void => {
  isCreateDialogVisible.value = !isCreateDialogVisible.value
}

const handleEditModalVisibleChange = (): void => {
  //...
}

const getHalls = async (): Promise<void> => {
  tableLoading.value = true

  const [error, data] = await hallsApi.getHalls()

  if (!error && data) {
    halls.value = data
  }

  tableLoading.value = false
}

onMounted(async () => {
  await getHalls()
})
</script>
